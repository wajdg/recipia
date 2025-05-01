import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserCredentials, SignupCredentials, AuthContextType } from '../types';
import MOCK_USERS from '../data/mockUsers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (credentials: UserCredentials): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user with matching email
      const foundUser = MOCK_USERS.find(u => u.email === credentials.email);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, you would verify the password here
      // For this mock, we'll just assume it's correct
      
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const existingUser = MOCK_USERS.find(u => u.email === credentials.email);
      
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      // Create a new user
      const newUser: User = {
        id: `${Date.now()}`, // Generate a simple unique ID
        email: credentials.email,
        username: credentials.username,
        createdAt: new Date(),
      };
      
      // In a real app, you would save this user to a database
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!user) {
        throw new Error('No user logged in');
      }
      
      const updatedUser = { ...user, ...userData };
      
      // In a real app, you would update the user in the database
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check for existing user in localStorage on initial load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    
    // Simulate checking auth state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};