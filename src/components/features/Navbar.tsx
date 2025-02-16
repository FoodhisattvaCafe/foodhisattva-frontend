
import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

const Navbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    
    return (
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

    );
  };


  export default Navbar;