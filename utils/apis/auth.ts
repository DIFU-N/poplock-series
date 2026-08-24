import axios from "axios";
import {
  AuthResponse,
  LoginFormInitialValues,
  RegisterFormInitialValues,
} from "../types/auth";
import { useAuthStore } from "../store/zustand-hooks/useAuthStore";

export const API_BASE = "http://localhost:5191/api";

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = async ({ password, username }: LoginFormInitialValues) => {
  const response = await axios.post(`${API_BASE}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const register = async ({
  password,
  username,
}: RegisterFormInitialValues): Promise<AuthResponse> => {
  const response = await axios.post(`${API_BASE}/auth/register`, {
    username,
    password,
  });

  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_BASE}/auth/logout`);

  return response.data;
};

export const me = async () => {
  const res = await axios.get(`${API_BASE}/secure/me`, {
    withCredentials: true,
  });

  return res.data;
};
