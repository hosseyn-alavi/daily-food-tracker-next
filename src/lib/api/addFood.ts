import type {FoodAttributes} from "@/models/Food";
import axios from "./axios";

export const addFood = async (arg: FoodAttributes) => {
    try {
        await axios.post("/food", {
            name: arg.name,
            caloriesPer100g: arg.caloriesPer100g,
            defaultWeight: arg.defaultWeight,
        });
        return null;
    } catch (error) {
        return error;
    }
};
