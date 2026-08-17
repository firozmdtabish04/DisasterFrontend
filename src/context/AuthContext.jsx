import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { logoutUser } from "../service/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore authentication after refresh
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (accessToken) {
      setUser({
        username: username || "Operator",
        role: role || "USER",
      });
    }

    setLoading(false);
  }, []);

  // Save login information
  const handleAuthSuccess = (authData, usernameInput) => {
    const {
      accessToken,
      refreshToken,
      role,
    } = authData;

    const username =
      authData.username ||
      usernameInput ||
      "Operator";

    localStorage.setItem(
      "accessToken",
      accessToken
    );

    if (refreshToken) {
      localStorage.setItem(
        "refreshToken",
        refreshToken
      );
    }

    localStorage.setItem(
      "role",
      role || "USER"
    );

    localStorage.setItem(
      "username",
      username
    );

    setUser({
      username,
      role: role || "USER",
    });
  };

  // Login
  const login = (authData, usernameInput) => {
    if (!authData?.accessToken) {
      console.error("Invalid authentication data");

      return {
        success: false,
        message: "Authentication failed",
      };
    }

    handleAuthSuccess(
      authData,
      usernameInput
    );

    return {
      success: true,
    };
  };

  // Logout
  const logout = async () => {
    const refreshToken =
      localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (error) {
      console.error(
        "Backend logout failed:",
        error
      );
    } finally {
      // Always clear frontend session
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("user");

      setUser(null);
    }
  };

  const isAuthenticated =
    Boolean(localStorage.getItem("accessToken"));

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUser,
        isAuthenticated,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};

export default AuthContext;