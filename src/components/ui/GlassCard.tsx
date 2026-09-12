import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className = '', padding = 'md', interactive = false, children, ...props }, ref) => {
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    
    const interactiveStyle = interactive 
      ? 'hover:bg-surface/60 transition-colors cursor-pointer hover:border-brand-500/50' 
      : '';

    return (
      <div
        ref={ref}
        className={`glass-surface rounded-2xl ${paddings[padding]} ${interactiveStyle} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
