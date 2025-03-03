// // src/components/ui/AuthCard.tsx
// 'use client';

// import { useState } from 'react';
// import { auth } from '@/lib/firebase';
// import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// export default function AuthCard() {
//   const [isVisible, setIsVisible] = useState(true);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleGoogleSignIn = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(auth, provider);
//       setIsVisible(false);
//     } catch (error: any) {
//       setError('Failed to sign in with Google');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       if (isSignUp) {
//         if (password !== confirmPassword) {
//           throw new Error('Passwords do not match');
//         }
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       setIsVisible(false);
//     } catch (error: any) {
//       setError(error.message.includes('auth/') ? 
//         'Invalid email or password' : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
//         <button 
//           onClick={() => setIsVisible(false)}
//           className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//           aria-label="Close"
//         >
//           ✕
//         </button>

//         <div className="p-6">
//           <h2 className="text-2xl font-bold text-center mb-6">
//             {isSignUp ? 'Create Account' : 'Sign In'}
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
//                 required
//               />
//             </div>

//             {isSignUp && (
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//             )}

//             {error && (
//               <p className="text-red-500 text-sm" role="alert">{error}</p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
//             >
//               {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
//             </button>
//           </form>

//           <div className="mt-4">
//             <button
//               onClick={handleGoogleSignIn}
//               disabled={loading}
//               className="w-full border border-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Sign in with Google
//             </button>
//           </div>

//           <p className="mt-4 text-center text-sm text-gray-600">
//             {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
//             <button
//               onClick={() => setIsSignUp(!isSignUp)}
//               className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
//             >
//               {isSignUp ? 'Sign In' : 'Create Account'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }