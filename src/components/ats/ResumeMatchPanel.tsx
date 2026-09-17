import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import type { ResumeMatchResult } from '../../services/ai/aiTypes';

interface Props {
  result: ResumeMatchResult;
}

export const ResumeMatchPanel: React.FC<Props> = ({ result }) => {
  return (
    <GlassCard padding="lg" className="space-y-6 mt-6">
      <div className="flex justify-between items-center border-b border-surface-elevated pb-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">AI Resume Match Analysis</h2>
          <p className="text-xs text-text-muted mt-1">This is an AI-generated assessment, not a hiring prediction.</p>
        </div>
        <span className="text-xs font-semibold px-2 py-1 bg-brand-500/20 text-brand-300 rounded border border-brand-500/30 uppercase tracking-wider">
          AI Analysis
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Matching Skills</h3>
          {result.matchingSkills.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm text-green-400">
              {result.matchingSkills.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-text-disabled">No matching skills found.</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Related Experience</h3>
          {result.relatedExperience.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm text-green-400">
              {result.relatedExperience.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-text-disabled">No directly related experience found.</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Missing Requirements</h3>
          {result.missingRequirements.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-500">
              {result.missingRequirements.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-text-disabled">No missing requirements identified.</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Areas to Review</h3>
          {result.suggestedAreasToReview.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm text-text-muted">
              {result.suggestedAreasToReview.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-text-disabled">No specific areas to review.</p>
          )}
        </div>
      </div>

      {result.questionsToConsider.length > 0 && (
        <div className="bg-surface-elevated/30 rounded-lg p-4 border border-surface-elevated">
          <h3 className="text-sm font-semibold text-brand-300 uppercase tracking-wider mb-3">Questions to Consider for Interview</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-brand-200">
            {result.questionsToConsider.map((q, idx) => <li key={idx}>{q}</li>)}
          </ul>
        </div>
      )}
    </GlassCard>
  );
};
