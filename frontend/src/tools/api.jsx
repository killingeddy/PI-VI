import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-pi-vi.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
