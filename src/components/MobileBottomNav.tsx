'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const { openCart, totalItemsCount, wishlistIds } = useCart();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-outline-variant/30">
      <div className="flex justify-around items-center h-16 px-space-xs">
        {/* Home Tab */}
        <a
          href="#"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-14 transition-colors ${
            activeTab === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">home</span>
          <span className="font-label-badge text-label-badge mt-0.5">Home</span>
        </a>

        {/* Categories Tab */}
        <a
          href="#categories"
          onClick={() => setActiveTab('categories')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-14 transition-colors ${
            activeTab === 'categories' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">grid_view</span>
          <span className="font-label-badge text-label-badge mt-0.5">Categories</span>
        </a>

        {/* Wishlist Tab */}
        <a
          href="#wishlist"
          onClick={() => setActiveTab('wishlist')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-14 transition-colors relative ${
            activeTab === 'wishlist' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">favorite</span>
          <span className="absolute top-1.5 right-3 bg-tertiary text-on-tertiary font-label-badge text-label-badge rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center leading-none">
            {wishlistIds.length}
          </span>
          <span className="font-label-badge text-label-badge mt-0.5">Wishlist</span>
        </a>

        {/* Cart Tab */}
        <button
          onClick={() => {
            setActiveTab('cart');
            openCart();
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] h-14 transition-colors relative cursor-pointer ${
            activeTab === 'cart' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
          <span className="absolute top-1.5 right-3 bg-primary text-on-primary font-label-badge text-label-badge rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center leading-none">
            {totalItemsCount}
          </span>
          <span className="font-label-badge text-label-badge mt-0.5">Cart</span>
        </button>

        {/* Account Tab */}
        <a
          href="/auth"
          onClick={() => setActiveTab('account')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-14 transition-colors ${
            activeTab === 'account' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">person</span>
          <span className="font-label-badge text-label-badge mt-0.5">Account</span>
        </a>
      </div>
    </nav>
  );
};
