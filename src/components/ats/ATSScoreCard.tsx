import React from 'react';
import { GlassCard } from '../ui/GlassCard';

interface Props {
  score: number;
}

export const ATSScoreCard: React.FC<Props> = ({ score }) => {
  let label = 'Needs Improvement';
  let colorClass = 'text-red-600 dark:text-red-400';
  let bgClass = 'bg-red-500/10 border-red-500/20';
  
  if (score >= 80) {
    label = 'Strong Match';
    colorClass = 'text-brand-700 dark:text-brand-400';
    bgClass = 'bg-brand-500/10 border-brand-500/20';
  } else if (score >= 60) {
    label = 'Good Match';
    colorClass = 'text-emerald-700 dark:text-green-400';
    bgClass = 'bg-emerald-500/10 border-emerald-500/20';
  } else if (score >= 40) {
    label = 'Developing';
    colorClass = 'text-amber-700 dark:text-yellow-400';
    bgClass = 'bg-amber-500/10 border-amber-500/20';
  }

  return (
    <GlassCard padding="lg" className="text-center flex flex-col items-center justify-center h-full">
      <h3 className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-6">
        Estimated ATS Compatibility
      </h3>
      
      <div className="relative mb-6">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            className="stroke-surface-elevated"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            className="stroke-current"
            style={{ color: 'var(--color-brand-400)' }}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={2 * Math.PI * 70 * (1 - score / 100)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-text-primary">{score}</span>
          <span className="text-text-muted text-sm mt-1">/ 100</span>
        </div>
      </div>

      <div className={`px-4 py-2 rounded-full border ${bgClass}`}>
        <span className={`font-semibold ${colorClass}`}>{label}</span>
      </div>
      
      <p className="text-text-muted text-xs mt-6 max-w-[200px] mx-auto">
        This is a rule-based estimate, not a guarantee of hiring success.
      </p>
    </GlassCard>
  );
};
