import {Inputs} from "@/pages/login";
import axios from "./axios";

export const login = async (arg: Inputs) => {
    try {
        const response = await axios.post("/user/login", {
            username: arg.username.toLowerCase(),
            password: arg.password,
        });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        return error;
    }
};
