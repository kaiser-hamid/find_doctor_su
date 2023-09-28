import {
  FaPlusCircle,
  FaSave,
  FaSpinner,
  FaSync,
  FaTimes,
  FaTimesCircle,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import SelectWithSearch from "../../ui/SelectWithSearch";
import SelectWithSearchMulti from "../../ui/SelectWithSearchMulti";
import DatePickerInput from "../../ui/DatePickerInput";
import { useEffect, useState } from "react";
import {
  assignChamberFormData,
  assignChamberToDoctor,
  divisionDropdown,
  doctorAddFormHelperData,
  doctorSave,
} from "../../../api/api.js";
import SubmitNotification from "../../ui/SubmitNotification.jsx";
import HOC from "../../hoc/HOC.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { doctorSpecialityOption } from "../../../helpers/form-helper.jsx";
import {
  getSelectedDrodownItems,
  parsePickerDate,
} from "../../../helpers/utility";
import Swal from "sweetalert2";

const WEEKDAYS_OPTION = [
  { id: "sat", label: "Sat", value: "sat" },
  { id: "sun", label: "Sun", value: "sun" },
  { id: "mon", label: "Mon", value: "mon" },
  { id: "tue", label: "Tue", value: "tue" },
  { id: "wed", label: "Wed", value: "wed" },
  { id: "thu", label: "Thu", value: "thu" },
  { id: "fri", label: "Fri", value: "fri" },
];
export default function AssignChamber() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initFormData = [
    {
      chamber_id: "",
      phone: "",
      schedule_start: "",
      schedule_end: "",
      week_days: [],
    },
  ];
  const [formData, setFormData] = useState(initFormData);
  const [doctorName, setDoctorName] = useState("");
  const [actionButtonLoading, setActionButtonLoading] = useState(false);
  const [notification, setNotification] = useState({ msg: null, type: null }); //[danger,success]
  const [pageLoaded, setPageLoaded] = useState(false);
  const [chamberOptions, setChamberOptions] = useState([]);

  useEffect(() => {
    const fetchForHelperData = async () => {
      try {
        const {
          data: { status, data, msg },
        } = await assignChamberFormData(id);
        if (status) {
          setChamberOptions(data.chambers);
          setDoctorName(data.doctor_name);
          if (data.doctor_chamber.length) {
            const serverDataSync = data.doctor_chamber.map((item) => {
              return {
                chamber_id: item.chamber_id,
                phone: item.phone,
                schedule_start: item.schedule_start,
                schedule_end: item.schedule_end,
                week_days: getSelectedDrodownItems(
                  WEEKDAYS_OPTION,
                  item.week_days
                ),
              };
            });
            setFormData(serverDataSync);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: msg,
          });
        }
      } catch (e) {
        console.log(e.message);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Cannot laod data right now",
        });
      } finally {
        setPageLoaded(true);
      }
    };
    fetchForHelperData();
  }, []);

  const handleInput = ({ target: { name: nameWithIndex, value } }) => {
    const [name, i] = nameWithIndex.split(":");
    const tempChambers = [...formData];
    const selectedChamber = tempChambers[i];
    selectedChamber[name] = value;
    tempChambers.splice(i, 1, selectedChamber);
    setFormData(tempChambers);
  };

  const handleAddMore = () => {
    const tempChambers = [
      ...formData,
      {
        chamber_id: "",
        phone: "",
        schedule_start: "",
        schedule_end: "",
        week_days: [],
      },
    ];
    setFormData(tempChambers);
  };

  const handleRemoveRow = (e) => {
    const i = e.currentTarget.dataset.i;
    const tempChambers = [...formData];
    tempChambers.splice(i, 1);
    setFormData(tempChambers);
  };

  const parseFormData = () => {
    const data = new FormData();
    for (const chamber of formData) {
      if (!chamber.chamber_id) {
        continue;
      }
      const multiSelectItems = ["week_days"];
      for (const item in chamber) {
        if (multiSelectItems.includes(item)) {
          for (const selectItem of chamber[item]) {
            data.append(
              `chamber[${chamber.chamber_id}][${item}][]`,
              selectItem.value
            );
          }
          continue;
        }
        data.append(`chamber[${chamber.chamber_id}][${item}]`, chamber[item]);
      }
    }
    return data;
  };

  const hasDuplicateChamber = () => {
    const chamberIDs = formData.map((item) => item.chamber_id);
    return new Set(chamberIDs).size !== chamberIDs.length;
  };

  const handleSubmit = async () => {
    try {
      if (hasDuplicateChamber()) {
        setNotification({ msg: "Chamber cannot be duplicate", type: "danger" });
        return;
      }
      setActionButtonLoading(true);
      setNotification({ msg: null, type: null });
      const form_data = parseFormData();
      const {
        data: { status, msg },
      } = await assignChamberToDoctor(form_data, id);
      if (status) {
        setNotification({ msg, type: "success" });
        setTimeout(() => {
          navigate("/dashboard/doctors");
        }, 2000);
      } else {
        setNotification({ msg, type: "danger" });
      }
    } catch (e) {
      console.log(e.message);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: e.message,
      });
    } finally {
      setActionButtonLoading(false);
    }
  };

  return (
    <HOC isLoaded={pageLoaded} hasData={!!chamberOptions.length}>
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              Dr. {doctorName}
            </h2>
          </div>
          {formData.map((chamber, i) => (
            <div className="flex flex-col gap-9 my-8">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-semibold text-black dark:text-white">
                    Appointment Address{" "}
                    <span className="font-bold"> #{i + 1}</span>
                  </h3>
                  <div>
                    {formData.length > 1 && (
                      <button
                        type="button"
                        onClick={handleRemoveRow}
                        data-i={i}
                      >
                        <FaTimes className="inline text-3xl text-bodydark hover:text-danger transition duration-150 ease-in" />
                      </button>
                    )}
                  </div>
                </div>
                <form action="#">
                  <div className="p-6.5">
                    <div className="grid md:grid-cols-3 grid-cols-1  gap-x-8 gap-y-2">
                      <div className="mb-4.5 col-span-1">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Chamber
                        </label>
                        <SelectWithSearch
                          onChange={handleInput}
                          value={formData[i].chamber_id}
                          name={`chamber_id:${i}`}
                          options={chamberOptions}
                          hasSubLabel={true}
                        />
                      </div>
                      <div className="mb-4.5 col-span-1">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Schedule Start
                        </label>
                        <input
                          type="time"
                          name={`schedule_start:${i}`}
                          onChange={handleInput}
                          value={formData[i].schedule_start}
                          step="900"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          placeholder="Select a time"
                        />
                      </div>
                      <div className="mb-4.5 col-span-1">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Schedule End
                        </label>
                        <input
                          type="time"
                          name={`schedule_end:${i}`}
                          onChange={handleInput}
                          value={formData[i].schedule_end}
                          step="900"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          placeholder="Select a time"
                        />
                      </div>
                      <div className="mb-4.5 col-span-1">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Phone No.
                        </label>
                        <input
                          type="text"
                          name={`phone:${i}`}
                          onChange={handleInput}
                          value={formData[i].phone}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="mb-4.5 md:col-span-2 col-span-1">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Weekdays
                        </label>
                        <SelectWithSearchMulti
                          onChange={handleInput}
                          value={formData[i].week_days}
                          name={`week_days:${i}`}
                          options={WEEKDAYS_OPTION}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ))}

          <div>
            <SubmitNotification notification={notification} />
            <div className="flex justify-between items-start">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={actionButtonLoading}
                className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 my-2"
              >
                {actionButtonLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaSync />
                )}
                <span className="px-2">Update</span>
              </button>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddMore}
                  className="inline-flex items-center justify-center rounded bg-black text-center text-white hover:bg-opacity-90 px-2 py-1 my-1"
                >
                  <FaPlusCircle />
                  <span className="px-2">Add more chamber</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </HOC>
  );
}
