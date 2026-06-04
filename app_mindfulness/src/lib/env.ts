// lib/env.ts
export const env = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL as string,
  showDebug: import.meta.env.DEV,
} as const;
