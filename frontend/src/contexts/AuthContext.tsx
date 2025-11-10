import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'umkm' | 'driver' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isOnboarded: boolean;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    // Special check for admin credentials
    if (email === 'admin@gmail.com' && password === '123456') {
      const adminUser: User = {
        id: 'admin-001',
        name: 'Admin Asli Bogor',
        email: 'admin@gmail.com',
        role: 'admin',
        isOnboarded: true,
        isVerified: true
      };
      setUser(adminUser);
      return;
    }
    
    // For demo, we'll create a mock user based on email
    const role = email.includes('admin') ? 'admin' 
                : email.includes('umkm') ? 'umkm'
                : email.includes('driver') ? 'driver'
                : 'user';
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
      isOnboarded: role === 'user' || role === 'admin', // User and Admin don't need onboarding
      isVerified: role === 'admin' || role === 'user'
    };
    
    setUser(mockUser);
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // Mock registration - in real app, this would call an API
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      isOnboarded: role === 'user' || role === 'admin',
      isVerified: role === 'admin' || role === 'user'
    };
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const completeOnboarding = () => {
    if (user) {
      setUser({ ...user, isOnboarded: true });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
