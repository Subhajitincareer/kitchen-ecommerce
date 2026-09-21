'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { CATEGORIES } from '@/data/products';

export const Header: React.FC = () => {
  const { openCart, totalItemsCount, wishlistIds, subtotal } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* ROW 1: TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-surface-container-low border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-8 text-body-sm text-on-surface-variant">
          <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span className="hidden sm:inline">Welcome to Kitchora • Smart Tools. Better Kitchens.</span>
            <span className="sm:hidden font-bold">Free Pan-India Shipping on ₹499+</span>
          </div>
          <nav className="hidden md:flex items-center gap-space-md font-label-badge text-label-badge">
            <a href="#orders" className="hover:text-primary transition-colors">
              Track Order
            </a>
            <span className="text-outline-variant">|</span>
            <a href="#help" className="hover:text-primary transition-colors">
              24x7 Help Center
            </a>
            <span className="text-outline-variant">|</span>
            <a href="#seller" className="text-secondary font-bold hover:text-primary transition-colors">
              Sell on Kitchora
            </a>
            <span className="text-outline-variant">|</span>
            <button className="flex items-center gap-space-xs hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[14px]">language</span>
              <span>IN / INR ₹</span>
            </button>
          </nav>
        </div>
      </div>

      {/* ROW 2: MAIN HEADER BAR */}
      <div className="w-full border-b border-outline-variant/20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-2 md:py-0 md:h-16 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          {/* Logo & Location */}
          <div className="w-full md:w-auto flex items-center justify-between md:justify-start gap-4 shrink-0">
            <a href="#" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[22px]">soup_kitchen</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary leading-none">
                  KITCHORA
                </span>
                <span className="font-label-badge text-[9px] leading-tight text-secondary font-bold tracking-wider uppercase">
                  Smart Tools. Better Kitchens.
                </span>
              </div>
            </a>

            {/* Desktop Location Selector */}
            <button
              type="button"
              className="hidden lg:flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container text-left transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
              <div className="flex flex-col">
                <span className="font-label-badge text-[10px] text-on-surface-variant leading-none">
                  Deliver to Mumbai 400001
                </span>
                <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
                  Update location
                </span>
              </div>
            </button>

            {/* Mobile Header Icons */}
            <div className="flex md:hidden items-center gap-space-xs">
              <button
                onClick={openCart}
                className="relative w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                aria-label="Open cart"
              >
                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                <span className="absolute top-1 right-1 bg-primary text-on-primary font-label-badge text-label-badge rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center leading-none">
                  {totalItemsCount}
                </span>
              </button>
              <a href="/auth" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </a>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:flex-1 max-w-2xl">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex items-center w-full h-12 rounded-xl bg-surface-container-low shadow-[0_2px_6px_-1px_rgba(99,44,18,0.05)] border border-outline-variant/30"
            >
              <div className="hidden sm:flex items-center h-full shrink-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Search category filter"
                  className="h-full pl-4 pr-3 bg-transparent font-label-md text-label-md text-on-surface-variant outline-none cursor-pointer rounded-l-xl"
                >
                  <option value="all">All Categories</option>
                  <option value="tools">Kitchen Tools</option>
                  <option value="cookware">Cookware</option>
                  <option value="storage">Storage &amp; Jars</option>
                  <option value="appliances">Small Appliances</option>
                </select>
                <div className="h-6 w-px bg-outline-variant shrink-0" />
              </div>

              <span className="sm:hidden material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                search
              </span>
              <input
                type="search"
                placeholder="Search kitchen tools, cookware, storage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-full pl-10 sm:pl-4 pr-10 md:pr-4 bg-transparent font-body-sm text-body-sm md:text-body-md text-on-surface placeholder:text-outline outline-none"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="hidden md:flex h-12 px-5 bg-primary hover:bg-primary-container text-on-primary rounded-r-xl items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
              <button
                type="button"
                className="md:hidden absolute right-1 w-9 h-9 flex items-center justify-center rounded-lg bg-primary-container text-on-primary-container"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </form>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="/auth"
              className="flex flex-col text-left py-space-xs px-space-sm rounded hover:bg-surface-container-low transition-colors"
            >
              <span className="font-label-badge text-[10px] text-on-surface-variant leading-none">
                Hello, Sign in
              </span>
              <span className="font-label-md text-label-md text-on-surface font-bold leading-tight flex items-center gap-space-xs">
                Account &amp; Lists
                <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
              </span>
            </a>

            <a
              href="#wishlist"
              className="relative p-space-xs rounded-lg hover:bg-surface-container-low text-on-surface transition-colors flex items-center justify-center"
              aria-label="Wishlist"
            >
              <span className="material-symbols-outlined text-[24px]">favorite</span>
              <span className="absolute -top-1 -right-1 bg-tertiary-container text-on-tertiary-container font-label-badge text-label-badge w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistIds.length}
              </span>
            </a>

            <button
              onClick={openCart}
              aria-label="Shopping Cart"
              className="flex items-center gap-space-xs py-space-xs px-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[24px]">shopping_cart</span>
                <span className="absolute -top-1.5 -right-2 bg-primary text-on-primary font-label-badge text-label-badge px-1.5 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              </div>
              <div className="hidden xl:flex flex-col text-left ml-1">
                <span className="font-label-badge text-[10px] text-on-surface-variant leading-none">
                  Subtotal
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-none">
                  ₹{subtotal}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ROW 3: CATEGORY NAV STRIP */}
      <div className="w-full bg-surface-container-low border-b border-outline-variant/20 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-10 md:h-11 flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            type="button"
            className="hidden md:flex items-center gap-space-xs font-label-md text-label-md text-on-surface font-bold py-1 px-space-sm rounded hover:bg-surface-container transition-colors shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">menu</span>
            <span>All Categories</span>
          </button>
          <div className="hidden md:block h-4 w-px bg-outline-variant shrink-0" />

          {/* Quick Filter Pill list */}
          <a
            href="#deals"
            className="shrink-0 px-3 py-1 md:py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1 shadow-xs"
          >
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            <span>Deals</span>
          </a>

          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="shrink-0 px-3 py-1 md:py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
            >
              {cat.name}
            </a>
          ))}

          <a
            href="#festive"
            className="shrink-0 px-3 py-1 md:py-1.5 rounded-full bg-tertiary-container/30 text-tertiary font-label-md text-label-md font-bold hover:bg-tertiary-container/50 transition-colors flex items-center gap-1"
          >
            <span>Festive Combos</span>
            <span className="bg-tertiary text-on-tertiary font-label-badge text-[9px] px-1 rounded-full">
              HOT
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
