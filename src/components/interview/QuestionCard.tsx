import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import type { InterviewQuestion } from '../../types/interview';

interface QuestionCardProps {
  question: InterviewQuestion;
  currentNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, currentNumber, totalQuestions }) => {
  return (
    <GlassCard className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="text-sm font-medium text-text-secondary">
          Question {currentNumber} of {totalQuestions}
        </div>
        <div className="flex gap-2">
          <Badge variant="brand">{question.category}</Badge>
          <Badge variant="default">{question.difficulty}</Badge>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-text-primary">
          {question.question}
        </h3>
        
        {question.guidance && (
          <div className="mt-4 p-4 bg-surface rounded-lg border border-border-base">
            <h4 className="text-sm font-medium text-text-primary mb-1">Guidance</h4>
            <p className="text-sm text-text-secondary">{question.guidance}</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
};
