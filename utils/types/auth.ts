import { User } from "./user";

export type AuthResponse = {
    token: string;
    user: User;
    message: string;
}

interface AuthFormValues {
    username: string;
    password: string;
}

export type LoginFormInitialValues = AuthFormValues;

export type RegisterFormInitialValues = AuthFormValues;