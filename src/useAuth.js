import React, { createContext, useContext, useState, useEffect } from "react";

// Mocked authentication service
const authService = {
  getAuthStatus: () => !!localStorage.getItem("authToken"),
  getToken: () => localStorage.getItem("authToken"),
  login: (token) => localStorage.setItem("authToken", token),
  logout: () => localStorage.removeItem("authToken"),
};

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const status = authService.getAuthStatus();
    const storedToken = authService.getToken();
    setIsAuthenticated(status);
    setToken(storedToken);
  }, []);

  const login = (token) => {
    authService.login(token);
    setIsAuthenticated(true);
    setToken(token);
  };

  const logout = () => {
    authService.logout();
    console.log('Logout Success');
    console.log(authService.getToken());
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};