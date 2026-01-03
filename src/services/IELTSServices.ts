import api from '../api/baseApi';

import type { IELTSReadingPracticeDTO } from "../types/IELTSTypes";

export const getReadingPractices = async (): Promise<IELTSReadingPracticeDTO[]> => {
    try {
        const response = await api.get<IELTSReadingPracticeDTO[]>(
            "/ielts/reading-practices"
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }
};
