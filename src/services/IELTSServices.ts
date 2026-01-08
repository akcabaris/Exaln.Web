import api from '../api/baseApi';

import type { ReadingPractice, StartReadingExamResponse } from "../types/IELTSResponseTypes";
import type { StartReadingPractice, SaveReadingQuestionsAnswer } from "../types/IELTSRequestTypes"

export const getReadingPractices = async (): Promise<ReadingPractice[]> => {
    try {
        const response = await api.get<ReadingPractice[]>(
            "/ielts/reading-practices"
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }
};

export const startReadingPractices = async (
    payload: StartReadingPractice
): Promise<StartReadingExamResponse> => {
    try {
        const response = await api.post<StartReadingExamResponse>(
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


export const saveReadingQuestionsAnswer = async (payload: SaveReadingQuestionsAnswer): Promise<void> => {
    try {
        await api.post<Promise<void>>(`/ielts-attempt/save-users-answer`, payload);
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }
}