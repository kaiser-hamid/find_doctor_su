import axios from "axios";
import http from "../Axios.js";

//token initialization
// const token = localStorage.getItem("admin_token");
// if (token) {
//   http.defaults.headers.Authorization = `Bearer ${token}`;
// }

//Authentication
export const login = (data) => http.post("admin/login", data);
export const authCheck = () => http.get("admin/auth-check");
export const authPasswordChange = (data) =>
  http.post("admin/password-change", data);

//Doctor
export const doctors = () => http.get("admin/doctors");
export const doctorSave = (data) => http.post("admin/doctors", data);
export const doctorAddFormHelperData = () =>
  http.get("admin/doctor/form-helper-data");
export const doctorEditFormHelperData = (id) =>
  http.get(`admin/doctors/${id}/edit`);
export const doctorUpdate = (data, id) =>
  http.post(`admin/doctors/${id}/update`, data);

//Chamber
export const chambers = () => http.get("admin/chambers");
export const chamberSave = (data) =>
  http.post("admin/chambers", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const removeChamber = (id) => http.delete(`admin/chambers/${id}`);
export const chamberAddFormHelperData = () =>
  http.get("admin/chamber/form-helper-data");
export const chamberEditFormHelperData = (id) =>
  http.get(`admin/chambers/${id}/edit`);
export const productUpdate = (data, id) =>
  http.post(`admin/chambers/${id}/update`, data);

//Utility
export const divisionDropdown = () => http.get("division-options");
export const districtDropdownByDivisionId = (id) =>
  http.get(`district-options/${id}`);
export const upazilaDropdownByDistrictId = (id) =>
  http.get(`upazila-options/${id}`);
