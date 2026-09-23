import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animateFadeIn, animateSlideUp, animateStagger } from '../animations';
import { Sparkles, FileText, Briefcase, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Heading } from '../components/ui/Heading';

export const Landing: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) animateSlideUp(headerRef.current);
    if (subtitleRef.current) animateSlideUp(subtitleRef.current, { delay: 0.1 });
    if (ctaRef.current) animateFadeIn(ctaRef.current, { delay: 0.3 });
    
    if (featuresRef.current) {
      const cards = Array.from(featuresRef.current.children);
      animateStagger(cards, { delay: 0.4 });
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-brand-400 selection:text-brand-950 overflow-hidden relative">
      
      {/* 3D background elements */}
      <div className="gradient-orb w-[600px] h-[600px] top-[-200px] left-[-200px]" />
      <div className="gradient-orb w-[800px] h-[800px] bottom-[-400px] right-[-200px] opacity-10" />

      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="text-2xl font-bold tracking-tighter text-text-secondary">
          AI Career<span className="text-text-primary">Assist</span>
        </div>
        <div className="space-x-4 flex items-center">
          <Link to="/login" className="text-text-secondary hover:text-text-primary transition-colors font-medium">Sign In</Link>
          <Link to="/register">
            <Button variant="primary" className="rounded-full">Get Started</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center relative z-10 perspective-container">
        <div ref={headerRef} className="opacity-0 tilt-element">
          <Heading level={1} className="text-5xl md:text-7xl max-w-4xl">
            Elevate Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">AI Precision</span>
          </Heading>
        </div>
        
        <p ref={subtitleRef} className="mt-8 text-xl text-text-secondary max-w-2xl opacity-0 tilt-element">
          Craft perfect resumes, analyze job descriptions, and master interviews with your personal AI career coach.
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row gap-4 opacity-0 tilt-element">
          <Link to="/register">
            <Button variant="primary" size="lg" className="rounded-full group px-8">
              Start Your Journey <ChevronRight className="group-hover:translate-x-1 transition-transform ml-2" size={20} />
            </Button>
          </Link>
        </div>

        <div ref={featuresRef} className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <GlassCard interactive padding="lg" className="text-left opacity-0 layered-depth">
            <div className="bg-surface w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-brand-400 border border-border-base">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">AI Resume Builder</h3>
            <p className="text-text-secondary">Generate tailored resumes optimized for the roles you want in seconds.</p>
          </GlassCard>

          <GlassCard interactive padding="lg" className="text-left opacity-0 layered-depth">
            <div className="bg-surface w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-brand-400 border border-border-base">
              <Briefcase size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">Job Analyzer</h3>
            <p className="text-text-secondary">Instantly compare your skills against job descriptions to find gaps.</p>
          </GlassCard>

          <GlassCard interactive padding="lg" className="text-left opacity-0 layered-depth">
            <div className="bg-surface w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-brand-400 border border-border-base">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">Interview Prep</h3>
            <p className="text-text-secondary">Practice with interactive AI mock interviews specific to your target job.</p>
          </GlassCard>
        </div>
      </main>
    </div>
  );
};
