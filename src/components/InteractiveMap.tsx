// src/components/ui/InteractiveMap.tsx
// src/components/ui/InteractiveMap.tsx
'use client';

import React from 'react';

const InteractiveMap: React.FC = () => {
  const restaurantAddress = "2158 S Taylor Rd, Cleveland Heights, OH 44118";
  const encodedAddress = encodeURIComponent(restaurantAddress);
  
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.1913115921157!2d-81.55193568460986!3d41.4734567792557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830f95cf2b8a7fd%3A0xe1d74e0f7f5c7d12!2s2158%20S%20Taylor%20Rd%2C%20Cleveland%20Heights%2C%20OH%2044118!5e0!3m2!1sen!2sus!4v1693030842527!5m2!1sen!2sus";
  
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  const handleMapClick = () => {
    window.open(directionsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div 
        onClick={handleMapClick}
        className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
        role="button"
        aria-label="Click to get directions to Foodhisattva"
      >
        <iframe
          className="absolute inset-0 w-full h-full rounded-lg"
          src={embedUrl}
          title="Foodhisattva location on Google Maps"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default InteractiveMap;
