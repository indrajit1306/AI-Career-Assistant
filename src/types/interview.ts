import type { InterviewEvaluationResult } from '../services/ai/aiTypes';

export type InterviewCategory = 
  | 'JavaScript' 
  | 'React' 
  | 'Node.js' 
  | 'Java' 
  | 'Python' 
  | 'SQL' 
  | 'Frontend Development' 
  | 'Full Stack Development' 
  | 'Behavioral' 
  | 'HR';

export type InterviewDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  question: string;
  guidance?: string;
  suggestedTopics?: string[];
  evaluationCriteria?: string[];
}

export interface SelfReviewData {
  answeredDirectly: boolean;
  explainedReasoning: boolean;
  providedExample: boolean;
  technicallyAccurate: boolean;
}

export type SessionStatus = 'in-progress' | 'completed' | 'abandoned';

export interface PracticeSession {
  id: string;
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  questions: InterviewQuestion[];
  answers: Record<string, string>;
  completedQuestionIds: string[];
  selfReviewData: Record<string, SelfReviewData>;
  aiEvaluations?: Record<string, InterviewEvaluationResult>;
  isAIGenerated?: boolean;
  createdAt: string;
  completedAt?: string;
  status: SessionStatus;
}
