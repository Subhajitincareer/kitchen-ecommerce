'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';

interface MobilePurchaseBarProps {
  product: Product;
  currentPrice: number;
}

export default function MobilePurchaseBar({ product, currentPrice }: MobilePurchaseBarProps) {
  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, price: currentPrice }, 1);
    openCart();
  };

  const handleBuyNow = () => {
    addToCart({ ...product, price: currentPrice }, 1);
    // Redirect to checkout in a real app
    openCart();
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant p-4 pb-safe z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-surface-container text-on-surface font-bold py-3.5 rounded-xl border-2 border-outline-variant flex items-center justify-center gap-2 transition-colors active:bg-outline-variant"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
          Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-[2] bg-primary text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[20px]">bolt</span>
          Buy Now
        </button>
      </div>
    </div>
  );
}
