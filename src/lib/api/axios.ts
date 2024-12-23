import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: "/api",
});

export default instance;
instance.interceptors.request.use((req) => {
    if (req.url !== "/login") {
        const token = Cookies.get("token");
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 403) {
            Cookies.remove("token");
            window.location.href = "/login";
        }

        return error;
    }
);
