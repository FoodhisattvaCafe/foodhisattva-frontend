
import React, { useState, useEffect } from 'react';
import { Clock, Phone, MapPin } from 'lucide-react';

// Image Carousel Component
const Contact = () => {
  
    
    return (
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
    );
  };


  export default Contact;