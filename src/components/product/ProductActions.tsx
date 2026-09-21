'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';

interface ProductActionsProps {
  product: Product;
  currentPrice: number;
}

export default function ProductActions({ product, currentPrice }: ProductActionsProps) {
  const [qty, setQty] = useState(1);
  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    // In a real implementation, we would clone the product and set the price based on variants
    const productToAdd = { ...product, price: currentPrice };
    addToCart(productToAdd, qty);
    openCart();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a real flow, redirect to checkout here
  };

  return (
    <div className="flex gap-3">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between border-2 border-outline-variant rounded-xl px-2 w-32 shrink-0 bg-surface">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors disabled:opacity-30"
          disabled={qty <= 1}
        >
          <span className="material-symbols-outlined font-bold text-[20px]">remove</span>
        </button>
        <span className="font-bold text-on-surface text-lg">{qty}</span>
        <button
          onClick={() => setQty(Math.min(10, qty + 1))}
          className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors disabled:opacity-30"
          disabled={qty >= 10}
        >
          <span className="material-symbols-outlined font-bold text-[20px]">add</span>
        </button>
      </div>
      
      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white font-bold rounded-xl py-4 transition-all flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
        Add to Cart
      </button>

      {/* Buy Now (Desktop only, mobile has it in sticky bar) */}
      <button
        onClick={handleBuyNow}
        className="hidden md:flex flex-1 bg-primary text-white hover:bg-primary/90 font-bold rounded-xl py-4 transition-all items-center justify-center gap-2 shadow-lg shadow-primary/20"
      >
        <span className="material-symbols-outlined text-[20px]">bolt</span>
        Buy Now
      </button>
    </div>
  );
}
