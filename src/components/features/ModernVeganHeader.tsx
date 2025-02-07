'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Clock, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

// Import images
import heroBg from '@/images/hero-bg.png';
import food1 from '@/images/food-1.png';
import food2 from '@/images/food-2.png';
import food3 from '@/images/food-3.png';
import food4 from '@/images/food-4.png';
import food5 from '@/images/food-5.png';
import story1 from '@/images/story-1.png';
import story2 from '@/images/story-2.png';
import story3 from '@/images/story-3.png';
import story4 from '@/images/story-4.png';

// Image Carousel Component
const ImageScroll = () => {
  const foodImages = [food1, food2, food3, food4, food5];
  
  return (
    <div className="relative overflow-hidden bg-white my-12">
      <div className="animate-scroll flex">
        {foodImages.map((img, index) => (
          <div
            key={`first-${index}`}
            className="flex-none w-96 h-64 bg-gray-200 relative mx-4"
          >
            <Image
              src={img}
              alt={`Food image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
        {foodImages.map((img, index) => (
          <div
            key={`second-${index}`}
            className="flex-none w-96 h-64 bg-gray-200 relative mx-4"
          >
            <Image
              src={img}
              alt={`Food image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ModernVeganHeader = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
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
            scrollPosition > 100 ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center space-x-2">
            <span
              className={`text-2xl font-serif transition-colors duration-300 ${
                scrollPosition > 100 ? 'text-black' : 'text-white'
              }`}
            >
              Foodhisattva
            </span>
            <Leaf className="w-4 h-4 text-[#94C973]" />
          </div>
          <div className="flex items-center space-x-8">
            {['Menu', 'About', 'Gallery', 'Visit'].map((item) => (
              <button
                key={item}
                className={`text-base transition-colors duration-300 hover:text-[#94C973] ${
                  scrollPosition > 100 ? 'text-black' : 'text-white'
                }`}
              >
                {item}
              </button>
            ))}
            <button className="px-6 py-2 text-base text-black rounded-full hover:opacity-90 transition-opacity bg-[#94C973]">
              Reserve
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
        <div className="bg-white py-32">
          <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-serif text-black mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 text-lg">
                In our warm, rustic kitchen, we celebrate the traditions of Asian cuisine while
                creating a cozy, welcoming atmosphere that feels like home. Every dish is prepared with care, using time-honored recipes and fresh ingredients.
              </p>
              <p className="text-gray-600 mb-8 text-lg">
                Our space combines natural materials and warm lighting to create an inviting environment where memories are made and stories are shared over delicious meals.
              </p>
              <button className="text-[#94C973] text-lg hover:opacity-80 transition-opacity">
                Read More →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {storyImages.map((img, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden">
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
        <div className="bg-white py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <Clock className="w-8 h-8 mb-4 mx-auto text-[#94C973]" />
              <h3 className="text-2xl font-serif text-black mb-4">Hours</h3>
              <p className="text-gray-600 text-lg">Tuesday - Sunday</p>
              <p className="text-gray-600 text-lg">11:30 AM - 10:00 PM</p>
              <p className="text-gray-600 text-lg">Closed Mondays</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mb-4 mx-auto text-[#94C973]" />
              <h3 className="text-2xl font-serif text-black mb-4">Location</h3>
              <p className="text-gray-600 text-lg">123 Comfort Lane</p>
              <p className="text-gray-600 text-lg">Warmth City, ST 12345</p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 mb-4 mx-auto text-[#94C973]" />
              <h3 className="text-2xl font-serif text-black mb-4">Contact</h3>
              <p className="text-gray-600 text-lg">(123) 456-7890</p>
              <p className="text-gray-600 text-lg">hello@foodhisattva.com</p>
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
        <footer className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-serif text-2xl text-black mb-4">Foodhisattva</h3>
              <p className="text-gray-600 text-lg">
                A cozy corner where traditional flavors meet warm hospitality.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-black text-xl mb-4">Quick Links</h4>
              {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                <button key={item} className="block text-gray-600 hover:text-[#94C973] mb-3 transition-colors text-lg">
                  {item}
                </button>
              ))}
            </div>
            <div>
              <h4 className="font-medium text-black text-xl mb-4">Connect</h4>
              {['Instagram', 'Facebook', 'Twitter'].map((item) => (
                <button key={item} className="block text-gray-600 hover:text-[#94C973] mb-3 transition-colors text-lg">
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center text-gray-600 text-base mt-12">
            © {new Date().getFullYear()} Foodhisattva. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModernVeganHeader;
