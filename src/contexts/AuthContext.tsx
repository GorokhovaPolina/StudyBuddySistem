import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('studyBuddyUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('studyBuddyUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // For demo purposes, we'll simulate a successful login
    // In a real app, you would call your API to authenticate
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo login - in a real app, this would check credentials against a database
    const demoUser = {
      id: 'user-1',
      email,
      fullName: 'Demo User'
    };
    
    setUser(demoUser);
    setIsAuthenticated(true);
    localStorage.setItem('studyBuddyUser', JSON.stringify(demoUser));
  };

  const register = async (email: string, password: string, fullName: string) => {
    // For demo purposes, we'll simulate a successful registration
    // In a real app, you would call your API to create a new user
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo registration - in a real app, this would create a new user in the database
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      fullName
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('studyBuddyUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('studyBuddyUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
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