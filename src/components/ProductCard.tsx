'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, wishlistIds } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  const isWishlisted = wishlistIds.includes(product.id);

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1600);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-surface-container-lowest rounded-xl p-2 sm:p-3 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative cursor-pointer border border-outline-variant/20"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-square bg-surface-container rounded-lg overflow-hidden flex items-center justify-center mb-2 sm:mb-3">
        {/* Discount Badge */}
        {product.discountPct > 0 && (
          <span className="absolute top-1.5 left-1.5 z-10 px-1.5 sm:px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-label-badge text-[10px] sm:text-label-badge font-bold">
            {product.discountPct}% OFF
          </span>
        )}

        {/* Wishlist Heart Toggle Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Toggle Wishlist"
          type="button"
          className="absolute top-1.5 right-1.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-xs flex items-center justify-center text-outline hover:text-tertiary transition-colors shadow-xs"
        >
          <span
            className={`material-symbols-outlined text-[16px] sm:text-[18px] ${
              isWishlisted ? 'text-tertiary' : 'text-outline'
            }`}
            style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Image with fallback */}
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-outline text-[48px]">image</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 rounded"
            onError={() => setImgError(true)}
          />
        )}

        {/* Feature Pill Overlay at bottom */}
        {product.badge && (
          <span className="absolute bottom-1 inset-x-1 py-0.5 text-center rounded bg-surface-container-lowest/90 font-label-badge text-[9px] sm:text-[10px] font-bold text-secondary truncate z-10">
            {product.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 px-0.5">
        <div className="flex items-center gap-1 mb-1">
          <span
            className="material-symbols-outlined text-[13px] sm:text-[15px] text-[#f59e0b]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-label-md text-label-md font-bold text-on-surface">
            {product.rating}
          </span>
          <span className="font-body-sm text-[10px] sm:text-[11px] text-outline">
            ({product.reviewsCount.toLocaleString()})
          </span>
        </div>

        <h3 className="font-headline-sm text-[13px] sm:text-headline-sm font-bold text-on-surface line-clamp-2 leading-snug sm:leading-tight mb-2">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="mt-auto pt-1 flex items-baseline gap-1.5">
          <span className="font-price-card text-price-card text-primary font-bold">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="font-price-original text-price-original text-outline line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          type="button"
          className={`mt-2 w-full h-9 sm:h-10 rounded-lg font-label-md text-label-md font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs cursor-pointer ${
            isAdded
              ? 'bg-secondary text-on-secondary'
              : 'bg-primary hover:bg-primary-container text-on-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {isAdded ? 'done' : 'add_shopping_cart'}
          </span>
          <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};
