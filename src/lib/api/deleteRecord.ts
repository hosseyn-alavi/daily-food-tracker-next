import axios from "./axios";

export const deleteRecord = async (id: number) => {
    try {
        await axios.delete(`/record/delete/${id}`);
        return null;
    } catch (error) {
        return error;
    }
};
