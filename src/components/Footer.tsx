'use client';

import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface-container-low mt-space-xl pb-20 md:pb-0">
      {/* Back to Top */}
      <div className="w-full bg-surface-container-high py-space-sm text-center">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">keyboard_arrow_up</span>
          <span>Back to top</span>
        </button>
      </div>

      {/* Sitemap Grid */}
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg md:gap-space-xl">
          {/* Column 1: SHOP */}
          <div className="flex flex-col gap-space-xs">
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">SHOP</h4>
            <a href="#tools" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Kitchen Tools
            </a>
            <a href="#cookware" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Cookware
            </a>
            <a href="#storage" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Storage &amp; Jars
            </a>
            <a href="#baking" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Baking &amp; Moulds
            </a>
            <a href="#cleaning" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Cleaning &amp; Racks
            </a>
            <a href="#organizers" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Kitchen Organizers
            </a>
          </div>

          {/* Column 2: CUSTOMER SERVICE */}
          <div className="flex flex-col gap-space-xs">
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">CUSTOMER SERVICE</h4>
            <a href="#contact" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Contact Us
            </a>
            <a href="#orders" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Track Order
            </a>
            <a href="#shipping" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Shipping Info
            </a>
            <a href="#returns" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Returns &amp; Refunds
            </a>
            <a href="#faqs" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              FAQs
            </a>
          </div>

          {/* Column 3: ABOUT KITCHORA */}
          <div className="flex flex-col gap-space-xs">
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">ABOUT KITCHORA</h4>
            <a href="#about" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              About Us
            </a>
            <a href="#careers" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Careers
            </a>
            <a href="#privacy" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>

          {/* Column 4: CONNECT WITH US */}
          <div className="flex flex-col gap-space-xs">
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">CONNECT WITH US</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Join 200,000+ Indian home makers discovering daily culinary efficiency hacks.
            </p>
            <div className="flex items-center gap-space-sm pt-1">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all"
                title="Share"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all"
                title="YouTube"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all"
                title="Instagram"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
            </div>
            <div className="mt-space-xs pt-space-xs flex flex-col gap-1">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase">
                WhatsApp Support
              </span>
              <span className="font-label-md text-label-md text-on-surface font-bold">
                support@kitchora.com | 1800-209-4444
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip Bar */}
      <div className="w-full bg-surface-container py-space-md">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin grid grid-cols-2 md:grid-cols-4 gap-space-md text-center">
          <div className="flex items-center justify-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
            <span className="font-label-md text-label-md text-on-surface font-bold">100% Food Grade</span>
          </div>
          <div className="flex items-center justify-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[22px]">lock</span>
            <span className="font-label-md text-label-md text-on-surface font-bold">Secure Payments</span>
          </div>
          <div className="flex items-center justify-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[22px]">replay</span>
            <span className="font-label-md text-label-md text-on-surface font-bold">7-Day Doorstep Returns</span>
          </div>
          <div className="flex items-center justify-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[22px]">local_shipping</span>
            <span className="font-label-md text-label-md text-on-surface font-bold">Pan-India Express</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full bg-surface-container-high py-space-md">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
          <div>© 2026 Kitchora India Technologies Pvt Ltd. All rights reserved.</div>
          <div className="flex items-center gap-space-md">
            <a href="#privacy" className="hover:text-on-surface transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-on-surface transition-colors">Terms of Use</a>
            <span>•</span>
            <a href="#security" className="hover:text-on-surface transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
