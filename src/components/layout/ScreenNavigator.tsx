import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  X, 
  Search, 
  Home, 
  LogIn, 
  UserPlus, 
  LayoutDashboard, 
  Bot, 
  FileText, 
  Briefcase, 
  CheckCircle2, 
  Mic, 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../hooks/useSettings';
import { useToast } from '../../contexts/ToastContext';

interface ScreenItem {
  id: string;
  name: string;
  path: string;
  category: 'public' | 'workspace';
  icon: React.ReactNode;
  description: string;
  badge?: string;
}

export const ScreenNavigator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [side, setSide] = useState<'right' | 'left'>(() => {
    return (localStorage.getItem('screen_navigator_side') as 'right' | 'left') || 'right';
  });
  const [position, setPosition] = useState<'center' | 'top' | 'bottom'>(() => {
    return (localStorage.getItem('screen_navigator_pos') as any) || 'center';
  });

  const handleSetSide = (newSide: 'right' | 'left') => {
    setSide(newSide);
    localStorage.setItem('screen_navigator_side', newSide);
  };

  const handleSetPosition = (newPos: 'center' | 'top' | 'bottom') => {
    setPosition(newPos);
    localStorage.setItem('screen_navigator_pos', newPos);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, login, logout } = useAuth();
  const { settings, updateSetting } = useSettings();
  const { addToast } = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const screens: ScreenItem[] = useMemo(() => [
    {
      id: 'landing',
      name: 'Landing Page',
      path: '/',
      category: 'public',
      icon: <Home size={18} />,
      description: 'Public hero page with features and value proposition',
    },
    {
      id: 'login',
      name: 'Sign In',
      path: '/login',
      category: 'public',
      icon: <LogIn size={18} />,
      description: 'Authentication screen with login form',
    },
    {
      id: 'register',
      name: 'Register',
      path: '/register',
      category: 'public',
      icon: <UserPlus size={18} />,
      description: 'New user registration & onboarding',
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/dashboard',
      category: 'workspace',
      icon: <LayoutDashboard size={18} />,
      description: 'Career readiness overview, stats, and quick actions',
      badge: 'Protected',
    },
    {
      id: 'assistant',
      name: 'AI Assistant',
      path: '/assistant',
      category: 'workspace',
      icon: <Bot size={18} />,
      description: 'Interactive AI career coach & guidance chat',
      badge: 'Protected',
    },
    {
      id: 'resume',
      name: 'Resume Builder',
      path: '/resume',
      category: 'workspace',
      icon: <FileText size={18} />,
      description: 'Workspace editor, ATS optimization & live preview',
      badge: 'Protected',
    },
    {
      id: 'jobs',
      name: 'Job Analyzer',
      path: '/jobs',
      category: 'workspace',
      icon: <Briefcase size={18} />,
      description: 'Job description parser, breakdown & gap analysis',
      badge: 'Protected',
    },
    {
      id: 'ats',
      name: 'ATS Check',
      path: '/ats',
      category: 'workspace',
      icon: <CheckCircle2 size={18} />,
      description: 'Compatibility scoring, keyword comparison & insights',
      badge: 'Protected',
    },
    {
      id: 'interview',
      name: 'Interview Prep',
      path: '/interview',
      category: 'workspace',
      icon: <Mic size={18} />,
      description: 'AI mock interview simulation, answers & feedback',
      badge: 'Protected',
    },
    {
      id: 'settings',
      name: 'Settings',
      path: '/settings',
      category: 'workspace',
      icon: <SettingsIcon size={18} />,
      description: 'Theme customization, AI preferences & data management',
      badge: 'Protected',
    },
  ], []);

  // Keyboard shortcut: Alt + S to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredScreens = useMemo(() => {
    if (!searchQuery.trim()) return screens;
    const q = searchQuery.toLowerCase();
    return screens.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.path.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q)
    );
  }, [screens, searchQuery]);

  const handleNavigate = async (screen: ScreenItem) => {
    if (screen.category === 'workspace' && !isAuthenticated) {
      // Auto login as demo user for testing convenience
      await login('tester@example.com', 'Demo Tester');
      addToast('Auto-authenticated as Demo Tester to access protected screen', 'info');
    }

    navigate(screen.path);
    setIsOpen(false);
  };

  const handleToggleTheme = () => {
    const nextTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSetting('theme', nextTheme);
    addToast(`Switched to ${nextTheme} mode`, 'info');
  };

  const handleToggleAuth = async () => {
    if (isAuthenticated) {
      logout();
      addToast('Logged out of demo session', 'info');
    } else {
      await login('tester@example.com', 'Demo Tester');
      addToast('Logged in as Demo Tester', 'success');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to default?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Position classes
  const positionClasses = {
    top: 'top-24',
    center: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-20',
  };

  const isRight = side === 'right';

  return (
    <>
      {/* Floating Trigger Button on the Edge */}
      <div 
        className={`fixed ${isRight ? 'right-0' : 'left-0'} ${positionClasses[position]} z-[9990] transition-all duration-300`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 ${
            isRight 
              ? 'pl-3.5 pr-3 rounded-l-2xl border-y border-l hover:pr-4' 
              : 'pl-3 pr-3.5 rounded-r-2xl border-y border-r hover:pl-4'
          } py-2.5 bg-brand-900/95 dark:bg-brand-950/95 text-white border-emerald-500/50 shadow-[0_6px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.55)] transition-all duration-200 cursor-pointer select-none group backdrop-blur-md`}
          title="Open Screen Switcher (Alt + S)"
          aria-label="Open Screen Switcher"
        >
          <div className="relative">
            <LayoutGrid size={18} className="text-emerald-300 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-100 hidden sm:inline-block">
            Screens
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold border border-emerald-500/30">
            {screens.length}
          </span>
        </button>
      </div>

      {/* Screen Switcher Flyout Modal */}
      {isOpen && (
        <div className={`fixed inset-0 z-[9999] flex items-center ${isRight ? 'justify-end' : 'justify-start'} p-3 sm:p-6 overflow-hidden`}>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <div className={`relative z-10 w-full max-w-[420px] max-h-[92vh] bg-surface border border-border-base dark:border-brand-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in ${isRight ? 'slide-in-from-right' : 'slide-in-from-left'} duration-200`}>
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-border-base flex items-center justify-between bg-surface-elevated/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-500">
                  <LayoutGrid size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-text-primary tracking-tight">Screen Navigator</h2>
                    <span className="text-[10px] font-semibold tracking-wider uppercase bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                      Testing
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">Jump instantly to any application screen</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
                aria-label="Close Navigator"
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Testing Bar (Theme & Auth quick toggles) */}
            <div className="px-4 py-2.5 bg-surface-elevated/30 border-b border-border-base flex items-center justify-between text-xs">
              {/* Auth state toggle */}
              <button
                onClick={handleToggleAuth}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer border ${
                  isAuthenticated
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20'
                }`}
                title="Click to toggle authenticated/guest mode"
              >
                {isAuthenticated ? <ShieldCheck size={13} /> : <ShieldAlert size={13} />}
                <span>{isAuthenticated ? (user?.name || 'Logged In') : 'Guest Mode'}</span>
                <span className="text-[10px] opacity-60 underline">switch</span>
              </button>

              <div className="flex items-center gap-2">
                {/* Theme toggle */}
                <button
                  onClick={handleToggleTheme}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface hover:bg-surface-elevated border border-border-base text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  title="Toggle Light / Dark mode"
                >
                  {settings.theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
                  <span className="capitalize">{settings.theme}</span>
                </button>

                {/* Button side & position adjust */}
                <div className="flex items-center gap-1">
                  <select
                    value={side}
                    onChange={(e) => handleSetSide(e.target.value as any)}
                    className="bg-surface text-text-secondary border border-border-base rounded px-1.5 py-0.5 text-[11px] cursor-pointer focus:outline-none"
                    title="Floating button side"
                  >
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                  </select>

                  <select
                    value={position}
                    onChange={(e) => handleSetPosition(e.target.value as any)}
                    className="bg-surface text-text-secondary border border-border-base rounded px-1.5 py-0.5 text-[11px] cursor-pointer focus:outline-none"
                    title="Adjust vertical position"
                  >
                    <option value="top">Top</option>
                    <option value="center">Mid</option>
                    <option value="bottom">Btm</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-border-base">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter screens... (or press Alt+S to toggle)"
                  className="w-full bg-surface-elevated/70 border border-border-base rounded-xl pl-9 pr-8 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Screens List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
              {filteredScreens.length === 0 ? (
                <div className="py-10 text-center text-text-muted text-sm">
                  <p>No screens match "{searchQuery}"</p>
                </div>
              ) : (
                <>
                  {/* Public Screens Group */}
                  {filteredScreens.some(s => s.category === 'public') && (
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted px-2 mb-2 flex items-center justify-between">
                        <span>Public Screens</span>
                        <span className="text-[10px] font-normal lowercase opacity-70">open access</span>
                      </div>
                      <div className="space-y-1.5">
                        {filteredScreens.filter(s => s.category === 'public').map((screen) => {
                          const isActive = location.pathname === screen.path;
                          return (
                            <button
                              key={screen.id}
                              onClick={() => handleNavigate(screen)}
                              className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-center justify-between group cursor-pointer border ${
                                isActive
                                  ? 'bg-brand-500/15 border-brand-500/40 text-brand-700 dark:text-brand-300 shadow-sm'
                                  : 'bg-surface hover:bg-surface-elevated border-border-base text-text-primary hover:border-brand-500/30'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                  isActive
                                    ? 'bg-brand-500 text-white'
                                    : 'bg-surface-elevated border border-border-base text-brand-600 dark:text-brand-400 group-hover:text-brand-500'
                                }`}>
                                  {screen.icon}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm truncate">{screen.name}</span>
                                    {isActive && (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Current
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-text-muted truncate mt-0.5">{screen.description}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 ml-2">
                                <span className="font-mono text-[11px] text-text-muted bg-surface-elevated px-1.5 py-0.5 rounded border border-border-base">
                                  {screen.path}
                                </span>
                                <ArrowRight size={14} className="text-text-muted group-hover:translate-x-1 group-hover:text-brand-500 transition-all" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Workspace Screens Group */}
                  {filteredScreens.some(s => s.category === 'workspace') && (
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted px-2 mb-2 flex items-center justify-between">
                        <span>Workspace Screens</span>
                        <span className="text-[10px] font-normal lowercase opacity-70">core app features</span>
                      </div>
                      <div className="space-y-1.5">
                        {filteredScreens.filter(s => s.category === 'workspace').map((screen) => {
                          const isActive = location.pathname === screen.path;
                          return (
                            <button
                              key={screen.id}
                              onClick={() => handleNavigate(screen)}
                              className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-center justify-between group cursor-pointer border ${
                                isActive
                                  ? 'bg-brand-500/15 border-brand-500/40 text-brand-700 dark:text-brand-300 shadow-sm'
                                  : 'bg-surface hover:bg-surface-elevated border-border-base text-text-primary hover:border-brand-500/30'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                  isActive
                                    ? 'bg-brand-500 text-white'
                                    : 'bg-surface-elevated border border-border-base text-brand-600 dark:text-brand-400 group-hover:text-brand-500'
                                }`}>
                                  {screen.icon}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm truncate">{screen.name}</span>
                                    {isActive && (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Current
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-text-muted truncate mt-0.5">{screen.description}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 ml-2">
                                <span className="font-mono text-[11px] text-text-muted bg-surface-elevated px-1.5 py-0.5 rounded border border-border-base">
                                  {screen.path}
                                </span>
                                <ArrowRight size={14} className="text-text-muted group-hover:translate-x-1 group-hover:text-brand-500 transition-all" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border-base bg-surface-elevated/40 flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center gap-1.5 text-text-muted">
                <Sparkles size={12} className="text-brand-400" />
                <span>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border-base font-mono text-[10px]">Alt + S</kbd></span>
              </div>

              <button
                onClick={handleResetData}
                className="flex items-center gap-1 text-[11px] text-text-muted hover:text-red-500 transition-colors cursor-pointer"
                title="Clear localStorage and reload with fresh data"
              >
                <RotateCcw size={12} />
                <span>Reset Demo Data</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
