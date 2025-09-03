import axios from "axios";

// Directly use backend API URL (no .env)
const api = axios.create({
  baseURL: "http://localhost:5000/api" // 👈 change if your backend runs elsewhere
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tm_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
