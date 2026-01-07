import api from '../api/baseApi';

import type { IELTSReadingPracticeDTO, IELTSReadingSectionDTO } from "../types/IELTSResponseTypes";
import type { IELTSStartReadingPracticeDTO } from "../types/IELTSRequestTypes"

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

export const startReadingPractices = async (payload: IELTSStartReadingPracticeDTO): Promise<IELTSReadingSectionDTO[]> => {
    try {
        const response = await api.post<IELTSReadingSectionDTO[]>(
            `/ielts-attempt/start-reading-exam/${payload.examID}`,
            null,
            {
                params: {
                    isTimed: payload.isTimed,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }
};
