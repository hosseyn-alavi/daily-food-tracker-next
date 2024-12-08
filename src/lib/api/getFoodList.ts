import type {FoodAttributes} from "@/models/Food";
import axios from "./axios";

export const getFoodsList = async () => {
    try {
        const response = await axios.get<FoodAttributes[]>("/food");
        return response.data ?? [];
    } catch (error) {}
};
