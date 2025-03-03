'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

// Provide some default values
const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOutUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sign Up with email & password
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // user state will update automatically via onAuthStateChanged
    } catch (err) {
      console.error('Error in signUp:', err);
      throw err; // or handle however you prefer
    } finally {
      setLoading(false);
    }
  };

  // Sign In with email & password
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // user state will update automatically via onAuthStateChanged
    } catch (err) {
      console.error('Error in signIn:', err);
      throw err; // or handle however you prefer
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // user state will become null via onAuthStateChanged
    } catch (err) {
      console.error('Error in signOut:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to access the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
