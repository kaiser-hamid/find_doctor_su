import axios from "axios";
import http from "../Axios.js";

//Authentication
export const login = (data) => http.post("admin/login", data);
export const authCheck = () => http.get("admin/auth-check");
export const authPasswordChange = (data) =>
  http.post("admin/password-change", data);

//Chamber
export const chambers = () => http.get("admin/chambers");
export const chamberSave = (data) =>
  http.post("admin/chambers", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const chamberUpdate = (data, id) =>
  http.put(`admin/chambers/${id}/update`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const removeChamber = (id) => http.delete(`admin/chambers/${id}`);
export const chamberAddFormHelperData = () =>
  http.get("admin/chamber/form-helper-data");
export const chamberEditFormHelperData = (id) =>
  http.get(`admin/chambers/${id}/edit`);

//Doctor
export const doctors = () => http.get("admin/doctors");
export const doctorSave = (data) =>
  http.post("admin/doctors", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const doctorUpdate = (data, id) =>
  http.put(`admin/doctors/${id}/update`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const removeDoctor = (id) => http.delete(`admin/doctors/${id}`);
export const doctorAddFormHelperData = () =>
  http.get("admin/doctor/form-helper-data");
export const doctorEditFormHelperData = (id) =>
  http.get(`admin/doctors/${id}/edit`);

//Utility
export const divisionDropdown = () => http.get("division-options");
export const districtDropdownByDivisionId = (id) =>
  http.get(`district-options/${id}`);
export const upazilaDropdownByDistrictId = (id) =>
  http.get(`upazila-options/${id}`);
