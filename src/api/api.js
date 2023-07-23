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

//Products
export const products = () => http.get("products");
export const productSave = (data) => http.post("products", data);
export const productAddFormHelperData = () =>
  http.get("products/form-helper-data");
export const productEditFormHelperData = (id) =>
  http.get(`products/${id}/edit`);
export const productUpdate = (data, id) =>
  http.post(`products/${id}/update`, data);
