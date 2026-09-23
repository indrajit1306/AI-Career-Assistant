import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Heading } from '../components/ui/Heading';
import { animateFadeIn } from '../animations';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  // Animate on mount
  React.useEffect(() => {
    const el = document.getElementById('login-container');
    if (el) animateFadeIn(el);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    try {
      await login(email);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="gradient-orb w-[500px] h-[500px] top-[-100px] left-[-100px] opacity-20" />
      <div className="gradient-orb w-[600px] h-[600px] bottom-[-200px] right-[-100px] opacity-10" />

      <div className="w-full max-w-md relative z-10" id="login-container" style={{ opacity: 0 }}>
        <div className="flex flex-col items-center mb-8">
          <div className="bg-surface border border-border-base w-12 h-12 rounded-xl flex items-center justify-center text-brand-400 mb-4 shadow-sm">
            <Sparkles size={24} />
          </div>
          <Heading level={2} className="text-center mb-2">Welcome Back</Heading>
          <p className="text-text-secondary text-center">Sign in to continue your career journey.</p>
        </div>

        <GlassCard padding="lg" className="border border-border-base/50 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-secondary">Email Address</label>
              <Input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-secondary">Password</label>
                <a href="#" className="text-xs font-medium text-brand-400 hover:text-brand-300">Forgot password?</a>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                type={showPassword ? 'text' : 'password'}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-text-muted hover:text-text-secondary focus:outline-none transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full mt-2" 
              disabled={isSubmitting || !email || !password}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <LogIn size={18} />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary border-t border-border-base pt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 transition-colors">
              Create one <ArrowRight size={14} />
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
