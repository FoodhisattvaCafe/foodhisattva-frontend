
import React, { useState, useEffect } from 'react';

const Footer = () => {
  
    
    return (
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

    );
  };


  export default Footer;