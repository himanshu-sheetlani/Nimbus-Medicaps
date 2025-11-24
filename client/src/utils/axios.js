import axios from "axios";

const isProduction = process.env.VITE_ENV === "production";
const productionURL = process.env.VITE_PROD_API_URL;

export const apiClient = axios.create({
  baseURL: isProduction ? productionURL : "http://localhost:5000/api",
  withCredentials: true,
});
