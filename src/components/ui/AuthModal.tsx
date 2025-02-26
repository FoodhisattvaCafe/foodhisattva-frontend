'use client';

import React, { useState, useCallback } from 'react';
import {
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Lock,
  Mail,
  X,
} from 'lucide-react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface Touched {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

interface PasswordStrength {
  strength: number;
  color: string;
  label: string;
}

const AuthModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState<Touched>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const isValidEmail = useCallback((val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), []);
  const isValidPassword = useCallback((val: string) => val.length >= 8, []);

  const passwordStrength = useCallback((val: string): PasswordStrength => {
    const strengthCount = [
      val.length >= 8,
      /[A-Z]/.test(val),
      /[0-9]/.test(val),
      /[^A-Za-z0-9]/.test(val),
    ].filter(Boolean).length;

    return {
      strength: strengthCount,
      color: strengthCount === 4 ? 'bg-emerald-500' : strengthCount >= 2 ? 'bg-amber-400' : 'bg-red-400',
      label: strengthCount === 4 ? 'Strong' : strengthCount >= 2 ? 'Medium' : 'Weak',
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(email) || !isValidPassword(password)) return;
    if (isSignUp && password !== confirmPassword) return;

    setIsLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setIsVisible(false);
    } catch (error) {
      const err = error as { message?: string };
      alert(err.message || 'Authentication error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
    try {
      setIsLoading(true);
      const authProvider = provider === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
      await signInWithPopup(auth, authProvider);
      setIsVisible(false);
    } catch (error) {
      const err = error as { code?: string; message?: string };
      if (err.code !== 'auth/popup-closed-by-user') {
        alert(err.message || `Error with ${provider} sign-in`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={() => setIsVisible(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-4 z-50 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Panel */}
        <div className="w-full md:w-1/2 bg-gray-900 text-white p-6 md:p-14 flex flex-col justify-between order-2 md:order-1">
          <div>
            <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 bg-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
              <span className="text-2xl md:text-3xl">🍜</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
              Discover Our Authentic Flavors
            </h2>
            <p className="text-sm md:text-base text-gray-300/90 leading-relaxed">
              Join Foodhisattva to experience traditional flavors with modern dining convenience.
            </p>
          </div>

          <div className="space-y-2 md:space-y-4 mt-4 md:mt-10">
            {['Authentic Vegan Cuisine', 'Easy Table Reservations', 'Member Exclusives'].map((item, i) => (
              <div key={i} className="flex items-center space-x-2 md:space-x-3 text-white/90 hover:text-white transition-colors">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-300 flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-14 flex flex-col justify-center order-1 md:order-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-8">
            {isSignUp ? 'Sign up to begin your personalized dining experience.' : 'Sign in to continue your dining experience.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  className="w-full pl-8 md:pl-10 pr-4 py-2 md:py-3 rounded-lg border border-gray-200 text-sm md:text-base focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                />
              </div>
              {touched.email && !isValidEmail(email) && (
                <div className="flex items-center gap-1 md:gap-2 text-red-500 text-xs md:text-sm mt-1">
                  <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Please enter a valid email address</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  className="w-full pl-8 md:pl-10 pr-10 py-2 md:py-3 rounded-lg border border-gray-200 text-sm md:text-base focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${passwordStrength(password).color}`}
                      style={{ width: `${(passwordStrength(password).strength / 4) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${passwordStrength(password).color.replace('bg', 'text')}`}>
                    {passwordStrength(password).label}
                  </span>
                </div>
              )}
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-xs md:text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
                    className="w-full pl-8 md:pl-10 pr-4 py-2 md:py-3 rounded-lg border border-gray-200 text-sm md:text-base focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !isValidEmail(email) || !isValidPassword(password)}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden ${
                isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-emerald-500 text-white shadow-lg hover:bg-emerald-600'
              }`}
            >
              <span className={`relative z-10 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                Continue <span className="ml-2 inline-block">→</span>
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>

            <div className="relative my-4 md:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-gray-500 text-xs md:text-sm font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => handleSocialSignIn('google')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 p-2 md:p-3 rounded-lg border border-gray-200 hover:bg-red-50 text-red-500 transition-colors disabled:opacity-50"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                </svg>
                <span className="text-xs md:text-sm font-medium">Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignIn('facebook')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 p-2 md:p-3 rounded-lg border border-gray-200 hover:bg-blue-50 text-blue-600 transition-colors disabled:opacity-50"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-xs md:text-sm font-medium">Facebook</span>
              </button>
            </div>

            <p className="mt-4 md:mt-8 text-center text-xs md:text-sm text-gray-500">
              {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Create account'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
