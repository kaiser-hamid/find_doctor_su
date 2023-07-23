import axios from "axios";
const headers = {
  "Content-Type": "application/json",
};
const token = localStorage.getItem("admin_token");
if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const http = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers,
});

export default http;
