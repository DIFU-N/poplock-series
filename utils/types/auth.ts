export type AuthResponse = {
    token: string;
}

interface AuthFormValues {
    username: string;
    password: string;
}

export type LoginFormInitialValues = AuthFormValues;