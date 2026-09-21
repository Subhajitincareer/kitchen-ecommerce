'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductVariants from './ProductVariants';
import DeliveryChecker from './DeliveryChecker';
import ProductActions from './ProductActions';
import ProductOffers from './ProductOffers';
import FrequentlyBoughtTogether from './FrequentlyBoughtTogether';
import MobilePurchaseBar from './MobilePurchaseBar';

interface PDPClientWrapperProps {
  product: Product;
}

export default function PDPClientWrapper({ product }: PDPClientWrapperProps) {
  const [currentPrice, setCurrentPrice] = useState(product.price);
  const [currentOriginalPrice, setCurrentOriginalPrice] = useState(product.originalPrice);

  const handlePriceChange = (price: number, original: number) => {
    setCurrentPrice(price);
    setCurrentOriginalPrice(original);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 pt-4 pb-12">
        
        {/* Left Column: Gallery */}
        <div className="lg:w-1/2 shrink-0">
          <ProductGallery 
            images={product.gallery || [product.image]} 
            productName={product.name} 
          />
        </div>
        
        {/* Right Column: Buy Box */}
        <div className="lg:w-1/2 flex flex-col gap-8 lg:sticky lg:top-24 h-fit">
          <ProductInfo 
            product={product} 
            currentPrice={currentPrice} 
            currentOriginalPrice={currentOriginalPrice} 
          />
          
          <div className="h-px bg-outline-variant/50 w-full" />
          
          <ProductVariants 
            variants={product.variants} 
            basePrice={product.price}
            originalPrice={product.originalPrice}
            onPriceChange={handlePriceChange} 
          />
          
          <DeliveryChecker />
          
          {/* Actions (Desktop) */}
          <div className="hidden md:block">
            <ProductActions product={product} currentPrice={currentPrice} />
          </div>
          
          <ProductOffers offers={product.offers} />
        </div>
        
      </div>

      {/* Full Width Sections below the fold */}
      <div className="space-y-4">
        {product.bundleItems && product.bundleItems.length > 0 && (
          <div className="py-8 border-t border-outline-variant">
            <FrequentlyBoughtTogether mainProduct={product} bundleItems={product.bundleItems} />
          </div>
        )}
      </div>

      {/* Mobile Sticky Bar */}
      <MobilePurchaseBar product={product} currentPrice={currentPrice} />
    </>
  );
}
