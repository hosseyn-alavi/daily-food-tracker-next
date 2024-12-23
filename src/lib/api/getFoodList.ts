import type {FoodAttributes} from "@/models/Food";
import serverAxios from "./serverAxios";
import axios from "./axios";

export const getFoodsListServer = async (token?: string) => {
    try {
        const response = await serverAxios.get<FoodAttributes[]>("/food", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data ?? [];
    } catch (error) {
        console.log("error in getFoodsList:", error);
    }
};
export const getFoodsListClient = async () => {
    try {
        const response = await axios.get<FoodAttributes[]>("/food");
        return response.data ?? [];
    } catch (error) {
        console.log("error in getFoodsList:", error);
    }
};
