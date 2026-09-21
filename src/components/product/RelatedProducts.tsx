import React from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  // Get 4 products from the same category (or any if not enough), excluding the current product
  const relatedProducts = PRODUCTS
    .filter(p => p.id !== currentProductId && p.category === category)
    .slice(0, 4);

  // If we didn't find enough, backfill with other products
  if (relatedProducts.length < 4) {
    const more = PRODUCTS
      .filter(p => p.id !== currentProductId && !relatedProducts.find(r => r.id === p.id))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...more);
  }

  if (relatedProducts.length === 0) return null;

  return (
    <div className="py-8 md:py-12 border-t border-outline-variant">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-on-surface font-jakarta">Similar Products</h2>
        <button className="text-primary font-bold text-sm hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
