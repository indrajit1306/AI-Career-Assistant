import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, max = 100, label, showValue = true, className = '', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    return (
      <div ref={ref} className={`w-full ${className}`} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2 text-sm">
            {label && <span className="font-medium text-text-primary">{label}</span>}
            {showValue && <span className="text-text-secondary">{Math.round(percentage)}%</span>}
          </div>
        )}
        <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden border border-border-base">
          <div 
            className="h-full bg-action-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
