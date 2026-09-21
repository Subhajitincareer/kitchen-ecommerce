'use client';

import React, { useState, useEffect } from 'react';
import { Variant } from '@/data/products';

interface ProductVariantsProps {
  variants?: {
    sizes?: Variant[];
    colors?: Variant[];
    packs?: Variant[];
  };
  basePrice: number;
  originalPrice: number;
  onPriceChange: (newPrice: number, newOriginal: number, selectedOptions: any) => void;
}

export default function ProductVariants({ variants, basePrice, originalPrice, onPriceChange }: ProductVariantsProps) {
  const [selectedSize, setSelectedSize] = useState<Variant | null>(
    variants?.sizes?.find(v => v.isPopular) || variants?.sizes?.[0] || null
  );
  const [selectedColor, setSelectedColor] = useState<Variant | null>(variants?.colors?.[0] || null);
  const [selectedPack, setSelectedPack] = useState<Variant | null>(variants?.packs?.[0] || null);

  // Compute final price when options change
  useEffect(() => {
    let price = selectedSize?.price || basePrice;
    let oldPrice = selectedSize?.originalPrice || originalPrice;

    // Packs could override base prices or apply multipliers (e.g., Twin Pack)
    if (selectedPack?.price) {
      price = selectedPack.price;
      oldPrice = selectedPack.originalPrice || price * 2;
    }

    onPriceChange(price, oldPrice, {
      size: selectedSize?.label,
      color: selectedColor?.label,
      pack: selectedPack?.label
    });
  }, [selectedSize, selectedColor, selectedPack, basePrice, originalPrice, onPriceChange]);

  if (!variants) return null;

  return (
    <div className="space-y-6">
      {/* Colors */}
      {variants.colors && variants.colors.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-semibold text-on-surface">Color</h3>
            <span className="text-sm text-on-surface-variant font-medium">{selectedColor?.label}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {variants.colors.map(color => (
              <button
                key={color.id}
                disabled={!color.inStock}
                onClick={() => setSelectedColor(color)}
                className={`group relative w-12 h-12 rounded-full p-1 transition-all ${
                  selectedColor?.id === color.id
                    ? 'border-2 border-primary ring-2 ring-primary/20'
                    : 'border-2 border-transparent hover:border-outline-variant'
                } ${!color.inStock && 'opacity-50 cursor-not-allowed'}`}
                title={color.label}
              >
                <div className={`w-full h-full rounded-full ${color.colorHex || 'bg-gray-500'} shadow-inner`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {variants.sizes && variants.sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-semibold text-on-surface">Capacity / Size</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {variants.sizes.map(size => (
              <button
                key={size.id}
                disabled={!size.inStock}
                onClick={() => setSelectedSize(size)}
                className={`relative py-3 px-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                  selectedSize?.id === size.id
                    ? 'border-primary bg-primary/5'
                    : 'border-outline-variant hover:border-primary/50'
                } ${!size.inStock && 'opacity-50 cursor-not-allowed bg-surface-container'}`}
              >
                {size.isPopular && (
                  <span className="absolute -top-3 bg-[#10B981] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                )}
                <span className={`text-sm font-bold ${selectedSize?.id === size.id ? 'text-primary' : 'text-on-surface'}`}>
                  {size.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Packs */}
      {variants.packs && variants.packs.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-semibold text-on-surface">Bundle Options</h3>
          </div>
          <div className="flex flex-col gap-3">
            {variants.packs.map(pack => (
              <button
                key={pack.id}
                disabled={!pack.inStock}
                onClick={() => setSelectedPack(pack)}
                className={`relative flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  selectedPack?.id === pack.id
                    ? 'border-primary bg-primary/5'
                    : 'border-outline-variant hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPack?.id === pack.id ? 'border-primary' : 'border-outline'
                  }`}>
                    {selectedPack?.id === pack.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <span className={`font-semibold ${selectedPack?.id === pack.id ? 'text-primary' : 'text-on-surface'}`}>
                    {pack.label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-on-surface">₹{pack.price}</span>
                  {pack.originalPrice && pack.originalPrice > pack.price && (
                    <span className="block text-xs text-on-surface-variant line-through">₹{pack.originalPrice}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
