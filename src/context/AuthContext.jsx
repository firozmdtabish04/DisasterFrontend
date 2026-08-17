import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check JWT expiration
  const isTokenValid = (token) => {
    try {
      if (!token) return false;

      const payload = JSON.parse(atob(token.split(".")[1]));

      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp > currentTime;
    } catch (error) {
      console.error("Invalid JWT:", error);
      return false;
    }
  };

  // Load authentication state
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    // No access token
    if (!storedAccessToken) {
      setLoading(false);
      return;
    }

    // Access token exists but expired
    if (!isTokenValid(storedAccessToken)) {
      console.log("Access token expired. Clearing session.");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      setAccessToken(null);
      setRefreshToken(null);
      setRole(null);
      setUser(null);

      setLoading(false);
      return;
    }

    // Valid authentication
    setAccessToken(storedAccessToken);

    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }

    if (storedRole) {
      setRole(storedRole);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // Login
  const login = (authData) => {
    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      role: newRole,
      user: newUser,
    } = authData;

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    localStorage.setItem("role", newRole);

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    }

    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setRole(newRole);

    window.dispatchEvent(new Event("storage"));
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);
    setUser(null);
  };

  const isAuthenticated =
    Boolean(accessToken) && isTokenValid(accessToken);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        refreshToken,
        role,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};