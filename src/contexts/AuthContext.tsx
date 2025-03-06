
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'accountant' | 'client';
  avatarInitials: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@cmr.com',
    password: 'password',
    name: 'Admin User',
    role: 'admin' as const,
    avatarInitials: 'AU',
  },
  {
    id: '2',
    email: 'accountant@cmr.com',
    password: 'password',
    name: 'John Smith',
    role: 'accountant' as const,
    avatarInitials: 'JS',
  },
  {
    id: '3',
    email: 'client@cmr.com',
    password: 'password',
    name: 'Sarah Johnson',
    role: 'client' as const,
    avatarInitials: 'SJ',
  },
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage (persisted login)
    const storedUser = localStorage.getItem('cmr_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('cmr_user', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${foundUser.name}`);
      navigate('/');
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid credentials");
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cmr_user');
    toast.info("You have been logged out");
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
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
