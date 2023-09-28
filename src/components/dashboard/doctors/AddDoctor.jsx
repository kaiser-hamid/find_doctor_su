import { FaSave, FaSpinner } from "react-icons/fa";
import SelectWithSearchMulti from "../../ui/SelectWithSearchMulti";
import SelectWithSearch from "../../ui/SelectWithSearch";
import CreatableSelect from "../../ui/CreatableSelect";
import { useEffect, useState } from "react";
import { doctorAddFormHelperData, doctorSave } from "../../../api/api.js";
import SubmitNotification from "../../ui/SubmitNotification.jsx";
import HOC from "../../hoc/HOC.jsx";
import { useNavigate } from "react-router-dom";
import RadioButton from "../../ui/RadioButton";
import Swal from "sweetalert2";

export default function AddDoctor() {
  const navigate = useNavigate();
  const initFormData = {
    first_name: "",
    first_name_bn: "",
    last_name: "",
    last_name_bn: "",
    phone: "",
    email: "",
    bmdc_reg_no: "",
    profile_picture: "",
    gender: "",
    about_doctor: "",
    about_doctor_bn: "",
    designation: "",
    institute: "",
    experience: "",
    degree: "",
    speciality: [],
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
        } = await doctorAddFormHelperData();
        if (status) {
          setSpecialityOptions(data.specialities);
          setDesignationOptions(data.designations);
          setInstituteOptions(data.institutes);
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
    const multiSelectItems = ["speciality", "degree"];
    for (const item in formData) {
      if (multiSelectItems.includes(item)) {
        for (const selectItem of formData[item]) {
          data.append(`${item}[]`, selectItem.value);
        }
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
      } = await doctorSave(form_data);
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
                      <div className="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                          <span class="text-gray-500 font-medium">Dr.</span>
                        </div>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInput}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-11 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First Name (BN)
                      </label>
                      <div className="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                          <span class="text-gray-500 font-medium">ডাঃ</span>
                        </div>
                        <input
                          type="text"
                          name="first_name_bn"
                          value={formData.first_name_bn}
                          onChange={handleInput}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-12 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
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
                        Last Name (BN){" "}
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
                        Phone{" "}
                        <span className="text-xs italic text-bodydark2">
                          (For internal use only. <strong>NOT</strong> visible
                          in public)
                        </span>
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
                        BM&DC Reg. no
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
                        Year of Experience
                      </label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInput}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1  gap-x-8 gap-y-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Designations
                      </label>
                      <SelectWithSearch
                        name="designation"
                        value={formData.designation}
                        onChange={handleInput}
                        options={designationOptions}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Degrees
                      </label>
                      <CreatableSelect
                        name="degree"
                        value={formData.degree}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Institute
                      </label>
                      <SelectWithSearch
                        name="institute"
                        value={formData.institute}
                        onChange={handleInput}
                        options={instituteOptions}
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
