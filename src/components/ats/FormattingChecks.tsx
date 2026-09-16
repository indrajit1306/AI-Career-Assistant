import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  formattingChecks: {
    hasContactInfo: boolean;
    hasSummary: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    hasSkills: boolean;
    goodLength: boolean;
  };
}

export const FormattingChecks: React.FC<Props> = ({ formattingChecks }) => {
  const checks = [
    { label: 'Contact Information', passed: formattingChecks.hasContactInfo },
    { label: 'Professional Summary', passed: formattingChecks.hasSummary },
    { label: 'Work Experience', passed: formattingChecks.hasExperience },
    { label: 'Education History', passed: formattingChecks.hasEducation },
    { label: 'Skills Section', passed: formattingChecks.hasSkills },
    { label: 'Appropriate Length', passed: formattingChecks.goodLength },
  ];

  return (
    <GlassCard padding="lg" className="h-full">
      <Heading level={3} className="mb-6">Formatting & Structure</Heading>
      
      <div className="space-y-4">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border-base">
            <span className="text-sm font-medium text-text-primary">{check.label}</span>
            {check.passed ? (
              <div className="flex items-center gap-1.5 text-green-400 text-xs font-semibold">
                <CheckCircle2 size={16} /> PASS
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-red-400 text-xs font-semibold">
                <XCircle size={16} /> FAIL
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
