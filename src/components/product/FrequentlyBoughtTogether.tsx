'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BundleItem, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface FrequentlyBoughtTogetherProps {
  mainProduct: Product;
  bundleItems?: BundleItem[];
}

export default function FrequentlyBoughtTogether({ mainProduct, bundleItems }: FrequentlyBoughtTogetherProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    bundleItems ? bundleItems.filter(item => item.selected).map(item => item.id) : []
  );
  const { addToCart, openCart } = useCart();

  if (!bundleItems || bundleItems.length === 0) return null;

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedBundleItems = bundleItems.filter(item => selectedItems.includes(item.id));
  const totalBundlePrice = mainProduct.price + selectedBundleItems.reduce((sum, item) => sum + item.price, 0);
  const totalOriginalPrice = mainProduct.originalPrice + selectedBundleItems.reduce((sum, item) => sum + item.originalPrice, 0);
  const savings = totalOriginalPrice - totalBundlePrice;

  const handleAddBundle = () => {
    // Add main product
    addToCart(mainProduct, 1);
    
    // In a real app we'd fetch the actual products for the bundle items, 
    // but for this demo we'll just mock them up based on the bundle info
    selectedBundleItems.forEach(item => {
      const mockProduct: Product = {
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        description: 'Bundle Item',
        category: 'bundle',
        discountPct: Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100),
        rating: 4.5,
        reviewsCount: 100,
        badge: 'Bundle'
      };
      addToCart(mockProduct, 1);
    });
    
    openCart();
  };

  return (
    <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/50 space-y-6">
      <h2 className="text-xl font-bold text-on-surface">Frequently Bought Together</h2>
      
      {/* Visual Bundle Display */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {/* Main Product */}
        <div className="shrink-0 relative">
          <div className="w-24 h-24 bg-surface rounded-2xl border-2 border-primary overflow-hidden relative">
            <Image
              src={mainProduct.image}
              alt={mainProduct.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        </div>
        
        {bundleItems.map((item) => (
          <React.Fragment key={item.id}>
            <span className={`material-symbols-outlined shrink-0 ${selectedItems.includes(item.id) ? 'text-on-surface' : 'text-outline-variant'}`}>
              add
            </span>
            <div 
              className={`shrink-0 relative cursor-pointer group transition-all`}
              onClick={() => toggleItem(item.id)}
            >
              <div className={`w-24 h-24 rounded-2xl border-2 overflow-hidden relative transition-all ${
                selectedItems.includes(item.id) ? 'border-primary bg-surface' : 'border-transparent opacity-50 grayscale hover:opacity-100 hover:grayscale-0'
              }`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              {!selectedItems.includes(item.id) && (
                <div className="absolute inset-0 bg-black/10 rounded-2xl flex items-center justify-center">
                  <span className="bg-surface/80 backdrop-blur text-xs font-bold px-2 py-1 rounded">Add</span>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
      
      {/* Selection List */}
      <div className="space-y-4 pt-4 border-t border-outline-variant">
        <label className="flex gap-4 items-start cursor-pointer">
          <div className="pt-1">
            <input type="checkbox" checked disabled className="w-5 h-5 accent-primary rounded border-outline" />
          </div>
          <div>
            <span className="font-bold text-on-surface text-sm">{mainProduct.name}</span>
            <div className="font-bold">₹{mainProduct.price}</div>
          </div>
        </label>
        
        {bundleItems.map(item => (
          <label key={item.id} className="flex gap-4 items-start cursor-pointer group">
            <div className="pt-1">
              <input 
                type="checkbox" 
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItem(item.id)}
                className="w-5 h-5 accent-primary rounded border-outline" 
              />
            </div>
            <div>
              <span className={`text-sm transition-colors ${selectedItems.includes(item.id) ? 'font-bold text-on-surface' : 'text-on-surface-variant'}`}>
                {item.name}
              </span>
              <div className="flex gap-2 items-center">
                <span className={`font-bold ${selectedItems.includes(item.id) ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                  ₹{item.price}
                </span>
                <span className="text-xs text-on-surface-variant line-through">₹{item.originalPrice}</span>
              </div>
            </div>
          </label>
        ))}
      </div>
      
      {/* Bundle Action */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-outline-variant">
        <div>
          <div className="text-sm text-on-surface-variant">Total price:</div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-on-surface">₹{totalBundlePrice}</span>
            {savings > 0 && (
              <span className="text-sm text-error font-medium mb-1 line-through">₹{totalOriginalPrice}</span>
            )}
          </div>
          {savings > 0 && (
            <div className="text-sm text-[#10B981] font-bold mt-1">You save ₹{savings}!</div>
          )}
        </div>
        <button
          onClick={handleAddBundle}
          className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 font-bold rounded-xl py-3 px-8 transition-all flex items-center justify-center gap-2"
        >
          Add {1 + selectedItems.length} items to Cart
        </button>
      </div>
    </div>
  );
}
