'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback if no images provided
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-surface-container rounded-2xl flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-outline opacity-50">
          image_not_supported
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row-reverse gap-4 md:gap-6 lg:sticky lg:top-24">
      {/* Main Image */}
      <div className="flex-1 relative aspect-square bg-surface-container rounded-3xl overflow-hidden border border-outline-variant">
        <Image
          src={images[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="bg-[#B91C1C] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            Best Seller
          </span>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <button className="h-10 w-10 bg-surface/90 backdrop-blur-md rounded-full flex items-center justify-center text-outline hover:text-[#B91C1C] transition-colors shadow-sm border border-outline-variant">
            <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 md:w-24 overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-20 h-20 md:w-full md:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
              activeIndex === idx
                ? 'border-primary'
                : 'border-transparent opacity-70 hover:opacity-100 hover:border-outline-variant'
            }`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover bg-surface-container"
              sizes="96px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
