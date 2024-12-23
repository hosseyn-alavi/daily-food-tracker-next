import type {Inputs} from "@/app/login/page";
import axios from "./axios";
import Cookies from "js-cookie";

export const login = async (arg: Inputs) => {
    try {
        const response = await axios.post("/user/login", {
            username: arg.username.toLowerCase(),
            password: arg.password,
        });
        if (response.data.token) {
            Cookies.set("token", response.data.token, {expires: 7});
        }
        return response.data;
    } catch (error) {
        return error;
    }
};
