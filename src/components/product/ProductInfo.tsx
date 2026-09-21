import React from 'react';
import { Product } from '@/data/products';

interface ProductInfoProps {
  product: Product;
  currentPrice: number;
  currentOriginalPrice: number;
}

export default function ProductInfo({ product, currentPrice, currentOriginalPrice }: ProductInfoProps) {
  const currentDiscountPct = Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100);

  return (
    <div className="space-y-4">
      {/* Brand & Badge */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">{product.specifications?.['Brand'] || 'Kitchora'}</span>
        {product.isFlashDeal && (
          <span className="bg-[#B91C1C]/10 text-[#B91C1C] text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            Flash Deal
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-on-surface leading-tight font-jakarta">
        {product.name}
      </h1>

      {/* Ratings */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-secondary-container text-on-secondary-container px-2 py-1 rounded-md font-bold text-sm">
          <span>{product.rating}</span>
          <span className="material-symbols-outlined text-[14px] fill-current">star</span>
        </div>
        <a href="#reviews" className="text-sm text-primary font-medium hover:underline">
          Read {product.reviewsCount.toLocaleString()} Reviews
        </a>
      </div>

      {/* Pricing */}
      <div className="pt-2">
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-on-surface">₹{currentPrice}</span>
          <div className="flex flex-col">
            <span className="text-sm text-on-surface-variant line-through font-medium">MRP: ₹{currentOriginalPrice}</span>
            <span className="text-sm font-bold text-[#10B981]">Save {currentDiscountPct}%</span>
          </div>
        </div>
        <div className="text-xs text-on-surface-variant mt-1">Inclusive of all taxes</div>
      </div>
    </div>
  );
}
