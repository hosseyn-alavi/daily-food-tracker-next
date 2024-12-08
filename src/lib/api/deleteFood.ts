import axios from "./axios";

export const deleteFood = async (id: number) => {
    try {
        await axios.delete(`/food/${id}`);
        return null;
    } catch (error) {
        return error;
    }
};
