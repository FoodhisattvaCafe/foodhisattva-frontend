// src/app/layout.tsx
import '@/styles/globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthModal from '@/components/ui/AuthModal';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair' 
});

export const metadata = {
  title: 'Foodhisattva',
  description: 'A cozy corner where traditional flavors meet warm hospitality.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`
        ${inter.variable} 
        ${playfair.variable} 
        scroll-smooth 
        antialiased 
        min-h-screen 
        overflow-x-hidden
      `}
    >
      <body className="
        min-h-screen 
        w-full 
        overflow-x-hidden 
        bg-white 
        text-black 
        selection:bg-accent-primary/30
      ">
        <AuthProvider>
          <AuthModal />
          <main className="min-h-screen w-full">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
