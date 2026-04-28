import { useState } from "react";
import { AuthContext } from "./useAuth";
import { MOCK_USERS } from "../constants/mockUsers";

const STORAGE_KEY = "user";

const readStored = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const stripPassword = (user) => {
  const copy = { ...user };
  delete copy.password;
  return copy;
};

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(readStored);
  const [users, setUsers] = useState(MOCK_USERS);

  const persist = (next) => {
    if (next) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else sessionStorage.removeItem(STORAGE_KEY);
    setUserState(next);
  };

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return { ok: false, error: "Credenciales incorrectas" };
    persist(stripPassword(found));
    return { ok: true };
  };

  const register = ({ name, lastname, email, password }) => {
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "El email ya está registrado" };
    }
    const newUser = {
      id: Date.now(),
      name,
      lastname,
      email,
      password,
      role: "user",
    };
    setUsers((prev) => [...prev, newUser]);
    persist(stripPassword(newUser));
    return { ok: true };
  };

  const logout = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
