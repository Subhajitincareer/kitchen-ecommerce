'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type AuthState = 'login' | 'register' | 'otp' | 'forgot' | 'success';

export default function AuthClientWrapper() {
  const [view, setView] = useState<AuthState>('login');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [globalError, setGlobalError] = useState<{ message: string, isError: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle OTP Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (view === 'otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [view, otpTimer]);

  const switchState = (newState: AuthState) => {
    setGlobalError(null);
    setView(newState);
    if (newState === 'otp') {
      setOtpTimer(30);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      switchState('success');
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchState('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      switchState('success');
    }, 850);
  };

  const checkPasswordStrength = (val: string) => {
    const hasLen = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasNumOrSpec = /[0-9!@#$%^&*(),.?":{}|<>]/.test(val);

    let score = 0;
    if (hasLen) score++;
    if (hasUpper && hasLower) score++;
    if (hasNumOrSpec) score++;

    return { hasLen, hasUpper, hasLower, hasNumOrSpec, score, val };
  };

  const pwData = checkPasswordStrength(password);

  const getPasswordStrengthLabel = () => {
    if (pwData.val.length === 0) return { label: 'Too Short', color: 'text-outline', bars: 0 };
    if (pwData.score <= 1) return { label: 'Weak', color: 'text-error', bars: 1 };
    if (pwData.score === 2) return { label: 'Medium', color: 'text-primary', bars: 2 };
    return { label: 'Strong', color: 'text-secondary', bars: 3 };
  };

  const pwStrength = getPasswordStrengthLabel();

  // Desktop Left Banner Content
  const getBannerContent = () => {
    if (view === 'register') {
      return { title: 'Start Cooking Smarter', sub: 'Join over 200,000 home chefs across India. Unlock member-exclusive pricing on heavy cast iron & tri-ply cookware.' };
    }
    if (view === 'otp') {
      return { title: 'Guaranteed Security', sub: 'Your safety is our recipe. We ensure two-factor cryptographic protection for all orders and transaction logs.' };
    }
    if (view === 'forgot') {
      return { title: 'Easy Recovery', sub: 'Don’t worry! Your recipes, order trackings, and delivery addresses are intact and waiting for your return.' };
    }
    return { title: 'Welcome Back', sub: 'Your culinary essentials are just a step away. Discover practical cookware, airtight storage, and precision prep tools crafted for everyday Indian homes.' };
  };

  const banner = getBannerContent();

  return (
    <div className="flex flex-col w-full items-center justify-center py-space-md md:py-space-lg px-gutter-mobile md:px-margin min-h-[calc(100vh-160px)]">
      
      {/* Global Toast (Mobile mostly) */}
      {globalError && (
        <div className={`mb-space-md p-space-sm rounded-xl text-body-sm font-body-sm flex items-center gap-space-sm shadow-sm w-full max-w-[1180px] ${globalError.isError ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'}`}>
          <span className="material-symbols-outlined text-[20px]">{globalError.isError ? 'warning' : 'check_circle'}</span>
          <span>{globalError.message}</span>
          <button className="ml-auto opacity-75 hover:opacity-100" onClick={() => setGlobalError(null)}>
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      <div className="w-full max-w-[1180px] bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* LEFT SIDE: Lifestyle Visual & Trust Panel (Desktop Only) */}
        <div className="hidden lg:flex relative w-5/12 bg-cover bg-center p-space-xl flex-col justify-between overflow-hidden" style={{ backgroundImage: "url('/images/hero-kitchen.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-inverse-surface/80 via-primary/60 to-inverse-surface/90 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 flex flex-col gap-space-sm">
            <div className="inline-flex items-center gap-space-sm bg-surface-container-lowest/15 backdrop-blur-md px-3 py-1.5 rounded-full w-fit">
              <span className="font-headline-sm font-bold text-surface">KITCHORA</span>
              <span className="font-label-badge text-label-badge text-surface tracking-wider uppercase font-semibold">Authentic Kitchenware</span>
            </div>
            <div className="mt-space-md">
              <h2 className="font-headline-lg text-headline-lg text-surface tracking-tight">{banner.title}</h2>
              <p className="font-body-md text-body-md text-surface-container-high mt-1 text-opacity-90 leading-relaxed">{banner.sub}</p>
            </div>
          </div>

          <div className="relative z-10 my-space-md space-y-space-sm">
            <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-lowest/10 backdrop-blur-md">
              <div className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-surface text-[18px]">restaurant</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-surface font-semibold">Easy Everyday Cooking</h4>
                <p className="font-body-sm text-body-sm text-surface-container-high text-opacity-80">Curated tools tested for tadkas, rotis &amp; Indian meal preps.</p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-lowest/10 backdrop-blur-md">
              <div className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-surface text-[18px]">verified_user</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-surface font-semibold">100% Secure Checkout</h4>
                <p className="font-body-sm text-body-sm text-surface-container-high text-opacity-80">256-Bit SSL, instant UPI, RuPay, Visa &amp; NetBanking.</p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-lowest/10 backdrop-blur-md">
              <div className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-surface text-[18px]">local_shipping</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-surface font-semibold">Express Pan-India Delivery</h4>
                <p className="font-body-sm text-body-sm text-surface-container-high text-opacity-80">48-Hour dispatch across 19,000+ serviceable pin codes.</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 p-space-sm bg-surface-container-lowest/15 backdrop-blur-md rounded-xl">
            <div className="flex items-center gap-1 text-secondary-fixed mb-1">
              {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-[16px] [font-variation-settings:'FILL'1]">star</span>)}
              <span className="font-label-badge text-label-badge text-surface ml-1 font-bold">5.0</span>
            </div>
            <p className="font-body-sm text-body-sm text-surface italic leading-snug">
              “Kitchora’s push chopper and tri-ply tadka pan cut my daily cooking prep in half! Indispensable in my morning routine.”
            </p>
            <span className="block mt-1 font-label-md text-label-md text-surface-container-high font-semibold tracking-wide">
              — Ananya S., Bengaluru
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: Auth Container */}
        <div className="w-full lg:w-7/12 p-space-md sm:p-space-lg lg:p-space-xl flex flex-col justify-center min-h-[600px]">
          
          {/* Mobile Flow Switcher */}
          <div className="lg:hidden mb-space-md flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
            <button onClick={() => switchState('login')} className={`px-3 py-1.5 rounded-full font-label-badge text-label-badge whitespace-nowrap transition-colors ${view === 'login' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container-high text-on-surface-variant'}`}>Sign In</button>
            <button onClick={() => switchState('register')} className={`px-3 py-1.5 rounded-full font-label-badge text-label-badge whitespace-nowrap transition-colors ${view === 'register' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container-high text-on-surface-variant'}`}>Create Account</button>
            <button onClick={() => switchState('otp')} className={`px-3 py-1.5 rounded-full font-label-badge text-label-badge whitespace-nowrap transition-colors ${view === 'otp' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container-high text-on-surface-variant'}`}>OTP Verify</button>
          </div>

          {/* Desktop Flow Switcher */}
          <div className="hidden lg:flex mb-space-md items-center justify-between gap-2 p-1.5 bg-surface-container-low rounded-xl">
            <div className="flex items-center gap-1">
              <button onClick={() => switchState('login')} className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all ${view === 'login' ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}>Sign In</button>
              <button onClick={() => switchState('register')} className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all ${view === 'register' ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}>Create Account</button>
              <button onClick={() => switchState('forgot')} className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all ${view === 'forgot' ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}>Forgot Password</button>
            </div>
            <button onClick={() => setGlobalError({ message: 'Demo Error: Invalid credentials.', isError: true })} className="px-2 py-1 rounded bg-error/10 text-error hover:bg-error/20 text-[11px] font-label-badge font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">error</span>
              Demo Error
            </button>
          </div>

          {/* 1. SIGN IN VIEW */}
          {view === 'login' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-space-md">
                <span className="hidden lg:inline-block font-label-badge text-label-badge uppercase tracking-wider text-secondary font-bold mb-1">Kitchora Member Access</span>
                <h1 className="font-headline-lg-mobile lg:font-headline-lg text-on-surface font-bold">Sign in to Kitchora</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Access your saved orders, cooking wishlist, and verified addresses.</p>
              </div>
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">Email or Mobile Number <span className="text-tertiary">*</span></label>
                  <div className="relative flex items-center bg-surface-container-low rounded-xl px-space-md py-2.5 shadow-xs focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_#c2410c] transition-all">
                    <span className="material-symbols-outlined text-outline text-[20px] mr-2">mail</span>
                    <input type="text" required placeholder="name@example.com or 98765 43210" className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface font-semibold">Password <span className="text-tertiary">*</span></label>
                    <button type="button" onClick={() => switchState('forgot')} className="font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors">Forgot Password?</button>
                  </div>
                  <div className="relative flex items-center bg-surface-container-low rounded-xl px-space-md py-2.5 shadow-xs focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_#c2410c] transition-all">
                    <span className="material-symbols-outlined text-outline text-[20px] mr-2">lock</span>
                    <input type={showPassword ? "text" : "password"} required placeholder="Enter your password" className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-1 text-outline hover:text-on-surface">
                      <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>
                <button disabled={isLoading} type="submit" className="w-full h-12 mt-space-xs bg-primary-container hover:bg-primary active:scale-[0.99] text-on-primary font-headline-sm text-headline-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                  {isLoading ? (
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center my-space-sm">
                <div className="flex-grow h-px bg-surface-container-high"></div>
                <span className="px-3 font-label-badge text-label-badge uppercase tracking-wider text-outline">or</span>
                <div className="flex-grow h-px bg-surface-container-high"></div>
              </div>

              <button onClick={() => switchState('success')} type="button" className="w-full h-12 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z" fill="#4285F4"></path>
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24z" fill="#34A853"></path>
                  <path d="M5.28 14.27a7.22 7.22 0 0 1 0-4.54V6.58H1.26a11.97 11.97 0 0 0 0 10.84l4.02-3.15z" fill="#FBBC05"></path>
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
                </svg>
                <span>Continue with Google</span>
              </button>

              <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-space-lg">
                New to Kitchora? 
                <button type="button" onClick={() => switchState('register')} className="text-primary hover:text-primary-container font-bold ml-1 transition-colors">Create an account</button>
              </p>
            </div>
          )}

          {/* 2. REGISTER VIEW */}
          {view === 'register' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-space-md">
                <span className="hidden lg:inline-block font-label-badge text-label-badge uppercase tracking-wider text-secondary font-bold mb-1">First Step to Smart Cooking</span>
                <h1 className="font-headline-lg-mobile lg:font-headline-lg text-on-surface font-bold">Create your account</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Join 200,000+ Indian home cooks saving time and prep energy daily.</p>
              </div>
              <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">Full Name <span className="text-tertiary">*</span></label>
                  <div className="relative flex items-center bg-surface-container-low rounded-xl px-space-md py-2.5 shadow-xs focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_#c2410c]">
                    <span className="material-symbols-outlined text-outline text-[20px] mr-2">person</span>
                    <input type="text" required placeholder="e.g. Radhika Sharma" className="w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">Email Address <span className="text-tertiary">*</span></label>
                  <div className="relative flex items-center bg-surface-container-low rounded-xl px-space-md py-2.5 shadow-xs focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_#c2410c]">
                    <span className="material-symbols-outlined text-outline text-[20px] mr-2">mail</span>
                    <input type="email" required placeholder="radhika@example.com" className="w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">Mobile Number <span className="text-tertiary">*</span></label>
                  <div className="flex items-center gap-2">
                    <div className="h-11 px-3 rounded-xl bg-surface-container flex items-center gap-1 font-label-md text-label-md text-on-surface font-semibold shrink-0">
                      <span>🇮🇳 +91</span>
                    </div>
                    <input type="tel" required pattern="[0-9]{10}" maxLength={10} placeholder="98765 43210" className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#c2410c] outline-none transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface font-semibold">Password <span className="text-tertiary">*</span></label>
                    <div className="relative flex items-center bg-surface-container-low rounded-xl px-3 py-2.5 shadow-xs focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_#c2410c]">
                      <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Min 8 chars" className="w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-none" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-1 text-outline hover:text-on-surface">
                        <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface font-semibold">Confirm Password <span className="text-tertiary">*</span></label>
                    <div className="relative flex items-center bg-surface-container-low rounded-xl px-3 py-2.5 shadow-xs focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_#c2410c]">
                      <input type={showConfirmPassword ? "text" : "password"} required placeholder="Re-type password" className="w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-none" />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="p-1 text-outline hover:text-on-surface">
                        <span className="material-symbols-outlined text-[18px]">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Password Strength:</span>
                    <span className={`font-label-badge text-label-badge uppercase font-bold ${pwStrength.color}`}>{pwStrength.label}</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden flex gap-0.5">
                    <div className={`h-full w-1/3 transition-colors ${pwStrength.bars >= 1 ? (pwStrength.bars === 1 ? 'bg-error' : pwStrength.bars === 2 ? 'bg-primary' : 'bg-secondary') : 'bg-transparent'}`}></div>
                    <div className={`h-full w-1/3 transition-colors ${pwStrength.bars >= 2 ? (pwStrength.bars === 2 ? 'bg-primary' : 'bg-secondary') : 'bg-transparent'}`}></div>
                    <div className={`h-full w-1/3 transition-colors ${pwStrength.bars >= 3 ? 'bg-secondary' : 'bg-transparent'}`}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[11px] font-label-badge text-on-surface-variant pt-1">
                    <span className={`flex items-center gap-1 ${pwData.hasLen ? 'text-secondary font-semibold' : ''}`}><span className="material-symbols-outlined text-[14px]">{pwData.hasLen ? 'check_circle' : 'radio_button_unchecked'}</span>8+ Chars</span>
                    <span className={`flex items-center gap-1 ${pwData.hasUpper ? 'text-secondary font-semibold' : ''}`}><span className="material-symbols-outlined text-[14px]">{pwData.hasUpper ? 'check_circle' : 'radio_button_unchecked'}</span>Uppercase</span>
                    <span className={`flex items-center gap-1 ${pwData.hasLower ? 'text-secondary font-semibold' : ''}`}><span className="material-symbols-outlined text-[14px]">{pwData.hasLower ? 'check_circle' : 'radio_button_unchecked'}</span>Lowercase</span>
                    <span className={`flex items-center gap-1 ${pwData.hasNumOrSpec ? 'text-secondary font-semibold' : ''}`}><span className="material-symbols-outlined text-[14px]">{pwData.hasNumOrSpec ? 'check_circle' : 'radio_button_unchecked'}</span>Number/Symbol</span>
                  </div>
                </div>

                <button type="submit" className="w-full h-12 bg-primary-container hover:bg-primary active:scale-[0.99] text-on-primary font-headline-sm text-headline-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                  <span>Create Account &amp; Verify</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </form>
              <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-space-md">
                Already have an account? 
                <button type="button" onClick={() => switchState('login')} className="text-primary hover:text-primary-container font-bold ml-1 transition-colors">Sign In</button>
              </p>
            </div>
          )}

          {/* 3. OTP VIEW */}
          {view === 'otp' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col h-full justify-center lg:justify-start">
              <div className="text-center mb-space-lg">
                <div className="w-14 h-14 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center mx-auto mb-space-sm">
                  <span className="material-symbols-outlined text-[28px]">phonelink_ring</span>
                </div>
                <h1 className="font-headline-lg-mobile lg:font-headline-lg text-on-surface font-bold">Verify Mobile</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                  We sent a 6-digit code via SMS to <br/>
                  <span className="font-bold text-on-surface">+91 98765 43210</span>
                </p>
                <button type="button" onClick={() => switchState('register')} className="inline-block mt-2 font-label-md text-label-md text-primary hover:underline">Change number</button>
              </div>

              <form onSubmit={handleOtpSubmit} className="flex flex-col gap-space-lg max-w-sm mx-auto w-full">
                <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                  {[1,2,3,4,5,6].map((i) => (
                    <input key={i} type="text" inputMode="numeric" maxLength={1} required className="w-10 sm:w-12 h-12 text-center font-headline-md text-headline-md rounded-xl bg-surface-container-low text-on-surface focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#c2410c] focus:outline-none transition-all" />
                  ))}
                </div>

                <div className="flex items-center justify-between text-body-sm font-body-sm px-1">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    Resend in {otpTimer < 10 ? `00:0${otpTimer}` : `00:${otpTimer}`}
                  </span>
                  <button type="button" disabled={otpTimer > 0} onClick={() => setOtpTimer(30)} className={`font-label-md text-label-md font-semibold ${otpTimer > 0 ? 'text-outline cursor-not-allowed' : 'text-primary hover:underline'}`}>Resend Code</button>
                </div>

                <button disabled={isLoading} type="submit" className="w-full h-12 bg-primary-container hover:bg-primary active:scale-[0.99] text-on-primary font-headline-sm text-headline-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                  {isLoading ? (
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  ) : (
                    <>
                      <span>Verify &amp; Continue</span>
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* 4. FORGOT VIEW */}
          {view === 'forgot' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-space-md">
                <button onClick={() => switchState('login')} className="inline-flex items-center gap-1 font-label-badge text-label-badge text-on-surface-variant hover:text-primary mb-2 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Back to sign in</span>
                </button>
                <h1 className="font-headline-lg-mobile lg:font-headline-lg text-on-surface font-bold">Reset Password</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Enter your registered email or phone to receive a quick reset token.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setGlobalError({ message: 'Recovery link sent! Check your inbox/SMS.', isError: false }); }} className="flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface font-medium">Registered Identifier <span className="text-tertiary">*</span></label>
                  <div className="relative flex items-center bg-surface-container-low rounded-xl px-space-md py-2.5 shadow-xs focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_#c2410c]">
                    <span className="material-symbols-outlined text-outline text-[20px] mr-2">alternate_email</span>
                    <input type="text" required placeholder="Mobile number or email" className="w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-none" />
                  </div>
                </div>
                <button type="submit" className="w-full h-12 bg-primary-container hover:bg-primary active:scale-[0.99] text-on-primary font-headline-sm text-headline-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                  <span>Send Recovery Link</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            </div>
          )}

          {/* 5. SUCCESS VIEW */}
          {view === 'success' && (
            <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center space-y-space-md py-space-md lg:py-space-xl">
              <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center text-secondary shadow-lg animate-bounce">
                <span className="material-symbols-outlined text-[40px] [font-variation-settings:'FILL'1]">task_alt</span>
              </div>
              <div>
                <span className="font-label-badge text-label-badge uppercase tracking-wider text-secondary font-bold">Action Completed</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold mt-2">Welcome to Kitchora!</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto mt-2">
                  Your credentials have been securely verified. Redirecting you to your curated kitchen feed...
                </p>
              </div>
              <button onClick={() => router.push('/')} type="button" className="w-full max-w-xs h-12 mt-space-md bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all">
                <span>Go to Home</span>
                <span className="material-symbols-outlined text-[18px]">home</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
