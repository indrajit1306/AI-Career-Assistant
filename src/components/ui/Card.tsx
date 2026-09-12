import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevated?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', padding = 'md', elevated = false, children, ...props }, ref) => {
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    
    const bgStyle = elevated ? 'bg-surface-elevated' : 'bg-surface';
    const borderStyle = elevated ? 'border-brand-700/50' : 'border-border-base';

    return (
      <div
        ref={ref}
        className={`rounded-xl border ${bgStyle} ${borderStyle} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
