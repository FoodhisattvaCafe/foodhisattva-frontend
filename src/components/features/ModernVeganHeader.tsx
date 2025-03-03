'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Import MainHead from separate file
import MainHead from './MainHead';

// Sections
import HeroSection from './HeroSection';
import ImageScroll from './ImageScroll';
import StorySection from './StorySection';
import ContactUs from './ContactUs';
import JoinUs from './JoinUs';
import Footer from './Footer';

const heroBg = require('@/images/hero-bg.png');

const ModernVeganHeader: React.FC = () => {
  const pathname = usePathname();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showMenu, setShowMenu] = useState(false);

  // Check if current route is menu-related
  const isMenuPage = pathname === '/menu';

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Image */}
      <div className={`fixed top-0 left-0 w-full h-full z-0 ${isMenuPage ? 'opacity-70' : 'opacity-100'}`}>
        {(() => {
          try {
            return (
              <Image
                src={heroBg}
                alt="Background"
                fill
                className="object-cover"
                priority
                quality={100}
              />
            );
          } catch (error) {
            console.error('Failed to load background image', error);
            return <div className="w-full h-full bg-gray-900"></div>;
          }
        })()}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20">
        {/* Header Navigation - imported from separate file */}
        <MainHead />

        {/* Page Content */}
        {/* Only render these sections if we're not on the menu page */}
        {!isMenuPage && (
          <>
            <HeroSection />
            <ImageScroll />
            <StorySection />
            <ContactUs />
            <JoinUs />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default ModernVeganHeader;