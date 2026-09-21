'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlistIds: string[];
  isCartOpen: boolean;
  appliedCoupon: string | null;
  discountAmount: number;
  toastMessage: string | null;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  totalItemsCount: number;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1', 'prod-3']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial dummy cart item for demo
  useEffect(() => {
    // Add default initial items matching user's HTML template (3 items)
    const initialItems: CartItem[] = [
      {
        product: {
          id: 'prod-1',
          name: 'Premium Vegetable Chopper XL with SS 304 Blade',
          price: 499,
          originalPrice: 999,
          discountPct: 50,
          rating: 4.8,
          reviewsCount: 3892,
          badge: 'Cuts Prep In Half',
          category: 'tools',
          image: '/images/products/prod-1.webp',
          description: 'Heavy duty food grade stainless steel vegetable chopper with push lever and clear container.',
        },
        quantity: 1,
      },
      {
        product: {
          id: 'prod-2',
          name: 'Non-Stick Food Grade Silicone Spatula Set (6 Pcs)',
          price: 299,
          originalPrice: 599,
          discountPct: 50,
          rating: 4.7,
          reviewsCount: 1240,
          badge: 'Heat Proof 250°C',
          category: 'tools',
          image: '/images/products/prod-2.webp',
          description: 'Seamless, scratch-free silicone spatula set designed for non-stick cookware. Heat resistant up to 250°C.',
        },
        quantity: 1,
      },
      {
        product: {
          id: 'prod-3',
          name: 'Airtight Spice & Dal Container Set of 6 (1100ml)',
          price: 499,
          originalPrice: 999,
          discountPct: 50,
          rating: 4.9,
          reviewsCount: 4110,
          badge: '100% Leak Proof',
          category: 'storage',
          image: '/images/products/prod-3.webp',
          description: 'Stackable clear modular airtight food storage containers with hermetic locks.',
        },
        quantity: 1,
      },
    ];
    setCart(initialItems);
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const isWishlisted = prev.includes(productId);
      if (isWishlisted) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist!');
        return [...prev, productId];
      }
    });
  };

  const applyCoupon = (code: string) => {
    if (code.trim().toUpperCase() === 'DESI15') {
      setAppliedCoupon('DESI15');
      showToast('Coupon DESI15 applied! 15% discount activated.');
      return true;
    }
    showToast('Invalid coupon code. Try DESI15');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedCoupon === 'DESI15' ? Math.round(subtotal * 0.15) : 0;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 499;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlistIds,
        isCartOpen,
        appliedCoupon,
        discountAmount,
        toastMessage,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        subtotal,
        totalItemsCount,
        freeShippingThreshold,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
