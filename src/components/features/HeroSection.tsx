
import React, { useState, useEffect } from 'react';


const HeroSection = () => {
  
    
    return (
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
    );
  };


  export default HeroSection;