// src/app/layout.tsx
import '@/styles/globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthModal from '@/components/ui/AuthModal';  // Change this import

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

export const metadata = {
  title: 'Foodhisattva',
  description: 'A cozy corner where traditional flavors meet warm hospitality.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${playfair.className}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <AuthModal />  {/* Replace AuthCard with AuthModal */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}