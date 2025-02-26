import React, { useState } from "react";
import { MenuItem } from "./data";

interface FoodModalProps {
  item: MenuItem;
  onClose: () => void;
}

const FoodModal: React.FC<FoodModalProps> = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState("Medium");
  const [extras, setExtras] = useState<string[]>([]);

  const toggleExtra = (extra: string) => {
    setExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const addToCart = () => {
    alert(`Added ${quantity}x ${item.name} with ${spiceLevel} spice and extras: ${extras.join(", ")}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative shadow-lg">
        <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-2xl font-bold mt-2">{item.name}</h2>
        <p className="text-gray-500">{item.description}</p>
        <p className="font-bold mt-1">${item.price.toFixed(2)}</p>

        {/* Spice Level Selection */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Spice Level</h3>
          <select
            className="w-full border rounded p-2 mt-1"
            value={spiceLevel}
            onChange={(e) => setSpiceLevel(e.target.value)}
          >
            <option>Mild</option>
            <option>Medium</option>
            <option>Spicy</option>
          </select>
        </div>

        {/* Extra Options (Only Show If Available) */}
        {item.extras && item.extras.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Extras</h3>
            {item.extras.map((extra) => (
              <label key={extra} className="flex items-center space-x-2 mt-1">
                <input
                  type="checkbox"
                  checked={extras.includes(extra)}
                  onChange={() => toggleExtra(extra)}
                />
                <span>{extra}</span>
              </label>
            ))}
          </div>
        )}

        {/* Quantity & Buttons */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
            <button className="border p-2" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button className="border p-2" onClick={() => setQuantity((q) => q + 1)}>
              +
            </button>
          </div>
          <button className="bg-black text-white py-2 px-4 rounded-lg" onClick={addToCart}>
            Add to Cart
          </button>
        </div>

        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 text-xl" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default FoodModal;
