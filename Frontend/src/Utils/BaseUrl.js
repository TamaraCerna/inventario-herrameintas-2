import axios from "axios";

// URL del API Gateway
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // déjalo solo si usas cookies/sesión
});

export default api;
