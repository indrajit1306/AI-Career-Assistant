import React, { useState, useEffect } from 'react';
import type { PracticeSession as SessionType, SelfReviewData } from '../../types/interview';
import { QuestionCard } from './QuestionCard';
import { AnswerEditor } from './AnswerEditor';
import { SelfReviewPanel } from './SelfReviewPanel';
import { QuestionNavigation } from './QuestionNavigation';
import { PracticeProgress } from './PracticeProgress';
import { saveInterviewSession } from '../../utils/interviewStorage';
import { aiClient } from '../../services/ai/aiClient';
import { Button } from '../ui/Button';
import { AnswerEvaluationPanel } from './AnswerEvaluationPanel';

interface PracticeSessionProps {
  session: SessionType;
  onFinish: (session: SessionType) => void;
}

export const PracticeSession: React.FC<PracticeSessionProps> = ({ session: initialSession, onFinish }) => {
  const [session, setSession] = useState<SessionType>(initialSession);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalError, setEvalError] = useState('');

  const questions = session.questions;
  const currentQuestion = questions[currentIndex];
  const isCompleted = session.completedQuestionIds.includes(currentQuestion.id);

  // Sync state to local storage whenever session updates
  useEffect(() => {
    saveInterviewSession(session);
  }, [session]);

  const handleAnswerChange = (value: string) => {
    setSession(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: value
      }
    }));
  };

  const handleReviewChange = (data: SelfReviewData) => {
    setSession(prev => ({
      ...prev,
      selfReviewData: {
        ...prev.selfReviewData,
        [currentQuestion.id]: data
      }
    }));
  };

  const handleMarkCompleted = () => {
    setSession(prev => {
      const isCurrentlyCompleted = prev.completedQuestionIds.includes(currentQuestion.id);
      let newCompletedIds = [...prev.completedQuestionIds];
      
      if (isCurrentlyCompleted) {
        newCompletedIds = newCompletedIds.filter(id => id !== currentQuestion.id);
      } else {
        newCompletedIds.push(currentQuestion.id);
      }
      
      return {
        ...prev,
        completedQuestionIds: newCompletedIds
      };
    });
  };

  const handleFinish = () => {
    const confirmFinish = window.confirm(
      "Are you sure you want to finish the session? You can review your completion summary."
    );
    if (!confirmFinish) return;

    const completedSession: SessionType = {
      ...session,
      status: 'completed',
      completedAt: new Date().toISOString()
    };
    saveInterviewSession(completedSession);
    onFinish(completedSession);
  };

  const handleEvaluate = async () => {
    const answer = session.answers[currentQuestion.id];
    if (!answer || answer.trim().length === 0) return;

    setIsEvaluating(true);
    setEvalError('');

    const result = await aiClient.evaluateInterviewAnswer({
      question: currentQuestion.question,
      answer: answer,
      role: session.category // Pass category as role
    });

    setIsEvaluating(false);

    if (result.success && result.data) {
      setSession(prev => ({
        ...prev,
        aiEvaluations: {
          ...prev.aiEvaluations,
          [currentQuestion.id]: result.data!
        }
      }));
    } else {
      setEvalError(result.error || 'Failed to evaluate answer.');
    }
  };

  const currentReviewData = session.selfReviewData[currentQuestion.id] || {
    answeredDirectly: false,
    explainedReasoning: false,
    providedExample: false,
    technicallyAccurate: false,
  };

  const currentAnswer = session.answers[currentQuestion.id] || '';
  const currentEvaluation = session.aiEvaluations?.[currentQuestion.id];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <PracticeProgress 
        completed={session.completedQuestionIds.length} 
        total={questions.length} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <QuestionCard 
            question={currentQuestion} 
            currentNumber={currentIndex + 1} 
            totalQuestions={questions.length} 
          />
          <SelfReviewPanel 
            reviewData={currentReviewData}
            onChange={handleReviewChange}
          />
        </div>

        <div className="space-y-6">
          <AnswerEditor 
            value={currentAnswer} 
            onChange={handleAnswerChange} 
          />

          {session.isAIGenerated && (
            <div className="pt-2">
              <Button 
                onClick={handleEvaluate} 
                variant="outline" 
                disabled={isEvaluating || !currentAnswer.trim()}
                className="w-full"
              >
                {isEvaluating ? 'Evaluating...' : 'Evaluate Answer with AI'}
              </Button>
              {evalError && <p className="text-red-400 text-sm mt-2">{evalError}</p>}
            </div>
          )}
          
          {currentEvaluation && (
            <div className="animate-fade-in">
              <AnswerEvaluationPanel evaluation={currentEvaluation} />
            </div>
          )}
          
          <QuestionNavigation 
            onPrevious={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            onNext={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            onMarkCompleted={handleMarkCompleted}
            onFinish={handleFinish}
            canGoPrevious={currentIndex > 0}
            canGoNext={currentIndex < questions.length - 1}
            isCompleted={isCompleted}
          />
        </div>
      </div>
    </div>
  );
};
