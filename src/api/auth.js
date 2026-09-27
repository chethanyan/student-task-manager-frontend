import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
