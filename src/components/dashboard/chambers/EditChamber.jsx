import { FaSave, FaSpinner } from "react-icons/fa";
import SelectWithSearch from "../../ui/SelectWithSearch";
import SelectWithSearchMulti from "../../ui/SelectWithSearchMulti";
import DatePickerInput from "../../ui/DatePickerInput";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import {
  chamberEditFormHelperData,
  chamberSave,
  chamberUpdate,
  districtDropdownByDivisionId,
  divisionDropdown,
  upazilaDropdownByDistrictId,
} from "../../../api/api.js";
import SubmitNotification from "../../ui/SubmitNotification.jsx";
import HOC from "../../hoc/HOC.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  chamberDepartmentOptions,
  chamberFacilityOption,
  chamberSericeOptions,
} from "../../../helpers/form-helper.jsx";
import { openPopupAction } from "../../../store/uiSlice";
import { useDispatch } from "react-redux";
import {
  getSelectedDrodownItems,
  parsePickerDate,
} from "../../../helpers/utility";

export function EditChamber() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initFormData = {
    name: "",
    name_bn: "",
    phone: "",
    email: "",
    website: "",
    reg_no: "",
    image: "",
    logo: "",
    operating_hours: "",
    operating_hours_bn: "",
    est: "",
    division_id: "",
    district_id: "",
    upazila_id: "",
    address: "",
    address_bn: "",
    latitude: "",
    longitude: "",
    services: [],
    departments: [],
    facilities: [],
  };
  const [formData, setFormData] = useState(initFormData);
  const [actionButtonLoading, setActionButtonLoading] = useState(false);
  const [notification, setNotification] = useState({ msg: null, type: null }); //[danger,success]
  const [pageLoaded, setPageLoaded] = useState(true);
  const [preview, setPreview] = useState({
    image_preview: null,
    logo_preview: null,
  });

  //dropdowns
  const [divisionOptions, setDivisionOptions] = useState([7657]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [upazilaOptions, setUpazilaOptions] = useState([]);

  useEffect(() => {
    const fetchForHelperData = async () => {
      try {
        const {
          data: { status, data, msg },
        } = await chamberEditFormHelperData(id);
        if (status) {
          populateFormData(data.data);
          setDivisionOptions(data.divisions);
          setDistrictOptions(data.districts);
          setUpazilaOptions(data.upazilas);
        } else {
          dispatch(
            openPopupAction({
              type: "danger",
              title: "Failed!",
              text: msg,
            })
          );
        }
      } catch (e) {
        console.log(e.message);
        dispatch(
          openPopupAction({
            type: "danger",
            title: "Failed!",
            text: "Cannot load data",
          })
        );
      } finally {
        setPageLoaded(true);
      }
    };
    fetchForHelperData();
  }, []);

  const populateFormData = (serverData) => {
    const dropdownFormItems = {
      services: chamberSericeOptions,
      departments: chamberDepartmentOptions,
      facilities: chamberFacilityOption,
    };
    const copyFormData = { ...formData };
    for (const item in formData) {
      if (item in serverData) {
        if (item in dropdownFormItems) {
          copyFormData[item] = getSelectedDrodownItems(
            dropdownFormItems[item],
            serverData[item]
          );
          continue;
        }
        if (item === "est") {
          copyFormData[item] = new Date(serverData[item]);
          continue;
        }
        copyFormData[item] = serverData[item];
      }
    }

    const copyPreview = { ...preview };
    for (const item in preview) {
      if (item in serverData) {
        copyPreview[item] = serverData[item];
      }
    }
    setFormData(copyFormData);
    setPreview(copyPreview);
  };

  const handleInput = ({ target: { name, value } }) => {
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
    if (name === "division_id" || name === "district_id") {
      handleDependencyDropdown(name, value);
    }
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

  const handleDependencyDropdown = (name, value) => {
    if (name === "division_id") {
      setFormData((prevState) => {
        return {
          ...prevState,
          district_id: "",
          upazila_id: "",
        };
      });
      loadDistrictOptions(value);
    }
    if (name === "district_id") {
      setFormData((prevState) => {
        return {
          ...prevState,
          upazila_id: "",
        };
      });
      loadUpazilaOptions(value);
    }
  };

  const loadDistrictOptions = async (division_id) => {
    try {
      const {
        data: { status, data: response },
      } = await districtDropdownByDivisionId(division_id);
      if (status) {
        setDistrictOptions(response);
        setUpazilaOptions([]);
      }
    } catch (e) {
      console.log("District fetch error", e.message);
    }
  };

  const loadUpazilaOptions = async (district_id) => {
    try {
      const {
        data: { status, data: response },
      } = await upazilaDropdownByDistrictId(district_id);
      if (status) {
        setUpazilaOptions(response);
      }
    } catch (e) {
      console.log("Upazila fetch error", e.message);
    }
  };

  const parseFormData = () => {
    const data = new FormData();
    const multiSelectItems = ["services", "departments", "facilities"];
    const dateItems = ["est"];
    for (const item in formData) {
      if (multiSelectItems.includes(item)) {
        for (const selectItem of formData[item]) {
          data.append(`${item}[]`, selectItem.value);
        }
        continue;
      }
      if (dateItems.includes(item)) {
        data.append(item, parsePickerDate(formData[item]));
        continue;
      }
      data.append(item, formData[item]);
    }
    return data;
  };

  const handleSubmit = async () => {
    setActionButtonLoading(true);
    try {
      const form_data = parseFormData();
      const {
        data: { status, msg },
      } = await chamberUpdate(form_data, id);
      if (status) {
        setNotification({ msg, type: "success" });
        setTimeout(() => {
          navigate("/dashboard/chambers");
        }, 2000);
      } else {
        setNotification({ msg, type: "danger" });
      }
    } catch (e) {
      console.log(e.message);
      dispatch(
        openPopupAction({
          type: "danger",
          title: "Failed!",
          text: e.message,
        })
      );
    } finally {
      setActionButtonLoading(false);
    }
  };

  return (
    <HOC isLoaded={pageLoaded} hasData={!!divisionOptions.length}>
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              Add a Chamber
            </h2>
          </div>
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-semibold text-black dark:text-white">
                  Chamber Form
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="grid md:grid-cols-2 grid-cols-1  gap-x-8 gap-y-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Name (EN)
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Name (BN)
                      </label>
                      <input
                        type="text"
                        name="name_bn"
                        value={formData.name_bn}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Reg. no
                      </label>
                      <input
                        type="text"
                        name="reg_no"
                        value={formData.reg_no}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Logo
                      </label>
                      <input
                        type="file"
                        name="logo"
                        onChange={handleInputFile}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                      {preview.logo_preview && (
                        <div className="py-2">
                          <img
                            src={preview.logo_preview}
                            alt="Logo"
                            className="h-20 w-auto rounded-sm"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleInputFile}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                      {preview.image_preview && (
                        <div className="py-2">
                          <img
                            src={preview.image_preview}
                            alt="Image"
                            className="h-20 w-auto rounded-sm"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Operating Hours (EN)
                      </label>
                      <input
                        type="text"
                        name="operating_hours"
                        value={formData.operating_hours}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Operating Hours (BN)
                      </label>
                      <input
                        type="text"
                        name="operating_hours_bn"
                        value={formData.operating_hours_bn}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Est. Date
                      </label>
                      <DatePickerInput
                        name="est"
                        value={formData.est}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 grid-cols-1  gap-x-8 gap-y-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Division
                      </label>
                      <SelectWithSearch
                        name="division_id"
                        value={formData.division_id}
                        onChange={handleInput}
                        options={divisionOptions}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        District
                      </label>
                      <SelectWithSearch
                        name="district_id"
                        value={formData.district_id}
                        onChange={handleInput}
                        options={districtOptions}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Area
                      </label>
                      <SelectWithSearch
                        name="upazila_id"
                        value={formData.upazila_id}
                        onChange={handleInput}
                        options={upazilaOptions}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 grid-cols-1  gap-x-8 gap-y-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Address (EN)
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Address (BN)
                      </label>
                      <textarea
                        name="address_bn"
                        value={formData.address_bn}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        GPS Coordinate (Latitude)
                      </label>
                      <input
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        GPS Coordinate (longitude)
                      </label>
                      <input
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1  gap-x-8 gap-y-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Services
                      </label>
                      <SelectWithSearchMulti
                        name="services"
                        value={formData.services}
                        onChange={handleInput}
                        options={chamberSericeOptions}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Departments
                      </label>
                      <SelectWithSearchMulti
                        name="departments"
                        value={formData.departments}
                        onChange={handleInput}
                        options={chamberDepartmentOptions}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Facilities
                      </label>
                      <SelectWithSearchMulti
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleInput}
                        options={chamberFacilityOption}
                      />
                    </div>
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
                        <FaSave />
                      )}
                      <span className="px-2">Save</span>
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
