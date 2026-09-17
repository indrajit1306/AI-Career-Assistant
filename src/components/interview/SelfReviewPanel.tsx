import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import type { SelfReviewData } from '../../types/interview';

interface SelfReviewPanelProps {
  reviewData: SelfReviewData;
  onChange: (data: SelfReviewData) => void;
  disabled?: boolean;
}

const REVIEW_ITEMS = [
  { key: 'answeredDirectly', label: 'Did I answer the question directly?' },
  { key: 'explainedReasoning', label: 'Did I explain my reasoning?' },
  { key: 'providedExample', label: 'Did I provide an example?' },
  { key: 'technicallyAccurate', label: 'Was my answer technically accurate?' },
] as const;

export const SelfReviewPanel: React.FC<SelfReviewPanelProps> = ({ reviewData, onChange, disabled }) => {
  const handleToggle = (key: keyof SelfReviewData) => {
    if (disabled) return;
    onChange({
      ...reviewData,
      [key]: !reviewData[key]
    });
  };

  return (
    <GlassCard className="mt-6">
      <h3 className="text-lg font-medium text-text-primary mb-4">Self-Review Checklist</h3>
      <p className="text-sm text-text-secondary mb-4">
        Evaluate your own answer before moving on to the next question.
      </p>
      
      <div className="space-y-3">
        {REVIEW_ITEMS.map((item) => (
          <label 
            key={item.key} 
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              reviewData[item.key] 
                ? 'bg-success/5 border-success/20' 
                : 'bg-surface border-border-base'
            } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:border-brand-500/30 transition-colors'}`}
          >
            <input
              type="checkbox"
              checked={reviewData[item.key]}
              onChange={() => handleToggle(item.key)}
              disabled={disabled}
              className="w-4 h-4 text-brand-500 rounded border-border-base focus:ring-brand-500"
            />
            <span className="text-sm font-medium text-text-primary">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </GlassCard>
  );
};
