import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SuggestedActionsProps {
  onActionSelect: (action: string) => void;
}

export const SuggestedActions: React.FC<SuggestedActionsProps> = ({ onActionSelect }) => {
  const actions = [
    "Review my resume for improvements",
    "How can I match my resume to a job description?",
    "Generate some practice interview questions",
    "What are the best practices for ATS optimization?"
  ];

  return (
    <div className="mt-8 space-y-3">
      <p className="text-sm font-medium text-text-secondary mb-4">Or try asking:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => onActionSelect(action)}
            className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated border border-border-base hover:border-action-primary/50 hover:bg-action-primary/5 transition-all text-left group"
          >
            <span className="text-sm text-text-primary">{action}</span>
            <ArrowRight size={16} className="text-text-muted group-hover:text-action-primary transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};
