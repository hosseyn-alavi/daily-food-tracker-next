import type {FoodDetailsRecord} from "@/app/Home";
import {getCurrentDate} from "../utils/getCurrentDate";
import axios from "./axios";

export const submitRecords = async (arg: FoodDetailsRecord) => {
    try {
        const response = await axios.post(`/record/${getCurrentDate()}`, arg);
        return response;
    } catch (error) {
        return null;
    }
};
