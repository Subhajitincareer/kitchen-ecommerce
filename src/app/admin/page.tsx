'use client';

import React, { useState } from 'react';
import Head from 'next/head';

export default function AdminLogin() {
  const [email, setEmail] = useState('vikram.mehta@kitchora.com');
  const [password, setPassword] = useState('••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate success or handle login logic here
    }, 1200);
  };

  return (
    <div className="min-h-[100dvh] bg-[#f8f9fc] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Head>
        <title>Admin Login | Kitchora Operations</title>
      </Head>

      <div className="w-full max-w-[480px]">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
          
          {/* Top Gradient Border */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#c2410c] via-[#ea580c] to-[#10b981]"></div>
          
          <div className="px-8 py-10">
            {/* Logo and Badges */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[20px]">soup_kitchen</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-primary leading-none">
                    KITCHORA
                  </span>
                  <span className="text-[7px] leading-tight text-secondary font-bold tracking-widest uppercase">
                    Smart Tools. Better Kitchens.
                  </span>
                </div>
              </div>
              
              <div className="bg-[#e6f4ea] text-[#137333] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#137333]"></div>
                Internal Operations Console
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to Admin</h2>
              <p className="text-sm text-gray-500 text-center max-w-sm leading-relaxed">
                Manage your Kitchora catalog, orders, inventory, and fulfillment from one place.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide">
                    Work Email Address
                  </label>
                  <span className="text-[10px] text-[#137333] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">security</span>
                    Enterprise SSO
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 text-[18px]">mail</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#c2410c] focus:border-[#c2410c] bg-white transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[#137333] text-[18px]">check_circle</span>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide">
                    Password
                  </label>
                  <span className="text-[10px] text-gray-500">
                    Min. 14 chars with FIDO key
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 text-[18px]">lock</span>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-[#c2410c] focus:border-[#c2410c] bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-[#c2410c] focus:ring-[#c2410c] border-gray-300 rounded cursor-pointer accent-[#c2410c]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-[11px] font-medium text-gray-700 cursor-pointer">
                    Remember workstation (30 days)
                  </label>
                </div>
                <div className="text-[11px]">
                  <a href="#" className="text-[#c2410c] hover:text-[#9a3412] font-medium transition-colors">
                    Forgot administrative password?
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#c2410c] hover:bg-[#a3360a] focus:outline-none transition-colors"
                >
                  {isLoading ? (
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                  ) : (
                    <>
                      Sign In to Operations Console
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg text-[13px] font-semibold text-[#334155] bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">vpn_key</span>
                  Authenticate with Hardware Security Key (FIDO2)
                </button>
              </div>
            </form>
          </div>

          {/* Security Info Footer */}
          <div className="bg-[#f8fafc] border-t border-gray-100 px-8 py-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Authorized Kitchora Staff &amp; Operations Personnel Only
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#137333]">verified_user</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-medium text-gray-500">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                256-Bit SSL Encrypted
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">badge</span>
                Role-Based RBAC
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">history</span>
                Audited: 49.36.12.108
              </div>
            </div>
          </div>
        </div>

        {/* System Info Bottom */}
        <div className="mt-8 flex items-center justify-between text-[11px] text-gray-400 px-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
            <div className="flex flex-col">
              <span>Kitchora Commerce OS</span>
              <span className="font-bold text-gray-500 text-center">v2.4.1</span>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <span>Server Region: <span className="font-bold text-gray-500">ap-south-1</span></span>
            <span className="font-bold text-gray-500">(Mumbai)</span>
          </div>
          <div className="flex flex-col text-right">
            <span>Support:</span>
            <a href="mailto:devops@kitchora.com" className="text-[#c2410c] hover:underline font-medium">
              devops@kitchora.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
