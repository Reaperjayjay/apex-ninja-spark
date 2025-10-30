import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setItem, getItem, removeItem } from '@/lib/storage';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authState = getItem<boolean>('apex:auth');
    if (authState) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    setItem('apex:auth', true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    removeItem('apex:auth');
    removeItem('apex:selectedNiches');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
