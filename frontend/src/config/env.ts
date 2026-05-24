// Using import.meta.env for Vite environment variables
// In production (Vercel), it defaults to relative '/api' since they are hosted together.
export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3000/api');

