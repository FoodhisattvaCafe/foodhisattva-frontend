'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

/**
 * SignOutButton Component
 * 
 * This component renders a button that allows a logged-in user to sign out.
 * When clicked, it signs the user out using Firebase authentication and redirects them to the login page.
 *
 * @component
 * @example
 * return <SignOutButton />
 */
export default function SignOutButton() {
  const router = useRouter();

  /**
   * Handles the user sign-out process.
   * It calls Firebase's signOut method and redirects to the login page on success.
   * Logs an error to the console if sign-out fails.
   *
   * @async
   * @function handleSignOut
   * @returns {Promise<void>}
   */
  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.push('/login' as any); // Cast to any to bypass type checking issues
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Sign Out
    </button>
  );
}

