import { create } from "zustand";
import { apiClient } from "@/utils/axios";
import { toast } from "sonner";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  checkingAuth: true,

  signUp: async (idToken) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post("/auth/signup", { idToken });
      set({
        user: response.data.data.user,
        isAuthenticated: true,
      });
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      set({ user: null, isAuthenticated: false });
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      const response = await apiClient.get("/auth/check-auth");
      set({
        user: response.data.data.user,
        isAuthenticated: !!response.data.data.user,
      });
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  onBoardUser: async (onBoardData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post("/auth/onboard", onBoardData);

      set({
        user: response.data.data.user,
        isAuthenticated: true,
      });
      toast.success("Onboarding successful!");
    } catch (error) {
      console.error("Onboarding failed:", error);
      const message = error.response?.data?.message || "Onboarding failed";
      toast.error(message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getUserProfile: async () => {
    try {
      set({ isLoading: true });
      const response = await apiClient.get("/auth/profile");
      set({
        user: response.data.data.user,
      });
      return response.data.data.user;
    } catch (error) {
      console.error("Failed to get user profile:", error);
      const message = error.response?.data?.message || "Failed to get profile";
      toast.error(message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserProfile: async (profileData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.put("/auth/profile", profileData);
      set({
        user: response.data.data.user,
      });
      toast.success("Profile updated successfully!");
      return response.data.data.user;
    } catch (error) {
      console.error("Failed to update profile:", error);
      const message =
        error.response?.data?.message || "Failed to update profile";
      toast.error(message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
