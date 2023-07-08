import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8090/api/",
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});
export default http;

export const AxiosToDomain = axios.create({
    baseURL: "http://localhost:8090/",
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

