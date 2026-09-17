import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import type { JobAnalysisResult } from '../../services/ai/aiTypes';

interface Props {
  result: JobAnalysisResult;
}

export const JobAnalysisPanel: React.FC<Props> = ({ result }) => {
  return (
    <GlassCard padding="lg" className="space-y-6">
      <div className="flex justify-between items-center border-b border-surface-elevated pb-4">
        <h2 className="text-xl font-bold text-text-primary">AI Job Description Analysis</h2>
        <span className="text-xs font-semibold px-2 py-1 bg-brand-500/20 text-brand-300 rounded border border-brand-500/30 uppercase tracking-wider">
          AI Analysis
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Main Responsibilities</h3>
          {result.mainResponsibilities.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm text-text-muted">
              {result.mainResponsibilities.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-text-disabled">Not specified in the provided job description</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Required Skills</h3>
          {result.requiredSkills.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm text-text-muted">
              {result.requiredSkills.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-text-disabled">Not specified in the provided job description</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Preferred Skills</h3>
          {result.preferredSkills.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm text-text-muted">
              {result.preferredSkills.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-text-disabled">Not specified in the provided job description</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Tools & Technologies</h3>
          {result.toolsAndTechnologies.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm text-text-muted">
              {result.toolsAndTechnologies.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-text-disabled">Not specified in the provided job description</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Education Requirements</h3>
          <p className="text-sm text-text-muted">{result.educationRequirements || 'Not specified in the provided job description'}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Experience Requirements</h3>
          <p className="text-sm text-text-muted">{result.experienceRequirements || 'Not specified in the provided job description'}</p>
        </div>
      </div>

      <div className="bg-surface-elevated/30 rounded-lg p-4 border border-surface-elevated">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Important Keywords to Include</h3>
        {result.importantKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {result.importantKeywords.map((kw, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-surface-elevated text-text-primary rounded-md border border-surface-highlight">
                {kw}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-disabled">Not specified in the provided job description</p>
        )}
      </div>

      {result.potentialConcerns.length > 0 && (
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Potential Concerns</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-red-300">
            {result.potentialConcerns.map((concern, idx) => <li key={idx}>{concern}</li>)}
          </ul>
        </div>
      )}
    </GlassCard>
  );
};
