import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Button } from '../ui/Button';
import type { PracticeSession } from '../../types/interview';
import { CheckCircle, RotateCcw, List, History } from 'lucide-react';

interface PracticeCompletionProps {
  session: PracticeSession;
  onPracticeAgain: () => void;
  onReturnToSetup: () => void;
  onViewHistory: () => void;
}

export const PracticeCompletion: React.FC<PracticeCompletionProps> = ({
  session,
  onPracticeAgain,
  onReturnToSetup,
  onViewHistory
}) => {
  const totalQuestions = session.questions.length;
  const completedQuestions = session.completedQuestionIds.length;
  const answeredQuestions = Object.keys(session.answers).filter(id => session.answers[id].trim().length > 0).length;
  
  // Calculate self-review stats
  const totalReviewItems = session.completedQuestionIds.length * 4; // 4 items per completed question
  let completedReviewItems = 0;
  
  Object.values(session.selfReviewData).forEach(data => {
    if (data.answeredDirectly) completedReviewItems++;
    if (data.explainedReasoning) completedReviewItems++;
    if (data.providedExample) completedReviewItems++;
    if (data.technicallyAccurate) completedReviewItems++;
  });

  return (
    <div className="max-w-2xl mx-auto mt-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success mb-4">
          <CheckCircle size={32} />
        </div>
        <Heading level={2}>Practice Session Complete!</Heading>
        <p className="text-text-secondary mt-2">
          Great job practicing your interview skills.
        </p>
      </div>

      <GlassCard className="mb-8">
        <Heading level={3} className="mb-6">Session Summary</Heading>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-surface rounded-lg border border-border-base text-center">
            <div className="text-sm font-medium text-text-secondary mb-1">Questions Completed</div>
            <div className="text-2xl font-bold text-text-primary">{completedQuestions} / {totalQuestions}</div>
          </div>
          
          <div className="p-4 bg-surface rounded-lg border border-border-base text-center">
            <div className="text-sm font-medium text-text-secondary mb-1">Answers Written</div>
            <div className="text-2xl font-bold text-text-primary">{answeredQuestions}</div>
          </div>
          
          <div className="p-4 bg-surface rounded-lg border border-border-base text-center col-span-2">
            <div className="text-sm font-medium text-text-secondary mb-1">Self-Review Items Checked</div>
            <div className="text-2xl font-bold text-text-primary">
              {completedReviewItems} <span className="text-sm font-normal text-text-secondary">/ {totalReviewItems > 0 ? totalReviewItems : 0} max</span>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onPracticeAgain} variant="primary" className="flex-1 sm:flex-none">
          <RotateCcw size={18} className="mr-2" />
          Practice Again
        </Button>
        <Button onClick={onReturnToSetup} variant="outline" className="flex-1 sm:flex-none">
          <List size={18} className="mr-2" />
          New Setup
        </Button>
        <Button onClick={onViewHistory} variant="outline" className="flex-1 sm:flex-none">
          <History size={18} className="mr-2" />
          View History
        </Button>
      </div>
    </div>
  );
};
