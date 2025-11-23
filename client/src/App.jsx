import React from "react";
import { Route, Routes } from "react-router-dom";
import Land from "./pages/land/page";
import Auth from "./pages/auth/page";
import Board from "./pages/on-board/page";
import Home from "./pages/home/page";
import Models from "./pages/model/page";
import Trips from "./pages/trips/page";
import TripDetail from "./pages/trips/routes/page";
import Profile from "./pages/profile/page";
import Setting from "./pages/settings/page";
import NotFound from "./pages/404/page";

// stores
import { useAuthStore } from "./stores/useAuthStore";

// guards
import {
  ProtectedRoute,
  PublicRoute,
  OnboardGuard,
  OnboardingRoute,
} from "./components/guards/index";

import Layout from "./components/layout/layout";

import { Spinner } from "./components/ui/spinner";

const App = () => {
  const { checkAuth, checkingAuth } = useAuthStore();
  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Spinner className="size-8 text-white" />
      </div>
    );
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Land />
          </PublicRoute>
        }
      />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      <Route
        path="/on-board"
        element={
          <OnboardingRoute>
            <Board />
          </OnboardingRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/home"
          element={
            <OnboardGuard>
              <Home />
            </OnboardGuard>
          }
        />
        <Route
          path="/3d-models"
          element={
            <OnboardGuard>
              <Models />
            </OnboardGuard>
          }
        />
        <Route
          path="/my-trips"
          element={
            <OnboardGuard>
              <Trips />
            </OnboardGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <OnboardGuard>
              <Profile />
            </OnboardGuard>
          }
        />
        <Route
          path="/settings"
          element={
            <OnboardGuard>
              <Setting />
            </OnboardGuard>
          }
        />
        <Route
          path="/my-trips/:tripId"
          element={
            <OnboardGuard>
              <TripDetail />
            </OnboardGuard>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default App;
