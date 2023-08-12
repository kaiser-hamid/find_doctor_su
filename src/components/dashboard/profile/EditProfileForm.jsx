import { FaSpinner, FaSync } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authPasswordChange } from "../../../api/api.js";
import SubmitNotification from "../../ui/SubmitNotification";
import Validator from "../../../validation/Validator.js";
import { editProfileRules } from "../../../validation/rules.js";
import Swal from "sweetalert2";

export default function EditProfileForm() {
  const navigate = useNavigate();

  const initFormData = {
    old_password: "",
    password: "",
    password_confirmation: "",
  };
  const [formData, setFormData] = useState(initFormData);
  const [actionButtonLoading, setActionButtonLoading] = useState(false);
  const [notification, setNotification] = useState({ msg: null, type: null }); //[danger,success]

  const handleInput = ({ target: { name, value } }) => {
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleEnterSubmit = ({ key }) => {
    if (key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setActionButtonLoading(true);
    try {
      const error = new Validator(formData, editProfileRules).validate();
      if (error) {
        setNotification({ msg: error, type: "danger" });
        return;
      }

      const form_data = new FormData();
      for (const item in formData) {
        form_data.append(`${item}`, formData[item]);
      }
      const {
        data: { status, msg },
      } = await authPasswordChange(form_data);
      if (status) {
        setNotification({ msg, type: "success" });
        setTimeout(() => {
          navigate("/dashboard/profile");
        }, 3000);
      } else {
        setNotification({ msg, type: "danger" });
      }
    } catch (e) {
      console.log(e.message);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Cannot laod data right now",
      });
    } finally {
      setActionButtonLoading(false);
    }
  };

  return (
    <main>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Edit Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-semibold text-black dark:text-white">
                  Change your password
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Old Password
                    </label>
                    <input
                      name="old_password"
                      type="password"
                      value={formData.old_password}
                      onChange={handleInput}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="Type your old password.."
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      New Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInput}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="Type new password.."
                    />
                  </div>

                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                      Confirm Password
                    </label>
                    <input
                      name="password_confirmation"
                      type="password"
                      value={formData.password_confirmation}
                      onChange={handleInput}
                      onKeyDown={handleEnterSubmit}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="Type new password again.."
                    />
                  </div>

                  <div className="mt-4">
                    <SubmitNotification notification={notification} />

                    <button
                      type="button"
                      disabled={actionButtonLoading}
                      onClick={handleSubmit}
                      className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
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
      </div>
    </main>
  );
}
