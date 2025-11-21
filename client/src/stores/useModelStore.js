import { create } from "zustand";
import { apiClient } from "@/utils/axios";

export const useModelStore = create((set) => ({
  models: [],
  isLoading: false,
  error: null,

  getModels: async () => {
    try {
      const response = await apiClient.get("/3dmodel");
      set({ models: response.data.data.models });
    } catch (error) {
      console.error("Error fetching 3D models:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
