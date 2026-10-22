import type { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'brand' | 'gold';
}

export const Badge: React.FC<BadgeProps> = ({ 
  className = '', 
  variant = 'default', 
  children, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
  
  const variants = {
    default: 'bg-surface-elevated text-text-secondary border-border-base',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    error: 'bg-error/10 text-error border-error/20',
    brand: 'bg-brand-500/10 text-brand-700 border-brand-500/20 dark:bg-brand-900 dark:text-brand-300 dark:border-brand-700/50',
    gold: 'bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-300',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
