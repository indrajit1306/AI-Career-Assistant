import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Lightbulb } from 'lucide-react';

interface Props {
  recommendations: string[];
}

export const ATSRecommendations: React.FC<Props> = ({ recommendations }) => {
  return (
    <GlassCard padding="lg">
      <Heading level={3} className="mb-6 flex items-center gap-2">
        <Lightbulb className="text-yellow-400" size={20} /> Actionable Recommendations
      </Heading>
      
      {recommendations.length > 0 ? (
        <ul className="space-y-3">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex gap-3 text-sm text-text-secondary bg-surface/50 p-3 rounded-lg border border-border-base">
              <span className="text-brand-400 font-bold">•</span>
              {rec}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-6 text-text-muted">
          <p>Great job! Your resume aligns well with best practices for this role.</p>
        </div>
      )}
    </GlassCard>
  );
};
