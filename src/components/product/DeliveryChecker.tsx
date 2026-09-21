'use client';

import React, { useState } from 'react';

export default function DeliveryChecker() {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');

  const checkPin = () => {
    if (pin.length !== 6) return;
    setStatus('checking');
    setTimeout(() => {
      // Mock validation
      if (pin.startsWith('1') || pin.startsWith('4') || pin.startsWith('5')) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 800);
  };

  return (
    <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/50 space-y-4">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">local_shipping</span>
        <h3 className="font-bold text-on-surface">Delivery & Services</h3>
      </div>
      <div className="relative">
        <input
          type="text"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, '').slice(0, 6));
            if (status !== 'idle') setStatus('idle');
          }}
          placeholder="Enter 6-digit PIN Code"
          className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-4 pr-24 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium"
          maxLength={6}
        />
        <button
          onClick={checkPin}
          disabled={pin.length !== 6 || status === 'checking'}
          className={`absolute right-2 top-2 bottom-2 px-4 rounded-lg font-bold text-sm transition-all ${
            pin.length === 6 && status !== 'checking'
              ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
              : 'text-outline bg-transparent cursor-not-allowed'
          }`}
        >
          {status === 'checking' ? '...' : 'Check'}
        </button>
      </div>
      
      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex gap-2 items-start text-sm bg-[#10B981]/10 text-[#047857] p-3 rounded-lg border border-[#10B981]/20">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <div>
            <p className="font-bold">Delivery Available</p>
            <p>Get it by Tomorrow, 10 PM. Free shipping applied.</p>
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex gap-2 items-start text-sm bg-error/10 text-error p-3 rounded-lg border border-error/20">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <div>
            <p className="font-bold">Currently Unavailable</p>
            <p>We do not deliver to this PIN code yet.</p>
          </div>
        </div>
      )}
      
      {/* Assurances */}
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-outline-variant/50">
        <div className="flex gap-2 items-center text-xs font-medium text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-[#10B981]">verified</span>
          1 Year Warranty
        </div>
        <div className="flex gap-2 items-center text-xs font-medium text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-primary">currency_rupee</span>
          Cash on Delivery
        </div>
        <div className="flex gap-2 items-center text-xs font-medium text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-secondary">sync</span>
          7 Days Return
        </div>
      </div>
    </div>
  );
}
