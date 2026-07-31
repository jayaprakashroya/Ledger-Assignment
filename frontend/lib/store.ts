'use client';

import { create } from 'zustand';

export type AuthState = {
  token: string | null;
  email: string | null;
  userId: string | null;
  hydrated: boolean;
  setAuth: (token: string, email: string, userId: string) => void;
  clearAuth: () => void;
  hydrateFromStorage: () => void;
};

const STORAGE_KEY = 'music_catalog_auth';

export const getSavedAuthToken = () => {
  if (typeof window === 'undefined') return null;
  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY);
    if (!serialized) return null;
    const parsed = JSON.parse(serialized) as { token?: string };
    return parsed.token ?? null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  email: null,
  userId: null,
  hydrated: false,
  setAuth: (token, email, userId) => {
    set({ token, email, userId });
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, email, userId }));
    }
  },
  clearAuth: () => {
    set({ token: null, email: null, userId: null });
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  },
  hydrateFromStorage: () => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      set({ hydrated: true, token: null, email: null, userId: null });
      return;
    }
    try {
      const parsed = JSON.parse(saved) as { token?: string; email?: string; userId?: string };
      if (parsed.token && parsed.email && parsed.userId) {
        set({ token: parsed.token, email: parsed.email, userId: parsed.userId, hydrated: true });
      } else {
        set({ hydrated: true, token: null, email: null, userId: null });
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      set({ hydrated: true, token: null, email: null, userId: null });
    }
  },
}));
