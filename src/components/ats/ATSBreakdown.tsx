import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import type { ATSCategoryScore } from '../../types/ats';

interface Props {
  categories: {
    keywordMatch: ATSCategoryScore;
    skillsMatch: ATSCategoryScore;
    structure: ATSCategoryScore;
    readability: ATSCategoryScore;
  };
}

export const ATSBreakdown: React.FC<Props> = ({ categories }) => {
  const cats = Object.values(categories);

  return (
    <GlassCard padding="lg" className="h-full flex flex-col">
      <Heading level={3} className="mb-6">Score Breakdown</Heading>
      
      <div className="space-y-6 flex-1 flex flex-col justify-center">
        {cats.map((cat, i) => {
          const percentage = (cat.score / cat.maxScore) * 100;
          return (
            <div key={i}>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h4 className="font-medium text-text-primary">{cat.label}</h4>
                  <p className="text-xs text-text-muted mt-0.5">{cat.description}</p>
                </div>
                <div className="text-sm font-semibold text-brand-300">
                  {cat.score} <span className="text-text-muted font-normal text-xs">/ {cat.maxScore}</span>
                </div>
              </div>
              <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
