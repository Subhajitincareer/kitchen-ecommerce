'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    totalItemsCount,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Order Placed Successfully! Thank you for shopping with Kitchora.');
      setIsCheckingOut(false);
      closeCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-surface flex flex-col h-full shadow-2xl overflow-hidden animate-slide-left">
        {/* Header */}
        <div className="p-space-md bg-surface-container-low border-b border-outline-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Your Cart</h2>
            <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-badge text-label-badge font-bold">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-space-md py-space-sm bg-secondary-container/30 border-b border-secondary-container/50">
          {subtotal >= freeShippingThreshold ? (
            <div className="flex items-center gap-2 font-label-md text-label-md text-secondary font-bold">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Congratulations! You qualify for FREE Pan-India Shipping!</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-label-badge text-label-badge text-on-surface-variant">
                <span>Add <strong>₹{remainingForFreeShipping}</strong> more for FREE Express Shipping</span>
                <span>{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-secondary transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-space-md flex flex-col gap-space-sm">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-space-xl text-on-surface-variant">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-space-sm">
                <span className="material-symbols-outlined text-[32px]">shopping_cart_off</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Your cart is empty</h3>
              <p className="font-body-sm text-body-sm text-outline mt-1 mb-space-md">
                Add smart kitchen tools &amp; storage canisters to get cooking faster!
              </p>
              <button
                onClick={closeCart}
                className="px-space-lg py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors"
              >
                Browse Kitchen Gear
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-space-sm rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex gap-space-sm shadow-xs"
              >
                <div className="w-20 h-20 rounded-lg bg-surface-container overflow-hidden shrink-0 relative flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-1">
                    <h4 className="font-headline-sm text-[13px] font-bold text-on-surface line-clamp-2 leading-tight">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-outline hover:text-tertiary p-0.5 transition-colors shrink-0"
                      title="Remove item"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="font-price-card text-price-card text-primary font-bold">
                        ₹{item.product.price}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="font-price-original text-price-original text-outline line-through">
                          ₹{item.product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controller */}
                    <div className="flex items-center border border-outline-variant/60 rounded-lg bg-surface-container-low">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-label-md text-label-md font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-space-md bg-surface-container-low border-t border-outline-variant/40 flex flex-col gap-space-xs">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-space-xs">
              <input
                type="text"
                placeholder="Promo Code (e.g. DESI15)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 h-9 px-3 rounded-lg bg-surface-container-lowest text-on-surface border border-outline-variant/60 font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="h-9 px-3 rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md font-bold hover:bg-primary hover:text-on-primary transition-colors"
              >
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div className="flex justify-between items-center px-2 py-1 bg-secondary-container/40 rounded text-secondary font-label-badge text-label-badge font-bold">
                <span>Coupon ({appliedCoupon}) applied</span>
                <button onClick={removeCoupon} className="underline hover:text-tertiary">
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="flex flex-col gap-1 pt-2 font-body-sm text-body-sm text-on-surface-variant border-t border-outline-variant/20">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-on-surface">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-secondary font-bold">
                  <span>Coupon Discount (15%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Pan-India Shipping</span>
                <span className="text-secondary font-bold">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '₹49'}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-outline-variant/30 text-headline-sm font-bold text-on-surface">
                <span>Total Amount</span>
                <span className="font-price-hero text-price-hero text-primary">
                  ₹{finalTotal + (subtotal >= freeShippingThreshold ? 0 : 49)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="mt-2 w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
            >
              {isCheckingOut ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                  <span>Proceed to Checkout</span>
                </>
              )}
            </button>
            <p className="text-center font-label-badge text-[10px] text-outline mt-0.5">
              100% Safe &amp; Encrypted Checkout • UPI / Cards / COD Supported
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
