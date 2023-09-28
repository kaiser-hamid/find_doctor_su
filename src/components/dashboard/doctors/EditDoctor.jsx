import { FaSave, FaSpinner } from "react-icons/fa";
import SelectWithSearchMulti from "../../ui/SelectWithSearchMulti";
import DatePickerInput from "../../ui/DatePickerInput";
import { useEffect, useState } from "react";
import { doctorEditFormHelperData, doctorUpdate } from "../../../api/api.js";
import SubmitNotification from "../../ui/SubmitNotification.jsx";
import HOC from "../../hoc/HOC.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSelectedDrodownItems,
  parsePickerDate,
} from "../../../helpers/utility";
import RadioButton from "../../ui/RadioButton";
import Swal from "sweetalert2";

export default function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const initFormData = {
    first_name: "",
    first_name_bn: "",
    last_name: "",
    last_name_bn: "",
    phone: "",
    email: "",
    profile_picture: "",
    gender: "",
    dob: "",
    bmdc_reg_no: "",
    address: "",
    address_bn: "",
    about_doctor: "",
    about_doctor_bn: "",
    experience: "",
    experience_bn: "",
    speciality: [],
    qualification: [],
    education: [],
    language: [],
  };
  const [formData, setFormData] = useState(initFormData);
  const [actionButtonLoading, setActionButtonLoading] = useState(false);
  const [notification, setNotification] = useState({ msg: null, type: null }); //[danger,success]
  const [pageLoaded, setPageLoaded] = useState(false);
  const [preview, setPreview] = useState({ profile_picture_preview: null });

  const [specialityOptions, setSpecialityOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [instituteOptions, setInstituteOptions] = useState([]);

  useEffect(() => {
    const fetchForHelperData = async () => {
      try {
        const {
          data: { status, data, msg },
        } = await doctorEditFormHelperData(id);
        if (status) {
          populateFormData(data.data);
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

  const populateFormData = (serverData) => {
    const dropdownFormItems = {
      qualification: doctorQualificationOption,
      education: doctorEducationOption,
      speciality: doctorSpecialityOption,
      language: doctorLangOption,
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
        if (item === "dob") {
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

  const parseFormData = () => {
    const data = new FormData();
    const multiSelectItems = [
      "speciality",
      "qualification",
      "education",
      "language",
    ];
    const dateItems = ["dob"];
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
    setNotification({ msg: null, type: null });
    try {
      const form_data = parseFormData();
      const {
        data: { status, msg },
      } = await doctorUpdate(form_data, id);
      console.log(status, msg);
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
    <HOC isLoaded={pageLoaded} hasData={true}>
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              Add a Doctor
            </h2>
          </div>
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-semibold text-black dark:text-white">
                  Doctor Form
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="grid md:grid-cols-2 grid-cols-1  gap-x-8 gap-y-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First Name (EN)
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First Name (BN)
                      </label>
                      <input
                        type="text"
                        name="first_name_bn"
                        value={formData.first_name_bn}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last Name (EN)
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last Name (BN)
                      </label>
                      <input
                        type="text"
                        name="last_name_bn"
                        value={formData.last_name_bn}
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
                        Reg. no (BMDC)
                      </label>
                      <input
                        type="text"
                        name="bmdc_reg_no"
                        value={formData.bmdc_reg_no}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        name="profile_picture"
                        onChange={handleInputFile}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                      {preview.profile_picture_preview && (
                        <div className="py-2">
                          <img
                            src={preview.profile_picture_preview}
                            alt="Profile picture"
                            className="h-20 w-auto rounded-sm"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Gender
                      </label>
                      <div className="md:flex md:gap-4" onChange={handleInput}>
                        {["Male", "Female", "Others"].map((g) => (
                          <RadioButton
                            key={g}
                            label={g}
                            name="gender"
                            value={g.toLowerCase()}
                            selectedValue={formData.gender}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Date of Birth
                      </label>
                      <DatePickerInput
                        name="dob"
                        value={formData.dob}
                        onChange={handleInput}
                      />
                    </div>

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
                        Experiences (EN)
                      </label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Experiences (BN)
                      </label>
                      <input
                        type="text"
                        name="experience_bn"
                        value={formData.experience_bn}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1  gap-x-8 gap-y-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        About doctor (EN)
                      </label>
                      <textarea
                        name="about_doctor"
                        value={formData.about_doctor}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        About doctor (BN)
                      </label>
                      <textarea
                        name="about_doctor_bn"
                        value={formData.about_doctor_bn}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Specialities
                      </label>
                      <SelectWithSearchMulti
                        name="speciality"
                        value={formData.speciality}
                        onChange={handleInput}
                        options={specialityOptions}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Qualifications
                      </label>
                      <SelectWithSearchMulti
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInput}
                        options={specialityOptions}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Educations
                      </label>
                      <SelectWithSearchMulti
                        name="education"
                        value={formData.education}
                        onChange={handleInput}
                        options={specialityOptions}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Language
                      </label>
                      <SelectWithSearchMulti
                        name="language"
                        value={formData.language}
                        onChange={handleInput}
                        options={specialityOptions}
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
