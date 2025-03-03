
'use client';
import Image from 'next/image';

const story1 = require('@/images/story-1.png');
const story2 = require('@/images/story-2.png');
const story3 = require('@/images/story-3.png');
const story4 = require('@/images/story-4.png');

const storyImages = [story1, story2, story3, story4];

const StorySection: React.FC = () => {
    return (
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

        );
    };

    export default StorySection;