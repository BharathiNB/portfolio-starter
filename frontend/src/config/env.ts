// Using import.meta.env for Vite environment variables
// Ensure you have a .env file with VITE_API_URL or it will default to localhost:3000
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
