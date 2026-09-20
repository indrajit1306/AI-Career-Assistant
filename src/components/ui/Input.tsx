import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary mb-1.5">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          maxLength={props.maxLength || 255}
          className={`w-full bg-surface border rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus-ring transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? 'border-error/50 focus:ring-error/50' : 'border-border-base hover:border-brand-700/50'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
