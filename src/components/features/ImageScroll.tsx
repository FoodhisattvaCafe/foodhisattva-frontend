
// src/components/features/ModernVeganHeader.tsx
'use client';

// Image Carousel Component
import Image from 'next/image';
const food1 = require('@/images/food-1.png');
const food2 = require('@/images/food-2.png');
const food3 = require('@/images/food-3.png');
const food4 = require('@/images/food-4.png');
const food5 = require('@/images/food-5.png');
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


  export default ImageScroll;