import { create } from 'zustand';

interface AuthState {
  token: string | null;
  userId: number | null;
  setAuth: (token: string, userId: number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('auth_token'),
  userId: localStorage.getItem('auth_userId') ? parseInt(localStorage.getItem('auth_userId')!) : null,
  setAuth: (token, userId) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_userId', userId.toString());
    set({ token, userId });
  },
  clearAuth: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_userId');
    set({ token: null, userId: null });
  },
}));

