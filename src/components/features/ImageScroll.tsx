
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Import images

import food1 from '@/images/food-1.png';
import food2 from '@/images/food-2.png';
import food3 from '@/images/food-3.png';
import food4 from '@/images/food-4.png';
import food5 from '@/images/food-5.png';

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


  export default ImageScroll;