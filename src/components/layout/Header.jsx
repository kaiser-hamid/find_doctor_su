import React, { useState } from "react";
import {
  FaProcedures,
  FaRegUserCircle,
  FaSignOutAlt,
  FaSpinner,
  FaTruckLoading,
} from "react-icons/fa";
import MobileNav from "../layout/MobileNav.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/authSlice.js";
import { Link } from "react-router-dom";

export default function Headerr() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [sidebarToggle, setSidebarToggle] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const handleLogout = async () => {
    dispatch(logoutAction());
  };

  return (
    <header className="sticky top-0 z-999 w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            onClick={handleSidebarToggle}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarToggle && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarToggle && "!w-full delay-400"
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarToggle && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarToggle && "!h-0 delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarToggle && "!h-0 dealy-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* Hamburger Toggle BTN */}
          <a className="block flex-shrink-0 lg:hidden" href="index.html">
            <img src="./images/site/logo.png" className="w-20" alt="Logo" />
          </a>
        </div>
        <div></div>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/dashboard/profile">
                <FaRegUserCircle className="text-bodydark2 inline" />
                <span className="text-bodydark2">
                  {" "}
                  {user.first_name} {user.last_name}
                </span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="text-bodydark2"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="inline" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {sidebarToggle && <MobileNav />}
    </header>
  );
}
