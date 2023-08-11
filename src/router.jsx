import { createBrowserRouter } from "react-router-dom";

import HOAC from "./components/hoc/HOAC.jsx";
import Login from "./components/auth/Login.jsx";
import Root from "./components/dashboard/Root.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Profile from "./components/dashboard/profile/Profile";
import { EditProfileForm } from "./components/dashboard/profile/EditProfileForm";
import Doctors from "./components/dashboard/doctors/Doctors";
import { AddDoctor } from "./components/dashboard/doctors/AddDoctor";
import { EditDoctor } from "./components/dashboard/doctors/EditDoctor";
import { AddChamber } from "./components/dashboard/chambers/AddChamber.jsx";
import Chambers from "./components/dashboard/chambers/Chambers.jsx";
import { EditChamber } from "./components/dashboard/chambers/EditChamber.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: (
      <HOAC>
        <Login />
      </HOAC>
    ),
  },
  {
    path: "/login",
    element: (
      <HOAC>
        <Login />
      </HOAC>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <HOAC>
        <Root />
      </HOAC>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/edit",
        element: <EditProfileForm />,
      },
      {
        path: "doctors",
        element: <Doctors />,
      },
      {
        path: "doctors/add",
        element: <AddDoctor />,
      },
      {
        path: "doctors/:id/edit",
        element: <EditDoctor />,
      },
      {
        path: "chambers",
        element: <Chambers />,
      },
      {
        path: "chambers/add",
        element: <AddChamber />,
      },
      {
        path: "chambers/:id/edit",
        element: <EditChamber />,
      },
    ],
  },
]);
