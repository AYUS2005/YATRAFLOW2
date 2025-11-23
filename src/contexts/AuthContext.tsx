import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  getAuthState,
  saveAuthState,
  clearAuthState,
  getUsers,
  saveUsers,
} from "@/lib/storage";

import { AppUser } from "@/lib/types";

interface AuthState {
  user: AppUser | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // Load saved login on refresh
// Do NOT auto-login on refresh
useEffect(() => {
  // Landing page should always show first
  setAuth({
    user: null,
    isAuthenticated: false,
  });
}, []);


  // ------------------------- LOGIN -------------------------
  const login = async (email: string, password: string): Promise<boolean> => {
  const users = getUsers();
  const found = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (!found) return false;

  // Local Auth Object
  const newAuth: AuthState = {
    user: found,
    isAuthenticated: true,
  };

  // ✔ Storage save
  saveAuthState({
    user: found,
    isAuthenticated: true,
  });

  // ✔ UI update
  setAuth(newAuth);

  return true;
};


  // ------------------------- SIGNUP -------------------------
  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    const users = getUsers();

    const exists = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) return false;

    const newUser: AppUser = {
      id: Math.random().toString(36).substring(2, 10),
      name,
      email,
      password,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    const updated = [...users, newUser];

    saveUsers(updated);

    return true;
  };

  // ------------------------- LOGOUT -------------------------
  const logout = () => {
    clearAuthState();
    setAuth({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
