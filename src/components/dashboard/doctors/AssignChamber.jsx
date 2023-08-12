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
import { parsePickerDate } from "../../../helpers/utility";
import Swal from "sweetalert2";

export default function AssignChamber() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initFormData = [
    {
      chamber_id: "",
      schedule_start: "",
      schedule_end: "",
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
            setFormData(data.doctor_chamber);
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

  const handleInputFile = ({ target: { name, files } }) => {
    setFormData((prevState) => {
      return { ...prevState, [name]: files[0] };
    });
    //preview
    const dataUrl = URL.createObjectURL(files[0]);
    const previewAttribute = `${name}_preview`;
    setPreview((prev) => {
      return { ...prev, [previewAttribute]: dataUrl };
    });
  };

  const handleAddMore = () => {
    const tempChambers = [
      ...formData,
      {
        chamber_id: "",
        schedule_start: "",
        schedule_end: "",
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
      data.append(
        `chamber[${chamber.chamber_id}][schedule_start]`,
        chamber.schedule_start
      );
      data.append(
        `chamber[${chamber.chamber_id}][schedule_end]`,
        chamber.schedule_end
      );
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
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-semibold text-black dark:text-white">
                  Chamber List
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="grid md:grid-cols-3 grid-cols-1  gap-x-8 gap-y-2">
                    <div className="mb-4.5">
                      <p className="font-medium">Chambers</p>
                    </div>
                    <div className="mb-4.5">
                      <p className="font-medium">Schedule start</p>
                    </div>
                    <div className="mb-4.5">
                      <p className="font-medium">Schedule end</p>
                    </div>
                  </div>
                  {formData.map((chamber, i) => (
                    <div
                      key={i}
                      className="grid md:grid-cols-3 grid-cols-1  gap-x-8 gap-y-2"
                    >
                      <div className="mb-4.5">
                        <SelectWithSearch
                          onChange={handleInput}
                          value={formData[i].chamber_id}
                          name={`chamber_id:${i}`}
                          options={chamberOptions}
                          hasSubLabel={true}
                        />
                      </div>
                      <div className="mb-4.5">
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
                      <div className="mb-4.5 flex items-center justify-between gap-2">
                        <input
                          type="time"
                          name={`schedule_end:${i}`}
                          onChange={handleInput}
                          value={formData[i].schedule_end}
                          step="900"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          placeholder="Select a time"
                        />
                        {formData.length > 1 && (
                          <button
                            type="button"
                            onClick={handleRemoveRow}
                            data-i={i}
                          >
                            <FaTimesCircle className="inline text-4xl text-bodydark hover:text-danger transition duration-150 ease-in" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddMore}
                      className="inline-flex items-center justify-center rounded-sm bg-primary text-center text-white hover:bg-opacity-90 px-2 py-1 my-1"
                    >
                      <FaPlusCircle />
                      <span className="px-2">Add more</span>
                    </button>
                  </div>
                  <div className="">
                    <SubmitNotification notification={notification} />
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
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </HOC>
  );
}
