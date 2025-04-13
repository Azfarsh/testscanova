import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { 
  onAuthStateChange, 
  logInWithEmailAndPassword, 
  registerWithEmailAndPassword, 
  loginWithGoogle, 
  logoutUser 
} from '../lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuthState: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  checkAuthState: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication state on initial load
  useEffect(() => {
    checkAuthState();
  }, []);

  // Listen for auth state changes
  const checkAuthState = () => {
    setLoading(true);
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await logInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } finally {
      setLoading(false);
    }
  };

  // Register with email and password
  const register = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      const user = await registerWithEmailAndPassword(email, password, displayName);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const userCredential = await loginWithGoogle();
      setUser(userCredential.user);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle: signInWithGoogle,
    logout,
    checkAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
