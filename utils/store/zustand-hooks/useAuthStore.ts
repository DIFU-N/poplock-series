import { login, register } from "@/utils/apis/auth";
import {
  AuthResponse,
  LoginFormInitialValues,
  RegisterFormInitialValues,
} from "@/utils/types/auth";
import { User } from "@/utils/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  loading: boolean;
  error: string | null;
  user: User | null;

  login: (formValues: LoginFormInitialValues) => Promise<void>;
  register: (formValues: RegisterFormInitialValues) => Promise<void>;
  logout: () => void;
}

const initialState: AuthStore = {
  token: null,
  error: null,
  loading: false,
  user: null,

  login: async () => {},
  register: async () => {},
  logout() {},
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      login: async (formValues: LoginFormInitialValues) => {
        set({ loading: true, error: null });

        try {
          const data: AuthResponse = await login(formValues);

          set({
            token: data.token,
            loading: false,
            user: data.user,
          });
        } catch {
          set({
            loading: false,
            error: "Invalid username or password",
          });
        }
      },
      register: async (formValues: RegisterFormInitialValues) => {
        set({ loading: true, error: null });

        try {
          const data: AuthResponse = await register(formValues);

          set({
            token: data.token,
            loading: false,
            user: data.user,
          });
        } catch {
          set({
            loading: false,
            error: "Invalid username or password",
          });
        }
      },
      logout: () => {
        set({ token: null });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
