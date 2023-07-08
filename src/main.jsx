import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import router from "./router";
import store from "./store/index.js";
import "./index.css";
import PagePopup from "./components/ui/PagePopup";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PagePopup></PagePopup>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
