import { login, register } from "@/app/utils/apis/auth";
import {
  AuthResponse,
  LoginFormInitialValues,
  RegisterFormInitialValues,
} from "@/app/utils/types/auth";
import { User } from "@/app/utils/types/user";
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
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
}

const initialState: AuthStore = {
  token: null,
  error: null,
  loading: false,
  user: null,

  login: async () => {},
  register: async () => {},
  logout() {},
  hasHydrated: false,

  setHasHydrated: () => {},
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

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
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
