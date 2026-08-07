import axios from 'axios';

/**
 * Central axios instance. All API calls go through this so
 * base URL, headers, and interceptors (auth tokens, error
 * logging, etc.) live in ONE place.
 */
export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.your-backend.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: attach auth token to every request once you have auth wired up
// apiClient.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
