import axios from "axios";

const instance = axios.create({
    baseURL: "/api",
});

const getToken = () => localStorage.getItem("token");

export default instance;
instance.interceptors.request.use((req) => {
    if (req.url !== "/login") {
        req.headers.Authorization = `Bearer ${getToken()}`;
    }
    return req;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 403) {
            localStorage.removeItem("token");
            window.location.reload();
        }

        return error;
    }
);
