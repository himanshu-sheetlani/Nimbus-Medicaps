import { create } from "zustand";
import { apiClient } from "@/utils/axios";

export const useTripStore = create((set, get) => ({
  trips: [],
  trip : null,
  loading: false,
  error: null,

  fetchTrips: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get("/vapi/trips");
      set({ trips: response.data.data.trips || [], loading: false });
    } catch (error) {
      console.error("Error fetching trips:", error);
      set({
        error: error.response?.data?.error || "Failed to fetch trips",
        loading: false,
      });
    }
  },

  getTripInsights: async (tripId) => {
    try {
      const response = await apiClient.get(`/vapi/insights/${tripId}`);
      return response.data.data.insights;
    } catch (error) {
      console.error("Error fetching trip insights:", error);
      throw error;
    }
  },

  createCall: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post("/vapi/call");
      // Refresh trips after creating a call
      await get().fetchTrips();
      return response.data.data
    } catch (error) {
      console.error("Error creating call:", error);
      set({
        error: error.response?.data?.error || "Failed to create call",
        loading: false,
      });
      throw error;
    }
  },

  getTripById : async (tripId) => {
    try {
      const response = await apiClient.get(`/vapi/trip/${tripId}`);
      set({ trip: response.data.data.trip });

    } catch (error) {
      console.error("Error fetching trip details:", error);
    }finally{
      set({ loading: false });
    }
  }
}));
