import type { ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description, 
  action, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 md:p-12 text-center border border-dashed border-border-base rounded-2xl bg-surface/30 ${className}`}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-brand-400 mb-6 border border-border-base shadow-sm">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      {description && (
        <p className="text-text-secondary max-w-sm mx-auto mb-6">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};
