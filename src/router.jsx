import { createBrowserRouter } from "react-router-dom"
import Login from "./components/auth/Login.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Root from "./components/dashboard/Root.jsx";
import Products from "./components/dashboard/products/Products";
import {AddProduct} from "./components/dashboard/products/AddProduct";
import HOAC from "./components/hoc/HOAC.jsx";
import Profile from "./components/dashboard/profile/Profile";
import {EditProfileForm} from "./components/dashboard/profile/EditProfileForm";
import {EditProduct} from "./components/dashboard/products/EditProduct";

export default createBrowserRouter([
    {
        path: "/",
        element: <HOAC><Login /></HOAC>,
    },
    {
        path: "/login",
        element: <HOAC><Login /></HOAC>,
    },
    {
        path: "/dashboard",
        element: <HOAC><Root /></HOAC>,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "products",
                element: <Products />
            },
            {
                path: "products/add",
                element: <AddProduct />
            },
            {
                path: "products/:id/edit",
                element: <EditProduct />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "profile/edit",
                element: <EditProfileForm />
            }
        ]
    },
]);

