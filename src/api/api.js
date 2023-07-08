import http, {AxiosToDomain} from "../Axios.js";

export const csrfCookie = () => AxiosToDomain.get("sanctum/csrf-cookie");

//Authentication
export const login = (data) => http.post("auth/login", data);
export const authCheck = () => http.get("auth/check");
export const authLogout = () => http.get("auth/logout");
export const authPasswordChange = (data) => http.post("auth/password-change", data);

//Products
export const products = () => http.get("products");
export const productSave = (data) => http.post("products", data);
export const productAddFormHelperData = () => http.get("products/form-helper-data");
export const productEditFormHelperData = (id) => http.get(`products/${id}/edit`);
export const productUpdate = (data, id) => http.post(`products/${id}/update`, data);




