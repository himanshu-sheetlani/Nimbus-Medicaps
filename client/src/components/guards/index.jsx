import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { Spinner } from "../ui/spinner";

/**
 * ProtectedRoute - Guards routes that require user to be logged in
 * Redirects to login page if user is not authenticated
 */
export const ProtectedRoute = ({ children, fallbackPath = "/" }) => {
  const { isAuthenticated, checkingAuth } = useAuthStore();
  const location = useLocation();

  // Show loading while checking auth status
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Redirect to login if not authenticated, preserve intended destination
  if (!isAuthenticated) {
    return (
      <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
};

/**
 * OnboardGuard - Guards routes that require user to complete onboarding
 * Redirects to onboarding page if user is authenticated but not onboarded
 */
export const OnboardGuard = ({ children, fallbackPath = "/on-board" }) => {
  const { isAuthenticated, user, checkingAuth } = useAuthStore();
  const location = useLocation();

  // Show loading while checking auth status
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // First check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  // Then check if user needs onboarding
  if (user && !user.onBoarded) {
    return (
      <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
};

/**
 * PublicRoute - Guards routes that should only be accessible to non-authenticated users
 * Redirects authenticated users to home or intended destination
 */
export const PublicRoute = ({ children, fallbackPath = "/home" }) => {
  const { isAuthenticated, user, checkingAuth } = useAuthStore();
  const location = useLocation();

  // Show loading while checking auth status
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // If user is authenticated, redirect based on onboarding status
  if (isAuthenticated) {
    // If user needs onboarding, send to onboarding
    if (user && !user.onBoarded) {
      return <Navigate to="/on-board" replace />;
    }

    // Otherwise, send to intended destination or fallback
    const intendedPath = location.state?.from || fallbackPath;
    return <Navigate to={intendedPath} replace />;
  }

  return <>{children}</>;
};

/**
 * OnboardingRoute - Special guard for onboarding pages
 * Ensures user is authenticated but not yet onboarded
 */
export const OnboardingRoute = ({ children, fallbackPath = "/home" }) => {
  const { isAuthenticated, user, checkingAuth } = useAuthStore();

  // Show loading while checking auth status
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Must be authenticated to access onboarding
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If already onboarded, redirect to home
  if (user && user.onBoarded) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};
