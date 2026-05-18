import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AUTH_KEY = "demo_admin_session";
export const DEMO_CREDENTIALS = { username: "admin", password: "admin" };

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem(AUTH_KEY) === "1");
    setIsLoading(false);
  }, []);

  const login = useCallback((username: string, password: string) => {
    const ok =
      username.trim() === DEMO_CREDENTIALS.username &&
      password === DEMO_CREDENTIALS.password;
    if (ok) {
      localStorage.setItem(AUTH_KEY, "1");
      setIsAuthenticated(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
