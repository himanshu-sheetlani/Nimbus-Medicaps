import { create } from "zustand";
import { apiClient } from "@/utils/axios";

export const useRecommendationStore = create((set) => ({
  recommendations: [],
  loading: false,
  error: null,

  getRecommendations: async () => {
    try {
      const response = await apiClient.get("/recommendations");
      set({ recommendations: response.data.data.recommendations, error: null });
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      set({ error: "Failed to fetch recommendations" });
    } finally {
      set({ loading: false });
    }
  },
}));
