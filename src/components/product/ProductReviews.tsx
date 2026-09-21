import React from 'react';
import { Review } from '@/data/products';

interface ProductReviewsProps {
  reviews?: Review[];
  rating: number;
  reviewsCount: number;
}

export default function ProductReviews({ reviews, rating, reviewsCount }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div id="reviews" className="py-8 md:py-12 border-t border-outline-variant scroll-mt-24">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-10">
        <div className="md:w-1/3 space-y-4">
          <h2 className="text-2xl font-bold text-on-surface font-jakarta">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <span className="text-5xl font-black text-on-surface font-jakarta">{rating}</span>
            <div>
              <div className="flex text-secondary mb-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-current">
                    {i < Math.floor(rating) ? 'star' : i < rating ? 'star_half' : 'star'}
                  </span>
                ))}
              </div>
              <div className="text-sm text-on-surface-variant font-medium">Based on {reviewsCount.toLocaleString()} reviews</div>
            </div>
          </div>
          <button className="w-full bg-surface border-2 border-outline-variant text-on-surface font-bold py-3 rounded-xl hover:border-primary hover:text-primary transition-colors">
            Write a Review
          </button>
        </div>

        <div className="md:w-2/3 space-y-3">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = star === 5 ? Math.floor(reviewsCount * 0.75) : star === 4 ? Math.floor(reviewsCount * 0.15) : star === 3 ? Math.floor(reviewsCount * 0.05) : star === 2 ? Math.floor(reviewsCount * 0.03) : Math.floor(reviewsCount * 0.02);
            const pct = (count / reviewsCount) * 100;
            return (
              <div key={star} className="flex items-center gap-4">
                <span className="text-sm font-bold text-on-surface flex items-center gap-1 w-8">
                  {star} <span className="material-symbols-outlined text-[14px]">star</span>
                </span>
                <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: `${pct}%` }}></div>
                </div>
                <span className="text-sm text-on-surface-variant w-10 text-right">{Math.round(pct)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-surface-container p-5 md:p-6 rounded-2xl border border-outline-variant/50">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${review.avatarColor}`}>
                  {review.initials}
                </div>
                <div>
                  <div className="font-bold text-on-surface text-sm">{review.author}</div>
                  <div className="text-xs text-on-surface-variant flex items-center gap-1">
                    {review.verified && <span className="material-symbols-outlined text-[12px] text-[#10B981]">verified</span>}
                    {review.verified && 'Verified Buyer • '} {review.location} • {review.date}
                  </div>
                </div>
              </div>
              <div className="flex text-secondary text-[14px]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined ${i < review.rating ? 'fill-current' : 'text-outline-variant'}`}>
                    star
                  </span>
                ))}
              </div>
            </div>
            
            <h4 className="font-bold text-on-surface mb-2">{review.title}</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              "{review.content}"
            </p>
            
            <div className="flex items-center justify-between border-t border-outline-variant/50 pt-4">
              {review.variantPurchased && (
                <div className="text-xs text-on-surface-variant bg-surface px-2 py-1 rounded border border-outline-variant">
                  Purchased: <span className="font-bold">{review.variantPurchased}</span>
                </div>
              )}
              <div className="flex items-center gap-4 text-xs text-on-surface-variant font-medium">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px]">thumb_up</span> Helpful ({review.helpfulCount})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="text-primary font-bold hover:underline">Load More Reviews</button>
      </div>
    </div>
  );
}
