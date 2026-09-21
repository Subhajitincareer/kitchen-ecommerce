'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { CartDrawer } from '@/components/CartDrawer';
import { ToastNotification } from '@/components/ToastNotification';
import { CartProvider } from '@/context/CartContext';

export function GlobalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth';

  return (
    <CartProvider>
      <ToastNotification />
      {!isAuthPage && <Header />}
      {!isAuthPage && <CartDrawer />}
      <main className={isAuthPage ? 'w-full flex-1' : 'flex-1 w-full pt-[184px] md:pt-[144px] pb-16 md:pb-0'}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <MobileBottomNav />}
    </CartProvider>
  );
}
