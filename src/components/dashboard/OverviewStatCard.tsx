import { Link } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import type { ReactNode } from 'react';

export interface OverviewStatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
  to?: string;
}

export const OverviewStatCard = ({ icon, label, value, description, to }: OverviewStatCardProps) => {
  const content = (
    <GlassCard interactive={!!to} padding="lg" className="flex flex-col h-full dash-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-surface border border-border-base text-brand-400">
          {icon}
        </div>
        <h3 className="font-semibold text-text-secondary">{label}</h3>
      </div>
      <div className="mb-2">
        <span className="text-4xl font-bold text-text-primary">{value}</span>
      </div>
      <p className="text-sm text-text-muted mt-auto">{description}</p>
    </GlassCard>
  );

  if (to) {
    return (
      <Link to={to} className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
};
