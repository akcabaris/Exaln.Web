export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    token: string;
    expiration: string;
    user: User;
}