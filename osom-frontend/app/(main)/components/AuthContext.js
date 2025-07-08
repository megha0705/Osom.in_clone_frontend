// app/components/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Persist user using localStorage
  useEffect(() => {
    const stored = localStorage.getItem("dummy-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("dummy-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("dummy-user");
    }
  }, [user]);

  const login = (username) => {
    setUser({ name: username });
  };

  const signup = (username) => {
    setUser({ name: username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
