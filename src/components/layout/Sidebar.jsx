import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [selected, setSelected] = useState("Dashboard");

  const handleMenuClick = (menuItem) => {
    setSelected(selected === menuItem ? "" : menuItem);
  };

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center gap-2 px-6 py-5.5 bg-boxdark">
        <Link to="/dashboard">
          <img src="/images/site/logo.png" className="h-11" alt="Logo" />
        </Link>
        <h4 className="text-meta-6 font-semibold text-lg p-2">Find Doctor</h4>
      </div>
      {/* SIDEBAR HEADER */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2 text-white">
              Stock Management
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5 pl-6">
              {/* Menu Item Form Elements */}
              <li>
                <Link
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 dark:text-textdark2 transition-colors"
                  to="products"
                >
                  <FaList />
                  <span>Products</span>
                </Link>
              </li>
              {/* Menu Item Form Elements */}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2 text-white">
              Company Management
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5 pl-6">
              {/* Menu Item Form Elements */}
              <li>
                <a
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 dark:text-textdark2 transition-colors"
                  href="#"
                >
                  <FaList />
                  <span>Companies</span>
                </a>
              </li>
              {/* Menu Item Form Elements */}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2 text-white">
              Employee Management
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5 pl-6">
              {/* Menu Item Chart */}
              <li>
                <a
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark2 dark:text-textdark2 transition-colors ${
                    selected === "Dashboard"
                      ? "bg-green-800 dark:bg-green-700"
                      : ""
                  }`}
                  href="#"
                  onClick={() => handleMenuClick("Dashboard")}
                >
                  <FaList />
                  <span>Employees</span>
                </a>
              </li>
              {/* Menu Item Chart */}
            </ul>
          </div>
        </nav>
        {/* Sidebar Menu */}
      </div>
    </aside>
  );
}
