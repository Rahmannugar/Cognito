import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/lib/store/authStore";

/**
 * Auth Middleware Component
 * This component acts as a client-side middleware to protect routes and ensure auth state validity.
 * It checks for the auth token on every route change and window focus.
 */
export function AuthMiddleware({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout, checkAuth } = useAuthStore();

  // Check auth on mount, location change, and window focus
  useEffect(() => {
    const verifyAuth = () => {
      const token = Cookies.get("auth_token");

      // If we think we are authenticated but have no token, logout immediately
      if (isAuthenticated && !token) {
        logout();
        return;
      }

      // If we have a token but state says not authenticated, verify it
      if (!isAuthenticated && token) {
        checkAuth();
      }
    };

    // Run verification on mount/update (only if not already authenticated but token exists)
    if (!isAuthenticated && Cookies.get("auth_token")) {
      verifyAuth();
    }

    // Run verification on window focus (user comes back to tab)
    window.addEventListener("focus", verifyAuth);

    // Run verification on storage events (e.g. logout in another tab)
    window.addEventListener("storage", verifyAuth);

    return () => {
      window.removeEventListener("focus", verifyAuth);
      window.removeEventListener("storage", verifyAuth);
    };
  }, [isAuthenticated, logout, checkAuth]);

  return <>{children}</>;
}
