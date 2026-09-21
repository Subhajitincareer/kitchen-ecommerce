'use client';

import React, { useState } from 'react';
import { Offer } from '@/data/products';

interface ProductOffersProps {
  offers?: Offer[];
}

export default function ProductOffers({ offers }: ProductOffersProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!offers || offers.length === 0) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-on-surface flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">local_offer</span>
        Available Offers
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        {offers.map(offer => (
          <div
            key={offer.id}
            className="w-[280px] shrink-0 bg-surface-container rounded-2xl p-4 border border-outline-variant/50 relative overflow-hidden"
          >
            {/* Offer Type Badge */}
            <div className="absolute top-0 right-0 bg-[#10B981] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              {offer.type}
            </div>

            <div className="font-bold text-on-surface mb-1">{offer.title}</div>
            <div className="text-sm text-on-surface-variant mb-4">{offer.subtitle}</div>
            
            <div className="flex items-center gap-2">
              <div className="border border-dashed border-primary/40 bg-primary/5 text-primary font-mono text-sm px-3 py-1.5 rounded-lg font-bold">
                {offer.code}
              </div>
              <button
                onClick={() => handleCopy(offer.code)}
                className="text-xs font-bold text-primary hover:text-primary/80 transition-colors px-2 py-1.5"
              >
                {copiedCode === offer.code ? 'COPIED!' : 'COPY'}
              </button>
            </div>
            
            <div className="text-[11px] text-on-surface-variant mt-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">info</span>
              {offer.discountText} {offer.minOrder && `(Min: ₹${offer.minOrder})`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
