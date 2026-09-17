import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Badge } from '../ui/Badge';
import type { InterviewEvaluationResult } from '../../services/ai/aiTypes';

interface AnswerEvaluationPanelProps {
  evaluation: InterviewEvaluationResult;
}

export const AnswerEvaluationPanel: React.FC<AnswerEvaluationPanelProps> = ({ evaluation }) => {
  return (
    <GlassCard className="mt-6 border-brand-500/30">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Heading level={4}>AI Feedback</Heading>
              <Badge variant="brand">Score: {evaluation.score}/10</Badge>
            </div>
            <p className="text-sm text-text-secondary mt-1">{evaluation.feedback}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-emerald-400">What you did well</h5>
            <ul className="space-y-2">
              {evaluation.strengths.map((strength, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-medium text-amber-400">Areas for Improvement</h5>
            <ul className="space-y-2">
              {evaluation.areasForImprovement.map((area, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {(evaluation.missingAreas.length > 0 || evaluation.concerns.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border-base">
            {evaluation.missingAreas.length > 0 && (
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-blue-400">Missing Areas</h5>
                <ul className="space-y-2">
                  {evaluation.missingAreas.map((missing, i) => (
                    <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{missing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {evaluation.concerns.length > 0 && (
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-red-400">Concerns</h5>
                <ul className="space-y-2">
                  {evaluation.concerns.map((concern, i) => (
                    <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-border-base space-y-4">
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-2">Suggested Structure</h5>
            <div className="bg-surface rounded-lg p-3 border border-border-base">
              <p className="text-sm text-text-secondary">{evaluation.suggestedStructure}</p>
            </div>
          </div>

          {evaluation.exampleAnswer && (
            <div>
              <h5 className="text-sm font-medium text-text-primary mb-2">Example Answer Snippet</h5>
              <div className="bg-surface rounded-lg p-3 border border-border-base">
                <p className="text-sm text-text-secondary italic">"{evaluation.exampleAnswer}"</p>
              </div>
            </div>
          )}

          {evaluation.followUpQuestions && evaluation.followUpQuestions.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-text-primary mb-2">Potential Follow-up Questions</h5>
              <ul className="space-y-2">
                {evaluation.followUpQuestions.map((q, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-brand-500 mt-0.5">↳</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
