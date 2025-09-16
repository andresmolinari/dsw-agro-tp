import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (role?: number) => void;
  logout: () => void;
  role: number | null; // 1 = usuario, 2 = admin
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<number | null>(null);

  const login = (userRole?: number) => {
    setIsAuthenticated(true);
    if (userRole) setRole(userRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};
