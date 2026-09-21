'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, wishlistIds } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const isWishlisted = wishlistIds.includes(product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/40 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="sm:w-1/2 bg-surface-container p-4 flex items-center justify-center relative min-h-[200px] sm:min-h-[300px]">
            {imgError ? (
              <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-container-high flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-outline text-[48px]">image</span>
              </div>
            ) : (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="300px"
                className="object-cover rounded-lg"
                onError={() => setImgError(true)}
              />
            )}
            {product.discountPct > 0 && (
              <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-label-badge text-label-badge font-bold">
                {product.discountPct}% OFF
              </span>
            )}
          </div>

          {/* Details */}
          <div className="sm:w-1/2 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <span
                  className="material-symbols-outlined text-[16px] text-[#f59e0b]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  {product.rating}
                </span>
                <span className="font-body-sm text-[11px] text-outline">
                  ({product.reviewsCount} reviews)
                </span>
              </div>

              <h2 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">
                {product.name}
              </h2>

              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-3">
                {product.description}
              </p>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-price-hero text-price-hero text-primary font-bold">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="font-price-original text-price-original text-outline line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="font-label-badge text-label-badge text-secondary font-bold">
                  Save ₹{product.originalPrice - product.price}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-outline-variant/30 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md font-bold text-on-surface">Quantity</span>
                <div className="flex items-center border border-outline-variant/60 rounded-lg bg-surface-container-low">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-on-surface font-bold hover:bg-surface-container"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-label-md font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-on-surface font-bold hover:bg-surface-container"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={handleAdd}
                  className={`flex-1 h-11 rounded-xl font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-primary hover:bg-primary-container text-on-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isAdded ? 'done' : 'add_shopping_cart'}
                  </span>
                  <span>{isAdded ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-11 h-11 rounded-xl border border-outline-variant/60 flex items-center justify-center transition-colors ${
                    isWishlisted ? 'bg-tertiary-fixed text-tertiary' : 'hover:bg-surface-container text-outline'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
