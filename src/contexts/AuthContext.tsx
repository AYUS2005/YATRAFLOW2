import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/lib/types';
import { getAuthState, setAuthState, clearAuth } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'admin' | 'user') => Promise<boolean>;
  logout: () => void;
  signup: (email: string, password: string, name: string, role: 'admin' | 'user') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthStateLocal] = useState<AuthState>(() => getAuthState());

  useEffect(() => {
    const state = getAuthState();
    setAuthStateLocal(state);
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'user'): Promise<boolean> => {
    // Simulate authentication
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: email.split('@')[0],
    };

    const newState: AuthState = {
      user,
      isAuthenticated: true,
    };

    setAuthState(newState);
    setAuthStateLocal(newState);
    return true;
  };

  const signup = async (email: string, password: string, name: string, role: 'admin' | 'user'): Promise<boolean> => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name,
    };

    const newState: AuthState = {
      user,
      isAuthenticated: true,
    };

    setAuthState(newState);
    setAuthStateLocal(newState);
    return true;
  };

  const logout = () => {
    clearAuth();
    setAuthStateLocal({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
