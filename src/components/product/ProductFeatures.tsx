import React from 'react';
import { Feature } from '@/data/products';

interface ProductFeaturesProps {
  features?: Feature[];
}

export default function ProductFeatures({ features }: ProductFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <div className="py-8 md:py-12 border-t border-outline-variant">
      <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-8 font-jakarta">Why You'll Love It</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">{feature.icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-on-surface mb-2">{feature.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
