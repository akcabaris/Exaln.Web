import api from '../api/baseApi';

import type { LoginPayload, RegisterPayload, AuthResponse } from '../types/authTypes';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>("/auth/login", payload);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed, please try again.");
    }
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", payload);
    return response.data;
};

export const logout = async (): Promise<void> => {
    const response = await api.post("/auth/logout");
    if (response) {
        localStorage.removeItem("accessToken");
    }
}