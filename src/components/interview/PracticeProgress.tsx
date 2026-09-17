import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { ProgressBar } from '../ui/ProgressBar';

interface PracticeProgressProps {
  completed: number;
  total: number;
}

export const PracticeProgress: React.FC<PracticeProgressProps> = ({ completed, total }) => {
  const progress = total > 0 ? (completed / total) * 100 : 0;
  
  return (
    <GlassCard className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="text-sm font-medium text-text-secondary">Session Progress</h3>
          <p className="text-lg font-bold text-text-primary">
            {completed} / {total} Completed
          </p>
        </div>
        <div className="text-sm font-medium text-brand-500">
          {Math.round(progress)}%
        </div>
      </div>
      <ProgressBar value={progress} showValue={false} />
    </GlassCard>
  );
};
