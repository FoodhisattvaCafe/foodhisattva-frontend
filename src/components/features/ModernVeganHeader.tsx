// src/components/features/ModernVeganHeader.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Clock, MapPin, Phone, Search, User } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamic import with correct relative path
const DynamicInteractiveMap = dynamic(
  () => import('@/components/InteractiveMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-sm aspect-square mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
    ),
  }
);

// Import images using absolute paths
const heroBg = require('@/images/hero-bg.png');
const food1 = require('@/images/food-1.png');
const food2 = require('@/images/food-2.png');
const food3 = require('@/images/food-3.png');
const food4 = require('@/images/food-4.png');
const food5 = require('@/images/food-5.png');
const story1 = require('@/images/story-1.png');
const story2 = require('@/images/story-2.png');
const story3 = require('@/images/story-3.png');
const story4 = require('@/images/story-4.png');

// Image Carousel Component
const ImageScroll: React.FC = () => {
  const foodImages = [food1, food2, food3, food4, food5];

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 my-12">
      <div className="animate-scroll flex">
        {foodImages.concat(foodImages).map((img, index) => (
          <div
            key={`${index}-${index >= foodImages.length ? 'clone-' : ''}${index % foodImages.length}`}
            className="flex-none w-96 h-64 bg-gray-200 dark:bg-gray-700 relative mx-4"
          >
            <Image
              src={img}
              alt={`Food image ${(index % foodImages.length) + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ModernVeganHeader: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const storyImages = [story1, story2, story3, story4];

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
        <div className="pt-32">
          <div className="max-w-3xl mx-auto px-6 py-40 text-center">
            <h1 className="text-5xl md:text-6xl font-serif mb-8 text-white drop-shadow-lg">
              Warm Welcome to Our Kitchen
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-12 text-white/90">
              Experience the comfort of home-style Asian cuisine in our cozy, rustic setting.
              Every dish tells a story of tradition and care.
            </p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button className="px-8 py-4 text-lg text-white border border-white rounded-full hover:bg-white hover:text-black transition-all">
                View Our Menu
              </button>
              <button className="px-8 py-4 text-lg text-black rounded-full hover:opacity-90 transition-opacity bg-[#94C973]">
                Make Reservation
              </button>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <ImageScroll />

        {/* Our Story Section */}
        <div className="bg-white dark:bg-gray-900 py-32">
          <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-serif mb-6 text-black dark:text-white">Our Story</h2>
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                In our warm, rustic kitchen, we celebrate the traditions of Asian cuisine while
                creating a cozy, welcoming atmosphere that feels like home. Every dish is prepared 
                with care, using time-honored recipes and fresh ingredients.
              </p>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                Our space combines natural materials and warm lighting to create an inviting 
                environment where memories are made and stories are shared over delicious meals.
              </p>
              <button className="text-lg hover:opacity-80 transition-opacity text-[#94C973]">
                Read More →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {storyImages.map((img, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`Story image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hours / Location / Contact Section */}
        <div className="bg-white dark:bg-gray-900 py-20 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <Clock className="w-8 h-8 mb-4 mx-auto text-[#94C973]" />
              <h3 className="mb-4 text-2xl font-serif text-black dark:text-white">Hours</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">Tuesday - Sunday</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">11:30 AM - 10:00 PM</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">Closed Mondays</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mb-4 mx-auto text-[#94C973]" />
              <h3 className="mb-4 text-2xl font-serif text-black dark:text-white">Location</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">123 Comfort Lane</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">Warmth City, ST 12345</p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 mb-4 mx-auto text-[#94C973]" />
              <h3 className="mb-4 text-2xl font-serif text-black dark:text-white">Contact</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">(123) 456-7890</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">hello@foodhisattva.com</p>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="bg-black text-white py-32 text-center">
          <h2 className="text-4xl font-serif mb-6">Join Us for a Meal</h2>
          <p className="mb-10 text-xl">
            Experience the warmth of our hospitality and the comfort of our cuisine.
            We look forward to serving you.
          </p>
          <button className="px-10 py-4 bg-white text-black text-lg rounded-full hover:opacity-90 transition-opacity">
            Make a Reservation
          </button>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 py-16">
          <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="mb-4 text-2xl font-serif text-black dark:text-white">Foodhisattva</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                A cozy corner where traditional flavors meet warm hospitality.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-xl font-medium text-black dark:text-white">Quick Links</h4>
              {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  className="block mb-3 text-lg transition-colors text-gray-600 dark:text-gray-300 hover:text-[#94C973]"
                >
                  {item}
                </button>
              ))}
            </div>
            <div>
              <h4 className="mb-4 text-xl font-medium text-black dark:text-white">Connect</h4>
              {['Instagram', 'Facebook', 'Twitter'].map((item) => (
                <button
                  key={item}
                  className="block mb-3 text-lg transition-colors text-gray-600 dark:text-gray-300 hover:text-[#94C973]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="mt-8 flex justify-center">
            <DynamicInteractiveMap />
          </div>

          <div className="mt-12 text-center text-base text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Foodhisattva. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModernVeganHeader;
