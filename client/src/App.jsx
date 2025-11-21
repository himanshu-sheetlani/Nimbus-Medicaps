import React from "react";
import { Route, Routes } from "react-router-dom";
import Land from "./pages/land/page";
import Auth from "./pages/auth/page";
import Board from "./pages/on-board/page";

// stores
import { useAuthStore } from "./stores/useAuthStore";

// guards
import {
  ProtectedRoute,
  PublicRoute,
  OnboardGuard,
  OnboardingRoute,
} from "./components/guards/index";

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
    </Routes>
  );
};
export default App;
