'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[120] bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-xl shadow-xl font-label-md text-label-md font-semibold flex items-center gap-2 animate-bounce">
      <span className="material-symbols-outlined text-secondary-container text-[18px]">info</span>
      <span>{toastMessage}</span>
    </div>
  );
};
