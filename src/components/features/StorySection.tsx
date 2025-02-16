

import React, { useState, useEffect } from 'react';
import story1 from '@/images/story-1.png';
import story2 from '@/images/story-2.png';
import story3 from '@/images/story-3.png';
import story4 from '@/images/story-4.png';
import Image from 'next/image';
// Image Carousel Component
const StorySection = () => {
    const storyImages = [story1, story2, story3, story4];
    
    return (
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
    );
  };


  export default StorySection;
  
