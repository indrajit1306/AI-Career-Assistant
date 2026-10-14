import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { User, Mail, Eye, EyeOff, Sparkles, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

interface AuthSliderProps {
  initialMode?: 'signin' | 'signup';
}

export const AuthSlider: React.FC<AuthSliderProps> = ({ initialMode = 'signin' }) => {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states - Sign In
  const [signInIdentifier, setSignInIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Form states - Sign Up
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const { login, register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  // Synchronize mode if props or URL changes
  useEffect(() => {
    setIsSignUp(initialMode === 'signup');
  }, [initialMode]);

  // Handle URL change without re-rendering the whole page
  const handleToggle = (signup: boolean) => {
    setIsSignUp(signup);
    const targetUrl = signup ? '/register' : '/login';
    window.history.pushState(null, '', targetUrl);
  };

  // Listen to popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      const isRegisterPath = window.location.pathname.includes('register');
      setIsSignUp(isRegisterPath);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Demo account quick fill
  const handleQuickDemoFill = (type: 'signin' | 'signup') => {
    if (type === 'signin') {
      setSignInIdentifier('sarah.miller@example.com');
      setSignInPassword('SecurePass123!');
      addToast('Demo credentials filled for Sign In!', 'info');
    } else {
      setSignUpName('Sarah Miller');
      setSignUpEmail('sarah.miller@example.com');
      setSignUpPassword('SecurePass123!');
      addToast('Demo credentials filled for Create Account!', 'info');
    }
  };

  // Sign In submit handler
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInIdentifier || !signInPassword) {
      addToast('Please enter your username/email and password', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(signInIdentifier);
      addToast('Welcome back! Logging you in...', 'success');
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error('Sign in failed:', err);
      addToast('Sign in failed. Please check your credentials.', 'error');
      setIsSubmitting(false);
    }
  };

  // Sign Up submit handler
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword) {
      addToast('Please fill out all registration fields', 'error');
      return;
    }

    if (signUpPassword.length < 8) {
      addToast('Password must be at least 8 characters long', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(signUpName, signUpEmail);
      addToast('Account created successfully! Welcome to AI Career Assistant.', 'success');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Registration failed:', err);
      addToast('Registration failed. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_50%_35%,#0d2e1f_0%,#061a10_55%,#020b06_100%)] flex flex-col items-center justify-center p-4 sm:p-6 text-stone-100 relative overflow-hidden select-none">
      {/* Background atmospheric ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-700/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Section (matching the exact presentation from the animation video) */}
      <div className="text-center mb-6 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-[11px] font-semibold tracking-wider uppercase mb-2 shadow-sm shadow-amber-950/20">
          <span>COMPONENT</span>
          <span className="opacity-60">•</span>
          <span>01</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
          <span>Login & Signup</span>
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
            Animation
          </span>
        </h1>
      </div>

      {/* Quick Navigation / Demo Bar */}
      <div className="w-full max-w-[940px] flex items-center justify-between mb-3 px-2 z-10 text-xs text-emerald-200/70">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors py-1 px-2.5 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
        <button
          type="button"
          onClick={() => handleQuickDemoFill(isSignUp ? 'signup' : 'signin')}
          className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all text-xs font-medium cursor-pointer"
        >
          <Sparkles size={13} className="text-amber-300" />
          <span>Auto-fill Demo Credentials</span>
        </button>
      </div>

      {/* Main Dual-Panel Animated Card Container */}
      <div 
        className="relative w-full max-w-[940px] h-[600px] min-h-[580px] bg-[#fcfaf7] rounded-[32px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.65),0_0_50px_rgba(16,185,129,0.12)] border border-emerald-900/40 z-10"
      >
        {/* ============================================================ */}
        {/* DESKTOP TWO-SLOT FORMS (Left = Sign In, Right = Create Account) */}
        {/* ============================================================ */}
        <div className="w-full h-full flex relative">
          
          {/* LEFT SLOT: Sign In Form */}
          <div 
            className={`w-full md:w-1/2 h-full flex flex-col justify-center px-10 sm:px-14 py-8 z-10 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isSignUp 
                ? 'opacity-0 -translate-x-10 pointer-events-none' 
                : 'opacity-100 translate-x-0 pointer-events-auto'
            }`}
          >
            <div className="max-w-[340px] w-full mx-auto">
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight font-luxury-sans mb-7">
                Sign In
              </h2>

              <form onSubmit={handleSignInSubmit} className="space-y-5">
                {/* Username or Email Input */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Username or email
                  </label>
                  <div className="relative border-b-2 border-stone-200 focus-within:border-[#0f3422] transition-colors py-1 flex items-center">
                    <input 
                      type="text"
                      value={signInIdentifier}
                      onChange={(e) => setSignInIdentifier(e.target.value)}
                      placeholder="username or email"
                      required
                      className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none pr-7 py-1"
                    />
                    <User size={17} className="text-stone-400 absolute right-1 pointer-events-none" />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Password
                  </label>
                  <div className="relative border-b-2 border-stone-200 focus-within:border-[#0f3422] transition-colors py-1 flex items-center">
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none pr-7 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-stone-400 hover:text-stone-700 focus:outline-none absolute right-1 transition-colors p-0.5 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Keep Signed In & Forgot Password */}
                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <span 
                      onClick={() => setKeepSignedIn(!keepSignedIn)}
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        keepSignedIn 
                          ? 'bg-[#0f3422] border-[#0f3422] text-white' 
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {keepSignedIn && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span className="text-xs text-stone-600 font-medium">Keep me signed in</span>
                  </label>

                  <a 
                    href="#forgot" 
                    onClick={(e) => {
                      e.preventDefault();
                      addToast('Password reset link sent to your email!', 'info');
                    }}
                    className="text-xs text-stone-500 hover:text-[#0f3422] transition-colors font-medium hover:underline underline-offset-2"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 px-6 rounded-full bg-[#0f3422] hover:bg-[#164a31] text-white text-sm font-semibold tracking-wide shadow-md shadow-emerald-950/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              {/* Bottom Switch Link */}
              <div className="mt-8 text-center text-xs text-stone-500">
                <span>New to VERSO? </span>
                <button
                  type="button"
                  onClick={() => handleToggle(true)}
                  className="font-semibold text-stone-900 hover:underline cursor-pointer transition-colors"
                >
                  Create an account
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SLOT: Create Account Form */}
          <div 
            className={`w-full md:w-1/2 h-full flex flex-col justify-center px-10 sm:px-14 py-8 z-10 ml-auto transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isSignUp 
                ? 'opacity-100 translate-x-0 pointer-events-auto' 
                : 'opacity-0 translate-x-10 pointer-events-none'
            }`}
          >
            <div className="max-w-[340px] w-full mx-auto">
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight font-luxury-sans mb-6">
                Create account
              </h2>

              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                {/* Fullname Input */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Fullname
                  </label>
                  <div className="relative border-b-2 border-stone-200 focus-within:border-[#0f3422] transition-colors py-1 flex items-center">
                    <input 
                      type="text"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none pr-7 py-1"
                    />
                    <User size={17} className="text-stone-400 absolute right-1 pointer-events-none" />
                  </div>
                </div>

                {/* Email Address Input */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Email address
                  </label>
                  <div className="relative border-b-2 border-stone-200 focus-within:border-[#0f3422] transition-colors py-1 flex items-center">
                    <input 
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none pr-7 py-1"
                    />
                    <Mail size={17} className="text-stone-400 absolute right-1 pointer-events-none" />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Password
                  </label>
                  <div className="relative border-b-2 border-stone-200 focus-within:border-[#0f3422] transition-colors py-1 flex items-center">
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none pr-7 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-stone-400 hover:text-stone-700 focus:outline-none absolute right-1 transition-colors p-0.5 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Use 8 characters or more.
                  </p>
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 px-6 rounded-full bg-[#0f3422] hover:bg-[#164a31] text-white text-sm font-semibold tracking-wide shadow-md shadow-emerald-950/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <span>Create account</span>
                  )}
                </button>
              </form>

              {/* Bottom Switch Link */}
              <div className="mt-7 text-center text-xs text-stone-500">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => handleToggle(false)}
                  className="font-semibold text-stone-900 hover:underline cursor-pointer transition-colors"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SLIDING DECORATIVE OVERLAY PANEL (DESKTOP)                   */}
        {/* ============================================================ */}
        <div 
          className={`hidden md:block absolute top-0 bottom-0 left-0 w-1/2 h-full z-20 transition-transform duration-750 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isSignUp ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* SVG CURVE (LEFT EDGE) - Visible when overlay is on the right (Sign In mode) */}
          <svg 
            className={`absolute top-0 bottom-0 -left-[54px] w-[55px] h-full pointer-events-none z-30 luxury-curve-shadow-left transition-opacity duration-400 ${
              isSignUp ? 'opacity-0' : 'opacity-100'
            }`}
            viewBox="0 0 100 600" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="overlayGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#103b27" />
                <stop offset="50%" stopColor="#092618" />
                <stop offset="100%" stopColor="#04160c" />
              </linearGradient>
              <linearGradient id="curveGlowLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* The sweeping organic wave path extending to the left */}
            <path 
              d="M 100,0 C 65,80 18,170 8,290 C -2,410 50,510 100,600 L 100,0 Z" 
              fill="url(#overlayGradLeft)" 
            />
            {/* Subtle luminous highlight edge */}
            <path 
              d="M 100,0 C 65,80 18,170 8,290 C -2,410 50,510 100,600" 
              fill="none"
              stroke="url(#curveGlowLeft)"
              strokeWidth="2.5"
              opacity="0.35"
            />
          </svg>

          {/* SVG CURVE (RIGHT EDGE) - Visible when overlay is on the left (Sign Up mode) */}
          <svg 
            className={`absolute top-0 bottom-0 -right-[54px] w-[55px] h-full pointer-events-none z-30 luxury-curve-shadow-right transition-opacity duration-400 ${
              isSignUp ? 'opacity-100' : 'opacity-0'
            }`}
            viewBox="0 0 100 600" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="overlayGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#103b27" />
                <stop offset="50%" stopColor="#092618" />
                <stop offset="100%" stopColor="#04160c" />
              </linearGradient>
              <linearGradient id="curveGlowRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* The sweeping organic wave path extending to the right */}
            <path 
              d="M 0,0 C 35,80 82,170 92,290 C 102,410 50,510 0,600 L 0,0 Z" 
              fill="url(#overlayGradRight)" 
            />
            {/* Subtle luminous highlight edge */}
            <path 
              d="M 0,0 C 35,80 82,170 92,290 C 102,410 50,510 0,600" 
              fill="none"
              stroke="url(#curveGlowRight)"
              strokeWidth="2.5"
              opacity="0.35"
            />
          </svg>

          {/* The Rich Forest Green Showcase Body */}
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#103b27] via-[#092618] to-[#04160c] p-12 sm:p-14 flex flex-col justify-center text-left">
            {/* Ambient emerald lights inside panel */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

            {/* Subtle decorative curved ambient lines in background */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-5 pointer-events-none stroke-emerald-200" 
              viewBox="0 0 400 600" 
              fill="none"
            >
              <path d="M -100,100 C 100,200 300,50 500,300" strokeWidth="2" />
              <path d="M -50,300 C 150,400 250,250 450,500" strokeWidth="2" />
            </svg>

            {/* CONTENT BLOCK 1: Welcome back (Sign In Mode) */}
            <div 
              className={`relative z-10 transition-all duration-500 ${
                isSignUp 
                  ? 'opacity-0 -translate-y-6 pointer-events-none absolute' 
                  : 'opacity-100 translate-y-0 relative delay-150'
              }`}
            >
              <span className="tracking-[0.3em] text-[11px] font-semibold text-emerald-300/80 uppercase mb-3.5 block">
                VERSO
              </span>
              <h3 className="font-luxury-serif italic text-4xl sm:text-[46px] text-emerald-50 leading-[1.12] mb-4 font-normal tracking-tight">
                Welcome back.
              </h3>
              <p className="text-emerald-100/75 text-sm leading-relaxed max-w-[280px] font-light">
                Your boards, your drafts and your pens are exactly where you left them.
              </p>
            </div>

            {/* CONTENT BLOCK 2: Start the first page (Sign Up Mode) */}
            <div 
              className={`relative z-10 transition-all duration-500 ${
                isSignUp 
                  ? 'opacity-100 translate-y-0 relative delay-150' 
                  : 'opacity-0 translate-y-6 pointer-events-none absolute'
              }`}
            >
              <span className="tracking-[0.3em] text-[11px] font-semibold text-emerald-300/80 uppercase mb-3.5 block">
                VERSO
              </span>
              <h3 className="font-luxury-serif italic text-4xl sm:text-[46px] text-emerald-50 leading-[1.12] mb-4 font-normal tracking-tight">
                Start the first page.
              </h3>
              <p className="text-emerald-100/75 text-sm leading-relaxed max-w-[280px] font-light">
                One account for every board, every draft and every device you own.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE FALLBACK BANNER (<md screens only)                    */}
        {/* ============================================================ */}
        <div className="md:hidden w-full bg-gradient-to-r from-[#103b27] to-[#04160c] py-4 px-6 text-center border-b border-emerald-900/30">
          <span className="tracking-[0.25em] text-[10px] font-semibold text-emerald-300/80 uppercase block mb-1">
            VERSO
          </span>
          <h3 className="font-luxury-serif italic text-2xl text-emerald-50">
            {isSignUp ? 'Start the first page.' : 'Welcome back.'}
          </h3>
        </div>
      </div>

      {/* Footer Branding Note */}
      <div className="mt-6 text-center text-xs text-emerald-200/50 flex items-center justify-center gap-2">
        <span>AI Career Assistant</span>
        <span>•</span>
        <span>Verso Design System</span>
      </div>
    </div>
  );
};
