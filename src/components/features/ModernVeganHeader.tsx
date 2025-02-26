'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Sections
import HeroSection from './HeroSection';
import ImageScroll from './ImageScroll';
import StorySection from './StorySection';
import ContactUs from './ContactUs';
import JoinUs from './JoinUs';
import Footer from './Footer';
import Menu from "./Menu";

// Heroicons
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  CalendarDaysIcon,
  UserIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

// Correct import for AccountDropdown with explicit extension if needed
import AccountDropdown from '../account/AccountDropdown';

const heroBg = require('@/images/hero-bg.png');
const logo = require('@/images/logo.png');

const ModernVeganHeader: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);

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
      <div className="fixed top-0 left-0 w-full h-full z-0">
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
        {/* Navigation Bar */}
        <nav className="px-6 md:px-12 py-4 flex items-center justify-between fixed w-full top-0 bg-black shadow-md z-50">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              {(() => {
                try {
                  return (
                    <Image 
                      src={logo}
                      alt="Foodhisattva Logo"
                      width={36}
                      height={36}
                      className="z-10"
                      style={{ objectFit: 'contain' }}
                    />
                  );
                } catch (error) {
                  return <span className="text-white font-bold text-lg">F</span>;
                }
              })()}
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-white">
                Foodhisattva
              </span>
              <span className="hidden md:inline-block text-sm italic ml-2 text-white/80">
                Modern Vegan Cuisine
              </span>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-6">
            {/* Search Input */}
            <div className="relative flex items-center">
              <div className={`flex items-center transition-all duration-300 ${showSearch ? 'w-48 md:w-64' : 'w-10'}`}>
                <input
                  type="text"
                  placeholder="Search menu items..."
                  className={`
                    w-full h-10 pl-10 pr-4 rounded-full
                    transition-all duration-300
                    border-none focus:ring-1 focus:ring-[#94C973]/30
                    bg-gray-800/90 text-white placeholder-gray-400
                    focus:outline-none
                    ${showSearch ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                  `}
                />
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  aria-label="Toggle search"
                  className="absolute left-3 transition-colors duration-300 text-white/90 hover:text-[#94C973]"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-6">
              <button className="flex items-center text-white hover:text-[#94C973] transition-colors" onClick={() => {
          const menuSection = document.getElementById("menu-section");
          if (menuSection) {
            menuSection.scrollIntoView({ behavior: "smooth" });
          }
        }}>
                <Bars3Icon className="w-5 h-5 mr-1" />
                <span className="hidden md:inline">Menu</span>
              </button>

              <button className="flex items-center text-white hover:text-[#94C973] transition-colors">
                <CalendarDaysIcon className="w-5 h-5 mr-1" />
                <span className="hidden md:inline">Reserve</span>
              </button>

              <AccountDropdown className="text-white hover:text-[#94C973] transition-colors" />

              <button className="flex items-center text-white hover:text-[#94C973] transition-colors">
                <ShoppingCartIcon className="w-5 h-5 mr-1" />
                <span className="hidden md:inline">Cart</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Page Sections */}
        <HeroSection />
        
        <ImageScroll />
        <StorySection />
        <Menu/>
        <ContactUs />
        <JoinUs />
        <Footer />
      </div>
    </div>
  );
};

export default ModernVeganHeader;
