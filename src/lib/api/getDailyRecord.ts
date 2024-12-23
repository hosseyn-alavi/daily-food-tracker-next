import type {DailyRecordAttributes} from "@/models/DailyRecord";
import {getCurrentDate} from "../utils/getCurrentDate";
import axios from "./axios";
import serverAxios from "./serverAxios";
export interface GetRecordResponse {
    records: DailyRecordAttributes[];
    dailyGoal?: number;
}

export const getDailyRecords = async (date?: Date) => {
    try {
        const response = await axios.get<GetRecordResponse>(
            `/record/${getCurrentDate(date)}`
        );

        return response.data ?? {records: [], dailyGoal: 0};
    } catch (error) {
        return {records: [], dailyGoal: 0};
    }
};
export const getDailyRecordsServer = async (token?: string) => {
    try {
        const response = await serverAxios.get<GetRecordResponse>(
            `/record/${getCurrentDate()}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data ?? {records: [], dailyGoal: 0};
    } catch (error) {
        return {records: [], dailyGoal: 0};
    }
};
