import axios from "axios";
import { create } from "zustand";
import { adminCreateInvite, createInvite, fetchInvite } from "../../apis/invite";
import { CreateInviteRequest } from "../../types/invite";
import { FFRankDTO } from "../../types/ffranks";

export interface InviteShow {
  id: number; // TVMaze show id
  name: string;
  image?: { original: string } | null;
}

export interface InviteData {
  token: string;
  recipientName: string;
  createdByName?: string;
  expiresAt: string;
  used: boolean;
  shows: FFRankDTO[];
}

interface InviteState {
  invite: InviteData | null;
  token: string | null;
  inviteLink: string;
  loading: boolean;
  error: string | null;
  submitting: boolean;
  submitted: boolean;
  fetchInvite: (token: string) => Promise<void>;
  submitList: (token: string, tvMazeIds: number[]) => Promise<void>;
  reset: () => void;
  createInvite: (request: CreateInviteRequest) => Promise<void>;
  adminCreateInvite: (name: string) => Promise<void>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const useInviteStore = create<InviteState>((set) => ({
  invite: null,
  loading: false,
  error: null,
  submitting: false,
  submitted: false,
  inviteLink: "",
  token: null,

  fetchInvite: async (token) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchInvite(token);
      console.log("store", data);

      set({
        invite: data,
        loading: false,
        token: token
      });
    } catch (error: unknown) {
      set({
        loading: false,
        error: axios.isAxiosError(error)
          ? error.message
          : "something went wrong",
      });
    }
  },

  submitList: async (token, tvMazeIds) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/invite/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tvMazeIds }),
      });

      if (!res.ok) {
        throw new Error("Couldn't save your list — try again.");
      }

      set({ submitting: false, submitted: true });
    } catch (err) {
      set({
        submitting: false,
        error:
          err instanceof Error
            ? err.message
            : "Couldn't save your list — try again.",
      });
    }
  },

  reset: () =>
    set({
      invite: null,
      inviteLink: "",
      loading: false,
      error: null,
      submitting: false,
      submitted: false,
    }),

  createInvite: async ({ name, token }) => {
    set({ loading: true, error: null });
    try {
      const data = await createInvite({ name, token });

      set({
        inviteLink: data,
        loading: false,
      });
    } catch (error: unknown) {
      set({
        loading: false,
        error: axios.isAxiosError(error)
          ? error.message
          : "something went wrong",
      });
    }
  },
  adminCreateInvite: async (name ) => {
    set({ loading: true, error: null });
    try {
      const data = await adminCreateInvite(name);

      console.log(data);
      

      set({
        inviteLink: data.link,
        loading: false,
      });
    } catch (error: unknown) {
      set({
        loading: false,
        error: axios.isAxiosError(error)
          ? error.message
          : "something went wrong",
      });
    }
  },
}));
