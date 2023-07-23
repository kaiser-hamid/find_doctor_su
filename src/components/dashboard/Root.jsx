import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header.jsx";
import { useSelector } from "react-redux";
import HODC from "../hoc/HODC.jsx";

export default function Root() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <HODC isAuth={isAuthenticated}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <Outlet />
        </div>
      </div>
    </HODC>
  );
}
