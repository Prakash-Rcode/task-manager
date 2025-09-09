import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("tm_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("tm_token"));

  useEffect(() => {
    if (user) localStorage.setItem("tm_user", JSON.stringify(user));
    else localStorage.removeItem("tm_user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("tm_token", token);
    else localStorage.removeItem("tm_token");
  }, [token]);

  const login = (payload) => {
    setUser({ _id: payload._id, name: payload.name, email: payload.email });
    setToken(payload.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
