import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Check, X } from 'lucide-react';

interface Props {
  matchedKeywords: string[];
  missingKeywords: string[];
}

export const KeywordComparison: React.FC<Props> = ({ matchedKeywords, missingKeywords }) => {
  return (
    <GlassCard padding="lg">
      <Heading level={3} className="mb-2">Keyword Analysis</Heading>
      <p className="text-sm text-text-secondary mb-6">
        Comparing terms found in the job description against your resume text.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="flex items-center gap-2 font-medium text-green-400 mb-4">
            <Check size={18} /> Found Keywords ({matchedKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.length > 0 ? (
              matchedKeywords.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-green-400/10 text-green-300 border border-green-400/20">
                  {kw}
                </span>
              ))
            ) : (
              <span className="text-sm text-text-muted">No keywords matched.</span>
            )}
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-2 font-medium text-yellow-400 mb-4">
            <X size={18} /> Missing Keywords ({missingKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.length > 0 ? (
              missingKeywords.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface border border-border-base text-text-secondary">
                  {kw}
                </span>
              ))
            ) : (
              <span className="text-sm text-text-muted">No key terms are missing!</span>
            )}
          </div>
          {missingKeywords.length > 0 && (
            <p className="text-xs text-text-muted mt-4 bg-surface-elevated p-3 rounded-lg border border-border-base">
              <strong>Note:</strong> Review missing keywords carefully. Add them only when they truthfully represent your skills or experience.
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
