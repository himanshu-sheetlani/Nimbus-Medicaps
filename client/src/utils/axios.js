import axios from "axios";

const isProduction = import.meta.env.VITE_ENV === "production";
const productionURL = import.meta.env.VITE_PROD_API_URL;

export const apiClient = axios.create({
  baseURL: isProduction ? productionURL : "http://localhost:5000/api",
  withCredentials: true,
});
