'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PRODUCTS, CATEGORIES, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { addToCart } = useCart();
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
  const [bestsellerFilter, setBestsellerFilter] = useState('all');
  const router = useRouter();

  // Flash deal countdown timer state (8 hrs 42 mins 16 secs)
  const [totalSeconds, setTotalSeconds] = useState(8 * 3600 + 42 * 60 + 16);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev <= 1 ? 24 * 3600 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');

  // Filter bestsellers
  const filteredBestsellers = PRODUCTS.filter((p) => {
    if (bestsellerFilter === 'under499') return p.price <= 499;
    if (bestsellerFilter === 'prep') return p.category === 'tools';
    if (bestsellerFilter === 'storage') return p.category === 'storage';
    if (bestsellerFilter === 'top') return p.rating >= 4.8;
    return true;
  });

  const flashDeals = PRODUCTS.filter((p) => p.isFlashDeal);

  return (
    <div className="flex flex-col w-full">
      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />

      {/* PROMO STRIP */}
      <section className="w-full bg-surface-container-high py-1.5 px-6 md:px-10 border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between font-label-badge text-label-badge text-on-surface-variant">
          <div className="flex items-center gap-space-md">
            <span className="inline-flex items-center gap-1 font-bold text-primary">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              FESTIVE KITCHEN CARNIVAL
            </span>
            <span className="hidden sm:inline text-outline-variant">|</span>
            <span className="hidden sm:inline">
              Use code <strong className="text-on-surface">DESI15</strong> for extra 15% off on orders above ₹999
            </span>
          </div>
          <div className="flex items-center gap-space-lg">
            <span className="inline-flex items-center gap-1 text-secondary font-bold">
              <span className="material-symbols-outlined text-[14px]">local_shipping</span> 48-Hour Dispatch
            </span>
            <a href="#deals" className="hover:text-primary transition-colors font-bold underline">
              Today&apos;s Deals
            </a>
          </div>
        </div>
      </section>

      {/* HERO & PROMOTIONS */}
      <section className="w-full px-6 md:px-10 py-4 md:py-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-5 items-stretch">
          {/* Main Hero Banner */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-surface-container shadow-sm flex flex-col justify-end min-h-[340px] md:min-h-[500px] p-6 md:p-10 group">
            <Image
              src="/images/hero-kitchen.jpg"
              alt="Warm modern Indian kitchen"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 68vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="relative z-10 flex flex-col items-start max-w-2xl text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-badge text-label-badge font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-[14px]">eco</span>
                Curated for Daily Cooking
              </span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-3xl md:text-[40px] font-bold tracking-tight text-white leading-tight mb-3">
                Upgrade Your Everyday Kitchen
              </h1>
              <p className="font-body-sm md:font-body-lg text-sm md:text-base text-white/80 font-normal mb-5 max-w-xl line-clamp-2 sm:line-clamp-none">
                Practical tools that make chopping, tadka prep, organizing and daily cleaning genuinely effortless.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#bestsellers"
                  className="h-11 px-5 md:px-6 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Shop Kitchen Essentials</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <a
                  href="#deals"
                  className="h-11 px-4 rounded-xl bg-white/15 backdrop-blur-sm text-white font-headline-sm text-headline-sm font-bold shadow-xs hover:bg-white/25 transition-all flex items-center justify-center active:scale-95 border border-white/20"
                >
                  Explore Deals
                </a>
              </div>
              <div className="hidden sm:flex flex-wrap items-center gap-4 mt-5 pt-3 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
                <span className="font-label-badge text-label-badge text-white/90 flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[15px] text-[#f59e0b]">star</span> 4.8/5 Rated by 45,000+ Indian Homes
                </span>
                <span className="text-white/40">•</span>
                <span className="font-label-badge text-label-badge text-white/90 flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[15px] text-secondary-container">check_circle</span> Free Delivery on ₹499+
                </span>
              </div>
            </div>
          </div>

          {/* Right Column Stacked Promo Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-5 justify-between">
            {/* Card 1: Cook Smarter */}
            <a
              href="#deals"
              className="relative rounded-xl p-4 md:p-6 bg-primary-fixed flex flex-col justify-between overflow-hidden group shadow-xs min-h-[140px] md:min-h-[235px]"
            >
              <div className="relative z-10 flex flex-col max-w-[65%]">
                <span className="font-label-badge text-label-badge text-primary font-bold uppercase tracking-wider">
                  Priced to Delight
                </span>
                <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md font-bold text-on-primary-fixed leading-tight mt-0.5">
                  Cook Smarter
                </h2>
                <p className="font-body-sm text-body-sm font-semibold text-primary mt-0.5">
                  Tools from ₹199
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-1 text-primary font-label-md text-label-md font-bold pt-2">
                <span>Shop Now</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  chevron_right
                </span>
              </div>
              <div className="absolute -right-2 -bottom-2 w-24 md:w-36 h-24 md:h-36 opacity-90 pointer-events-none rounded-xl overflow-hidden">
                <Image
                  src="/images/promo-chopper.jpg"
                  alt="Vegetable Chopper"
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
            </a>

            {/* Card 2: Organize Better */}
            <a
              href="#storage"
              className="relative rounded-xl p-4 md:p-6 bg-secondary-fixed flex flex-col justify-between overflow-hidden group shadow-xs min-h-[140px] md:min-h-[235px]"
            >
              <div className="relative z-10 flex flex-col max-w-[65%]">
                <span className="font-label-badge text-label-badge text-secondary font-bold uppercase tracking-wider">
                  Pantry Revamp
                </span>
                <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md font-bold text-on-secondary-fixed leading-tight mt-0.5">
                  Organize Better
                </h2>
                <p className="font-body-sm text-body-sm font-semibold text-secondary mt-0.5">
                  Airtight &amp; modular
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-1 text-secondary font-label-md text-label-md font-bold pt-2">
                <span>Explore</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  chevron_right
                </span>
              </div>
              <div className="absolute -right-2 -bottom-2 w-24 md:w-36 h-24 md:h-36 opacity-90 pointer-events-none rounded-xl overflow-hidden">
                <Image
                  src="/images/promo-storage.jpg"
                  alt="Storage Containers"
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="w-full px-6 md:px-10 py-6 md:py-10" id="categories">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-4 sm:gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg font-bold text-on-surface">
                Shop by Category
              </h2>
              <span className="font-body-sm text-body-sm text-outline">
                Smartly categorized for fast prep, smart cooking &amp; storage
              </span>
            </div>
            <a href="#all" className="font-label-md text-label-md text-primary font-bold flex items-center gap-0.5">
              <span>All ({CATEGORIES.length})</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 pt-1">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex flex-col items-center text-center p-2 sm:p-3 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all active:scale-95 group cursor-pointer border border-outline-variant/10"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${cat.bgClass} flex items-center justify-center ${cat.textClass} mb-1 group-hover:scale-110 transition-transform`}
                >
                  <span className="material-symbols-outlined text-[24px] sm:text-[28px]">{cat.icon}</span>
                </div>
                <span className="font-label-md text-[11px] sm:text-label-md font-bold text-on-surface leading-tight">
                  {cat.name}
                </span>
                <span className="font-body-sm text-[10px] text-outline truncate w-full">
                  {cat.subtitle}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FLASH DEALS SECTION */}
      <section className="w-full px-6 md:px-10 py-6 md:py-10" id="deals">
        <div className="max-w-[1440px] mx-auto bg-surface-container-low rounded-2xl p-4 sm:p-6 shadow-xs">
          {/* Header with Live Timer */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 bg-surface-container-lowest p-3 sm:p-4 rounded-xl shadow-xs border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary shrink-0">
                <span className="material-symbols-outlined text-[22px]">flash_on</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg font-bold text-on-surface">
                    Deals You&apos;ll Want to Grab
                  </h2>
                </div>
                <p className="font-body-sm text-body-sm text-outline">
                  Deep daily discounts on everyday kitchen utilities
                </p>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-on-primary shadow-xs self-start md:self-auto">
              <span className="material-symbols-outlined text-[16px]">timer</span>
              <span className="font-label-badge text-label-badge font-bold tracking-wider">
                {hrs} : {mins} : {secs}
              </span>
            </div>
          </div>

          {/* Responsive Deals Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {flashDeals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS FOR EVERY KITCHEN TASK */}
      <section className="w-full px-6 md:px-10 py-6 md:py-8">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col">
            <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg font-bold text-on-surface">
              Tools for Every Kitchen Task
            </h2>
            <p className="font-body-sm text-body-sm text-outline">
              Purpose-built gear designed around your daily Indian cooking workflow
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Need 1 */}
            <div className="p-3 sm:p-5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-2 sm:gap-4 border border-outline-variant/20">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px] sm:text-[28px]">content_cut</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-label-badge text-[10px] text-primary font-bold bg-primary-fixed/40 px-1.5 py-0.5 rounded self-start mb-1">
                  Fast Prep
                </span>
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md font-bold text-on-surface leading-tight">
                  Chop Faster
                </h3>
                <p className="font-body-sm text-[11px] sm:text-body-sm text-outline mt-0.5">
                  Mandolines, slicers &amp; push choppers
                </p>
              </div>
            </div>

            {/* Need 2 */}
            <div className="p-3 sm:p-5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-2 sm:gap-4 border border-outline-variant/20">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[22px] sm:text-[28px]">lock</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-label-badge text-[10px] text-secondary font-bold bg-secondary-fixed/40 px-1.5 py-0.5 rounded self-start mb-1">
                  Pest-Safe
                </span>
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md font-bold text-on-surface leading-tight">
                  Store Smarter
                </h3>
                <p className="font-body-sm text-[11px] sm:text-body-sm text-outline mt-0.5">
                  Moisture-lock glass jars &amp; dabbas
                </p>
              </div>
            </div>

            {/* Need 3 */}
            <div className="p-3 sm:p-5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-2 sm:gap-4 border border-outline-variant/20">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[22px] sm:text-[28px]">cake</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-label-badge text-[10px] text-tertiary font-bold bg-tertiary-fixed/40 px-1.5 py-0.5 rounded self-start mb-1">
                  Exact Mix
                </span>
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md font-bold text-on-surface leading-tight">
                  Bake Better
                </h3>
                <p className="font-body-sm text-[11px] sm:text-body-sm text-outline mt-0.5">
                  Silicone moulds &amp; measuring sets
                </p>
              </div>
            </div>

            {/* Need 4 */}
            <div className="p-3 sm:p-5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-2 sm:gap-4 border border-outline-variant/20">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px] sm:text-[28px]">soup_kitchen</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-label-badge text-[10px] text-on-surface font-bold bg-surface-container/60 px-1.5 py-0.5 rounded self-start mb-1">
                  No-Burn
                </span>
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md font-bold text-on-surface leading-tight">
                  Cook Easier
                </h3>
                <p className="font-body-sm text-[11px] sm:text-body-sm text-outline mt-0.5">
                  Heavy-gauge tri-ply &amp; tawas
                </p>
              </div>
            </div>

            {/* Need 5 */}
            <div className="p-3 sm:p-5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-2 sm:gap-4 border border-outline-variant/20">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[22px] sm:text-[28px]">soap</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-label-badge text-[10px] text-secondary font-bold bg-surface-container-high/60 px-1.5 py-0.5 rounded self-start mb-1">
                  Zero-Oil
                </span>
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md font-bold text-on-surface leading-tight">
                  Clean Quickly
                </h3>
                <p className="font-body-sm text-[11px] sm:text-body-sm text-outline mt-0.5">
                  Oil-cutting scrubbers &amp; sink trays
                </p>
              </div>
            </div>

            {/* Need 6 */}
            <div className="p-3 sm:p-5 rounded-xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-2 sm:gap-4 border border-outline-variant/20">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-secondary-fixed-dim flex items-center justify-center text-on-secondary-fixed shrink-0">
                <span className="material-symbols-outlined text-[22px] sm:text-[28px]">expand</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-label-badge text-[10px] text-on-secondary-fixed font-bold bg-secondary-fixed-dim/40 px-1.5 py-0.5 rounded self-start mb-1">
                  2X Space
                </span>
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md font-bold text-on-surface leading-tight">
                  Save Space
                </h3>
                <p className="font-body-sm text-[11px] sm:text-body-sm text-outline mt-0.5">
                  Vertical racks &amp; expandable dividers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLING KITCHEN ESSENTIALS */}
      <section className="w-full px-6 md:px-10 py-6 md:py-10" id="bestsellers">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg font-bold text-on-surface">
                Bestselling Kitchen Essentials
              </h2>
              <p className="font-body-sm text-body-sm text-outline">
                Verified Indian customer favorites with 4.5+ ★ ratings
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'all', label: 'All Bestsellers' },
                { id: 'under499', label: 'Under ₹499' },
                { id: 'prep', label: 'Chopping & Prep' },
                { id: 'storage', label: 'Airtight Storage' },
                { id: 'top', label: 'Rated 4.8+' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setBestsellerFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md whitespace-nowrap transition-colors cursor-pointer ${
                    bestsellerFilter === tab.id
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredBestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND PROMOTION BANNER */}
      <section className="w-full px-6 md:px-10 py-4 md:py-6">
        <div className="max-w-[1440px] mx-auto rounded-2xl bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary p-6 md:p-10 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5 md:gap-10">
          <div className="absolute -right-6 -bottom-6 w-36 md:w-80 h-36 md:h-80 bg-surface-tint/30 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col items-start z-10 max-w-2xl">
            <div className="flex items-center gap-1.5 font-label-badge text-label-badge font-bold uppercase tracking-wider text-primary-fixed mb-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>The Kitchora Promise</span>
            </div>
            <h2 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg font-bold tracking-tight text-on-primary leading-tight mb-2">
              Small Tools. Big Difference.
            </h2>
            <p className="font-body-sm md:font-body-lg text-body-sm md:text-body-lg text-primary-fixed-dim max-w-lg mb-4">
              Discover practical kitchen gear engineered intentionally for everyday Indian cooking rhythms.
            </p>
            <a
              href="#categories"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-xs active:scale-95 transition-transform"
            >
              <span>Explore the Collection</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3 z-10 w-full md:w-auto shrink-0">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl">
              <span className="material-symbols-outlined text-[24px] text-secondary-container">construction</span>
              <div>
                <div className="font-headline-sm text-[13px] font-bold leading-none">Engineered in India</div>
                <div className="font-body-sm text-[10px] text-primary-fixed mt-0.5">Desi cooking habits</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl">
              <span className="material-symbols-outlined text-[24px] text-secondary-container">shield</span>
              <div>
                <div className="font-headline-sm text-[13px] font-bold leading-none">SS 304 Food Grade</div>
                <div className="font-body-sm text-[10px] text-primary-fixed mt-0.5">Rust-free 10-yr durability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR IN INDIAN KITCHENS */}
      <section className="w-full px-6 md:px-10 py-6 md:py-10">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-5">
          <div className="flex flex-col">
            <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg font-bold text-on-surface">
              Popular in Indian Kitchens
            </h2>
            <p className="font-body-sm text-body-sm text-outline">
              Specially selected bundles for traditional cooking habits
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Collection 1 */}
            <div className="rounded-xl bg-surface-container-lowest p-3 sm:p-4 shadow-xs flex flex-col justify-between border border-outline-variant/30">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Everyday Cooking
                    </h3>
                    <span className="font-body-sm text-[11px] text-outline">Tadka pans &amp; tongs</span>
                  </div>
                </div>
                <a href="#cookware" className="text-primary font-label-badge text-label-badge font-bold">
                  View All
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PRODUCTS.slice(8, 11).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => router.push(`/product/${item.id}`)}
                    className="p-1.5 rounded-lg bg-surface-container-low flex flex-col items-center text-center cursor-pointer hover:bg-surface-container transition-colors"
                  >
                    <div className="w-full aspect-square rounded bg-surface-container overflow-hidden mb-1 relative">
                      <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />
                    </div>
                    <span className="font-body-sm text-[11px] font-bold text-on-surface truncate w-full">
                      {item.name}
                    </span>
                    <span className="font-price-card text-[13px] text-primary font-bold">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Collection 2 */}
            <div className="rounded-xl bg-surface-container-lowest p-3 sm:p-4 shadow-xs flex flex-col justify-between border border-outline-variant/30">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[20px]">all_inbox</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Smart Storage
                    </h3>
                    <span className="font-body-sm text-[11px] text-outline">Masala boxes &amp; dabbas</span>
                  </div>
                </div>
                <a href="#storage" className="text-secondary font-label-badge text-label-badge font-bold">
                  View All
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PRODUCTS.slice(2, 5).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => router.push(`/product/${item.id}`)}
                    className="p-1.5 rounded-lg bg-surface-container-low flex flex-col items-center text-center cursor-pointer hover:bg-surface-container transition-colors"
                  >
                    <div className="w-full aspect-square rounded bg-surface-container overflow-hidden mb-1 relative">
                      <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />
                    </div>
                    <span className="font-body-sm text-[11px] font-bold text-on-surface truncate w-full">
                      {item.name}
                    </span>
                    <span className="font-price-card text-[13px] text-primary font-bold">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Collection 3 */}
            <div className="rounded-xl bg-surface-container-lowest p-3 sm:p-4 shadow-xs flex flex-col justify-between border border-outline-variant/30">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined text-[20px]">shelves</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Kitchen Organization
                    </h3>
                    <span className="font-body-sm text-[11px] text-outline">Racks &amp; space savers</span>
                  </div>
                </div>
                <a href="#organizers" className="text-primary font-label-badge text-label-badge font-bold">
                  View All
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PRODUCTS.slice(5, 8).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => router.push(`/product/${item.id}`)}
                    className="p-1.5 rounded-lg bg-surface-container-low flex flex-col items-center text-center cursor-pointer hover:bg-surface-container transition-colors"
                  >
                    <div className="w-full aspect-square rounded bg-surface-container overflow-hidden mb-1 relative">
                      <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />
                    </div>
                    <span className="font-body-sm text-[11px] font-bold text-on-surface truncate w-full">
                      {item.name}
                    </span>
                    <span className="font-price-card text-[13px] text-primary font-bold">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
