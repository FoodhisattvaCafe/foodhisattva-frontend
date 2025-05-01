'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  LogOut,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Gift,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '../ui/AuthModal';

/**
 * @component AccountDropdown
 * @description
 * Dropdown menu in the navbar that displays user-specific options
 * such as orders, favorites, addresses, and sign-out functionality.
 *
 * If the user is not authenticated, it shows an authentication modal instead.
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Optional CSS class for layout/styling
 * @returns {JSX.Element} Rendered Account dropdown or Auth modal
 */
const AccountDropdown = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { user, signOutUser } = useAuth();

  /** Whether the user is authenticated */
  const isAuthenticated = !!user;

  /**
   * Handles toggle for dropdown or shows modal if user is unauthenticated.
   */
  const toggleDropdown = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  /**
   * Effect: Closes dropdown if a user clicks outside of the dropdown area.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Signs out the currently authenticated user.
   */
  const handleLogout = () => {
    signOutUser();
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Account icon button */}
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        onClick={toggleDropdown}
        type="button"
      >
        <User size={22} className="text-gray-700" />
        {isAuthenticated && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
        )}
      </button>

      {/* Modal for unauthenticated users */}
      {showAuthModal && !isAuthenticated && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Dropdown menu for authenticated users */}
      {isOpen && isAuthenticated && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50 overflow-hidden">
          {/* Header with user info */}
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <User size={24} className="text-green-600" />
              </div>
              <div>
                <div className="font-medium">
                  {user?.displayName || user?.email}
                </div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div className="py-2">
            <DropdownLink href="/account/orders" icon={<ShoppingBag size={20} />} title="My Orders" subtitle="View order history" />
            <DropdownLink href="/account/favorites" icon={<Heart size={20} />} title="Favorites" subtitle="Your saved items" />
            <DropdownLink href="/account/addresses" icon={<MapPin size={20} />} title="Addresses" subtitle="Manage delivery addresses" />
            <DropdownLink href="/account/payment" icon={<CreditCard size={20} />} title="Payment Methods" subtitle="Saved cards and wallets" />
            <DropdownLink href="/account/rewards" icon={<Gift size={20} />} title="Loyalty Rewards" subtitle="Check your points" />
            <DropdownLink href="/account/settings" icon={<Settings size={20} />} title="Account Settings" subtitle="Manage preferences" />
          </div>

          {/* Logout button */}
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

/**
 * @component DropdownLink
 * @description
 * Internal reusable component to format dropdown navigation items with icon, title, and subtitle.
 *
 * @param {string} href - Navigation target
 * @param {React.ReactNode} icon - Icon to display on the left
 * @param {string} title - Main label
 * @param {string} subtitle - Description below the label
 */
const DropdownLink = ({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <Link
    href={href}
    className="flex items-center w-full px-4 py-2 hover:bg-gray-50"
  >
    <div className="mr-3 text-gray-500">{icon}</div>
    <div>
      <div className="font-medium text-left">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  </Link>
);

     
           

            

