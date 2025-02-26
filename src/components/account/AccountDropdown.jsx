'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User, LogOut, ShoppingBag, Heart, MapPin, CreditCard, Gift, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '../ui/AuthModal'; // Import your existing AuthModal

const AccountDropdown = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dropdownRef = useRef(null);
  const { user, signOutUser } = useAuth();
  
  // Compute isAuthenticated from user
  const isAuthenticated = !!user;

  const toggleDropdown = () => {
    if (!isAuthenticated) {
      // If not authenticated, show the auth modal instead of dropdown
      setShowAuthModal(true);
    } else {
      // If authenticated, show the dropdown
      setIsOpen(!isOpen);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOutUser();
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        onClick={toggleDropdown}
        type="button"
      >
        <User size={22} className="text-gray-700" />
        {isAuthenticated && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {/* Show AuthModal if not authenticated and modal is triggered */}
      {showAuthModal && !isAuthenticated && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Dropdown menu for authenticated users */}
      {isOpen && isAuthenticated && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50 overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <User size={24} className="text-green-600" />
              </div>
              <div>
                <div className="font-medium">{user?.displayName || user?.email}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
            </div>
          </div>

          <div className="py-2">
            <Link href="/account/orders" className="flex items-center w-full px-4 py-2 hover:bg-gray-50">
              <ShoppingBag size={20} className="mr-3 text-gray-500" />
              <div>
                <div className="font-medium text-left">My Orders</div>
                <div className="text-xs text-gray-500">View order history</div>
              </div>
            </Link>

            <Link href="/account/favorites" className="flex items-center w-full px-4 py-2 hover:bg-gray-50">
              <Heart size={20} className="mr-3 text-gray-500" />
              <div>
                <div className="font-medium text-left">Favorites</div>
                <div className="text-xs text-gray-500">Your saved items</div>
              </div>
            </Link>

            <Link href="/account/addresses" className="flex items-center w-full px-4 py-2 hover:bg-gray-50">
              <MapPin size={20} className="mr-3 text-gray-500" />
              <div>
                <div className="font-medium text-left">Addresses</div>
                <div className="text-xs text-gray-500">Manage delivery addresses</div>
              </div>
            </Link>

            <Link href="/account/payment" className="flex items-center w-full px-4 py-2 hover:bg-gray-50">
              <CreditCard size={20} className="mr-3 text-gray-500" />
              <div>
                <div className="font-medium text-left">Payment Methods</div>
                <div className="text-xs text-gray-500">Saved cards and wallets</div>
              </div>
            </Link>

            <Link href="/account/rewards" className="flex items-center w-full px-4 py-2 hover:bg-gray-50">
              <Gift size={20} className="mr-3 text-gray-500" />
              <div>
                <div className="font-medium text-left">Loyalty Rewards</div>
                <div className="text-xs text-gray-500">Check your points</div>
              </div>
            </Link>

            <Link href="/account/settings" className="flex items-center w-full px-4 py-2 hover:bg-gray-50">
              <Settings size={20} className="mr-3 text-gray-500" />
              <div>
                <div className="font-medium text-left">Account Settings</div>
                <div className="text-xs text-gray-500">Manage preferences</div>
              </div>
            </Link>
          </div>

          <div className="border-t p-3">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full p-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50"
              type="button"
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;