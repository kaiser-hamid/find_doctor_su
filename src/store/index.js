import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import uiSlice from "./uiSlice.js";

const store = configureStore({
  reducer: { auth: authSlice, ui: uiSlice },
});

export default store;
