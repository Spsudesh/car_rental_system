// central configuration for API and other environment defaults
// base URL for backend requests; make sure VITE_API_URL is defined in .env
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
if (!import.meta.env.VITE_API_URL) {
  console.warn("[config] VITE_API_URL not provided – falling back to", API_URL);
}

export const CURRENCY = import.meta.env.VITE_CURRENCY || "$/";

// you can use this file to export more shared settings later
