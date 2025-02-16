'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Clock, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import ImageScroll from './ImageScroll';
import HeroSection from './HeroSection';

// Import images
import heroBg from '@/images/hero-bg.png';
import StorySection from './StorySection';
import Contact from './Contact';
import JoinUs from './JoinUs';
import Footer from './Footer';
import Navbar from './navbar';

const ModernVeganHeader = () => {
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
        <Navbar/>

        {/* Hero Section */}
        <HeroSection/>

        {/* Image Carousel */}
        <ImageScroll />

        {/* Our Story Section */}
       <StorySection/>

        {/* Hours / Location / Contact Section */}
        <Contact/>

        {/* Join Us Section */}
       <JoinUs/>

        {/* Footer */}
        <Footer/>
      </div>
    </div>
  );
};

export default ModernVeganHeader;
