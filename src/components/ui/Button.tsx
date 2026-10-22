import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, disabled, type = 'button', ...props }, ref) => {
    
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus-ring disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-action-primary text-white hover:bg-action-hover shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] border border-emerald-500/30 hover:border-emerald-400/60 font-medium',
      secondary: 'bg-surface-elevated text-text-primary hover:bg-surface border border-border-base',
      outline: 'bg-transparent text-text-primary border border-border-base hover:border-brand-500 hover:text-brand-600 dark:hover:border-brand-400 dark:hover:text-brand-300',
      ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface',
      glass: 'glass-surface text-text-primary hover:bg-surface/70 border-border-base dark:border-brand-700/30 hover:border-brand-500/50 dark:hover:border-brand-400/50',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    
    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        type={type}
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
