import React, {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import type { ReactNode } from "react"


import {
    login as loginApi,
    register as registerApi,
    logout as logoutApi,
} from "../services/AuthServices";

import type { User, LoginPayload, RegisterPayload } from "../types/AuthTypes";

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = accessToken ? true : false;

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        if (token) setAccessToken(token);
        if (storedUser) setUser(JSON.parse(storedUser));

        setIsLoading(false);
    }, []);

    const login = async (payload: LoginPayload) => {
        try {
            const res = await loginApi(payload);

            localStorage.setItem("accessToken", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));

            setAccessToken(res.token);
            setUser(res.user);
        } catch (err: any) {
            throw err;
        }
    };
    const register = async (payload: RegisterPayload) => {
        await registerApi(payload);
    };

    const logout = async () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        setAccessToken(null);
        setUser(null);

        try {
            await logoutApi();
        } catch (_) { }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
