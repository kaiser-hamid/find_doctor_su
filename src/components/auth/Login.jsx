import { useEffect, useState } from "react";
import { login } from "../../api/api.js";
import { FaEnvelope, FaKey, FaSpinner } from "react-icons/fa";
import LoginRightContent from "./LoginRightContent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../store/authSlice.js";
import SubmitNotification from "../ui/SubmitNotification";
import HOLC from "../hoc/HOLC.jsx";
import Validator from "../../validation/Validator.js";
import { loginRules } from "../../validation/rules.js";
import http from "../../Axios.js";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();

  const initFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initFormData);
  const [actionButtonLoading, setActionButtonLoading] = useState(false);
  const [notification, setNotification] = useState({ msg: null, type: null });

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
      const error = new Validator(formData, loginRules).validate();
      if (error) {
        setNotification({ msg: error, type: "danger" });
        return;
      }

      const form_data = new FormData();
      for (const item in formData) {
        form_data.append(`${item}`, formData[item]);
      }
      const {
        data: { status, data, msg },
      } = await login(form_data);
      if (status) {
        localStorage.setItem("admin_token", data.token);
        http.defaults.headers.Authorization = `Bearer ${data.token}`;
        dispatch(loginAction({ status, user: data.user }));
      } else {
        setNotification({ msg, type: "danger" });
      }
    } catch (e) {
      console.log(e.message);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Cannot logged in right now",
      });
    } finally {
      setActionButtonLoading(false);
    }
  };

  return (
    <HOLC isAuth={isAuthenticated}>
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center">
                  <LoginRightContent />
                  <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                      <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        Login
                      </h2>
                      <form>
                        <div className="mb-4">
                          <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Email
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInput}
                              onKeyDown={handleEnterSubmit}
                              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              placeholder="Enter your email"
                            />
                            <span className="absolute right-4 top-4">
                              <FaEnvelope className="inline" />
                            </span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInput}
                              onKeyDown={handleEnterSubmit}
                              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              placeholder="Enter your password"
                            />
                            <span className="absolute right-4 top-4">
                              <FaKey className="inline" />
                            </span>
                          </div>
                        </div>

                        <SubmitNotification notification={notification} />

                        <div className="mb-5">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={actionButtonLoading}
                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                          >
                            {actionButtonLoading ? (
                              <FaSpinner className="inline animate-spin" />
                            ) : null}{" "}
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </HOLC>
  );
};

export default Login;
