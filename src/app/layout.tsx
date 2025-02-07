// src/app/layout.tsx
import '../styles/globals.css'; // Import Tailwind & your global styles
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/Providers';

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
        {/* Wrap your app with the client-only Providers */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
