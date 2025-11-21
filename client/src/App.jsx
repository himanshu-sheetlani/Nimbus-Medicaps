import React from "react";
import { Route, Routes } from "react-router-dom";
import Land from "./pages/land/page";
import Auth from "./pages/auth/page";
import Board from "./pages/on-board/page";
import Home from "./pages/home/page";
import Models from "./pages/model/page";

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
      </Route>
    </Routes>
  );
};
export default App;
