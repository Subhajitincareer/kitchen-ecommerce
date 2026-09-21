import React from 'react';

interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="py-8 md:py-12">
      <h2 className="text-2xl font-bold text-on-surface mb-6 font-jakarta">Product Description</h2>
      <div className="prose prose-sm md:prose-base max-w-none text-on-surface-variant leading-relaxed">
        <p>{description}</p>
        <p className="mt-4">
          Experience the joy of effortless cooking with the Kitchora XL Chop-Master. 
          Designed specifically for the Indian kitchen, this versatile tool takes the hard work out of 
          daily meal preparation. Whether you're making a quick salsa, preparing the base for a rich curry, 
          or dicing vegetables for a healthy salad, the precision-engineered blades deliver consistent results every time.
        </p>
      </div>
    </div>
  );
}
