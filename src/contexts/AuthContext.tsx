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

/**
 * @interface AuthContextProps
 * @description
 * Defines the structure for the authentication context, including user state,
 * loading status, and auth-related actions like signIn, signUp, and signOut.
 */
interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

/**
 * @constant AuthContext
 * @description
 * React Context to share authentication state and methods across the application.
 */
const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOutUser: async () => {},
});

/**
 * @component AuthProvider
 * @description
 * Provider component to wrap the application with authentication logic.
 *
 * @param {ReactNode} children - React children to be wrapped.
 * @returns JSX.Element with authentication context provider.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Monitor authentication state using Firebase's `onAuthStateChanged`.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  /**
   * Sign up a new user using email and password.
   *
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   */
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Error in signUp:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign in an existing user using email and password.
   *
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   */
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Error in signIn:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign out the currently logged-in user.
   */
  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
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

/**
 * @function useAuth
 * @description
 * React hook to access the authentication context.
 *
 * @returns {AuthContextProps} Authentication context object.
 */
export function useAuth() {
  return useContext(AuthContext);
}

 
  
