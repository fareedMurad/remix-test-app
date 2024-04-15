import React, { createContext, useState, useContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  signUpData: any;
  setSignUpData: any;
  user?: { name: string; email: string };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUpData, setSignUpData] = useState({});

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeAll();
  };

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
    signUpData,
    setSignUpData,
    user: { name: "Angelo Ciaramello", email: "angelo@example.com" },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
