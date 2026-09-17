import React, { useState, useEffect } from 'react';
import { Heading } from '../components/ui/Heading';
import { Badge } from '../components/ui/Badge';
import { InterviewSetup } from '../components/interview/InterviewSetup';
import { PracticeSession as PracticeSessionComponent } from '../components/interview/PracticeSession';
import { PracticeCompletion } from '../components/interview/PracticeCompletion';
import { PracticeHistory } from '../components/interview/PracticeHistory';
import { questionBank } from '../data/questionBank';
import { getInterviewSessions, deleteInterviewSession } from '../utils/interviewStorage';
import type { PracticeSession, InterviewCategory, InterviewDifficulty, InterviewQuestion } from '../types/interview';

type ViewState = 'setup' | 'practice' | 'completion' | 'history';

export const Interview: React.FC = () => {
  const [view, setViewState] = useState<ViewState>('setup');
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [currentSession, setCurrentSession] = useState<PracticeSession | null>(null);

  useEffect(() => {
    setSessions(getInterviewSessions());
  }, [view]); // Refresh when view changes

  const handleStartPractice = (
    category: InterviewCategory,
    difficulty: InterviewDifficulty,
    count: number,
    customQuestions?: InterviewQuestion[],
    isAIGenerated?: boolean
  ) => {
    let selectedQuestions = customQuestions || [];

    if (!customQuestions) {
      const availableQuestions = questionBank.filter(
        q => q.category === category && q.difficulty === difficulty
      );
      selectedQuestions = availableQuestions.slice(0, count);
      
      // Fallback if not enough questions
      if (selectedQuestions.length === 0) {
        alert(`No questions available for ${category} - ${difficulty}. Using default fallback.`);
        selectedQuestions.push(...questionBank.slice(0, count));
      }
    }


    const newSession: PracticeSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      category,
      difficulty,
      questions: selectedQuestions,
      answers: {},
      completedQuestionIds: [],
      selfReviewData: {},
      aiEvaluations: {},
      isAIGenerated: isAIGenerated || false,
      createdAt: new Date().toISOString(),
      status: 'in-progress'
    };
    
    setCurrentSession(newSession);
    setViewState('practice');
  };

  const handleFinishSession = (session: PracticeSession) => {
    setCurrentSession(session);
    setViewState('completion');
  };

  const handleDeleteSession = (id: string) => {
    deleteInterviewSession(id);
    setSessions(getInterviewSessions());
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Heading level={1}>Interview Preparation</Heading>
            <Badge variant="brand">Practice Mode</Badge>
          </div>
          <p className="text-text-secondary mt-1">
            Practice technical, behavioral, and role-specific interview questions.
          </p>

        </div>
      </header>
      
      <div className="flex-1">
        {view === 'setup' && (
          <div className="animate-fade-in">
            <InterviewSetup onStart={handleStartPractice} />
            <PracticeHistory 
              sessions={sessions} 
              onDeleteSession={handleDeleteSession}
              onStartNew={() => setViewState('setup')}
            />
          </div>
        )}

        {view === 'practice' && currentSession && (
          <PracticeSessionComponent 
            session={currentSession} 
            onFinish={handleFinishSession} 
          />
        )}

        {view === 'completion' && currentSession && (
          <PracticeCompletion 
            session={currentSession}
            onPracticeAgain={() => setViewState('setup')}
            onReturnToSetup={() => setViewState('setup')}
            onViewHistory={() => setViewState('setup')}
          />
        )}
      </div>
    </div>
  );
};
