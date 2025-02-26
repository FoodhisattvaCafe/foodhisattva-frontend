import React, { useState } from "react";
import { MenuItem, menuData } from "./data";
import FoodModal from "./FoodModal";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Starters", "Salads", "Main Course", "Desserts", "Drinks"];

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Starters");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <div id="menu-section" className="w-full min-h-screen bg-white px-20 py-20">
      {/* Category Tabs (More Padding from the Top to Avoid Navbar Overlap) */}
      <div className="flex justify-center space-x-6 mb-8 border-b pb-6 pt-20">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-6 py-4 font-semibold text-lg transition-all ${
              selectedCategory === category
                ? "border-b-4 border-green-500 text-green-500"
                : "text-gray-600 hover:text-green-500"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Section Title */}
      <h2 className="text-5xl font-bold mb-10 px-4">{selectedCategory}</h2>

      {/* Display Filtered Menu Items with Fade-in Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6"
        >
          {menuData
            .filter((item) => item.category === selectedCategory)
            .map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer shadow-md"
                onClick={() => setSelectedItem(item)}
              >
                <div className="pr-6">
                  <h3 className="text-2xl font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-md mt-2">{item.description}</p>
                  <p className="font-bold text-lg mt-3">${item.price.toFixed(2)}</p>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
              </motion.div>
            ))}
        </motion.div>
      </AnimatePresence>

      {/* Show Food Modal when an item is clicked */}
      {selectedItem && <FoodModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default Menu;
