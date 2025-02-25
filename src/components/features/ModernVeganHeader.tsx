// src/components/features/ModernVeganHeader.tsx
'use client';
import ImageScroll from './ImageScroll';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import HeroSection from './HeroSection';
import StorySection from './StorySection';
import ContactUs from './ContactUs';
import JoinUs from './JoinUs';
import Footer from './Footer';
import { Leaf,  Search, User } from 'lucide-react';

// Import images using absolute paths
const heroBg = require('@/images/hero-bg.png');

const ModernVeganHeader: React.FC = () => {
  
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  
  useEffect(() => {
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  return (
    <div className="relative min-h-screen">
      {/* Fixed Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Image
          src={heroBg}
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Overlay */}
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-black/40" />

      {/* Content */}
      <div className="relative z-20">
        {/* Navigation */}
        <nav
          className={`px-12 py-6 flex items-center justify-between fixed w-full top-0 transition-colors duration-300 ${
            scrollPosition > 100
              ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span
              className={`text-2xl font-serif transition-colors duration-300 ${
                scrollPosition > 100 ? 'text-black dark:text-white' : 'text-white'
              }`}
            >
              Foodhisattva
            </span>
            <Leaf className="w-4 h-4 text-[#94C973]" />
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            {/* Search Section */}
            <div className="relative flex items-center">
              <div
                className={`flex items-center transition-all duration-300 ${
                  showSearch ? 'w-64' : 'w-10'
                }`}
              >
                <input
                  type="text"
                  placeholder="Search menu items..."
                  className={`
                    w-full h-10 pl-10 pr-4 rounded-full 
                    transition-all duration-300 
                    border-2 focus:ring-2 focus:ring-[#94C973]/20
                    bg-white dark:bg-gray-800  /* <-- changed to solid backgrounds */
                    border-gray-200 dark:border-gray-600
                    text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    focus:outline-none focus:border-[#94C973]
                    ${showSearch ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  `}
                />
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  aria-label="Toggle search"
                  className={`absolute left-3 transition-colors duration-300 ${
                    scrollPosition > 100 
                      ? 'text-gray-500 hover:text-gray-700' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Menu */}
            <button
              className={`text-base transition-colors duration-300 hover:text-[#94C973] ${
                scrollPosition > 100 ? 'text-black dark:text-white' : 'text-white'
              }`}
            >
              Menu
            </button>
            {/* Reserve */}
            <button className="px-6 py-2 text-base text-black rounded-full hover:opacity-90 transition-opacity bg-[#94C973]">
              Reserve
            </button>
            {/* Account Icon */}
            <button
              className={`transition-colors duration-300 hover:text-[#94C973] ${
                scrollPosition > 100 ? 'text-black dark:text-white' : 'text-white'
              }`}
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <HeroSection/>

        {/* Image Carousel */}
        <ImageScroll />

        {/* Our Story Section */}
       <StorySection/>

        {/* Hours / Location / Contact Section */}
        <ContactUs/>

        {/* Join Us Section */}
        <JoinUs/>

        {/* Footer */}
        <Footer/>
      </div>
    </div>
  );
};

export default ModernVeganHeader;
