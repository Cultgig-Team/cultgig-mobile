import { create } from 'zustand';

/**
 * ZUSTAND STORE: Auth
 * -------------------------------------------------------
 * Client/UI state (things like "is user logged in", "current
 * user object", theme mode, etc.) lives in Zustand stores.
 *
 * Server data (artworks, profiles, comments fetched from an
 * API) should NOT go here — use React Query for that instead
 * (see src/services + src/hooks). This keeps a clean split:
 *   Zustand  = client/UI state
 *   React Query = server/cache state
 */

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
