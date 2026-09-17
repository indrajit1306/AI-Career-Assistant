import type { ResumeData } from '../../types/resume';


export interface AIResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  provider: string;
}

export interface ResumeImprovementInput {
  resume: ResumeData;
  focusArea?: string;
}

export interface ResumeImprovementResult {
  improvedContent: Partial<ResumeData>;
  suggestions: string[];
}

export interface JobAnalysisInput {
  jobDescription: string;
  roleTitle?: string;
}

export interface JobAnalysisResult {
  mainResponsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  educationRequirements: string;
  experienceRequirements: string;
  toolsAndTechnologies: string[];
  importantKeywords: string[];
  potentialConcerns: string[];
}

export interface ResumeMatchInput {
  resume: ResumeData;
  jobDescription: string;
}

export interface ResumeMatchResult {
  matchingSkills: string[];
  relatedExperience: string[];
  missingRequirements: string[];
  suggestedAreasToReview: string[];
  questionsToConsider: string[];
}

export interface InterviewQuestionInput {
  role: string;
  difficulty: string;
  category: string;
  count: number;
  resume?: ResumeData;
  jobDescription?: string;
}

export interface InterviewQuestionResult {
  questions: Array<{
    id: string;
    question: string;
    category: string;
    difficulty: string;
    suggestedTopics: string[];
    evaluationCriteria?: string[];
  }>;
}

export interface InterviewEvaluationInput {
  question: string;
  answer: string;
  role?: string;
}

export interface InterviewEvaluationResult {
  score: number;
  feedback: string;
  strengths: string[];
  areasForImprovement: string[];
  missingAreas: string[];
  concerns: string[];
  suggestedStructure: string;
  followUpQuestions: string[];
  exampleAnswer?: string;
}

export interface CoverLetterInput {
  resume: ResumeData;
  jobDescription: string;
  companyName: string;
  tone: 'professional' | 'enthusiastic' | 'direct';
}

export interface CoverLetterResult {
  content: string;
}

export interface AIProvider {
  improveResume(input: ResumeImprovementInput): Promise<AIResult<ResumeImprovementResult>>;
  analyzeJob(input: JobAnalysisInput): Promise<AIResult<JobAnalysisResult>>;
  matchResumeToJob(input: ResumeMatchInput): Promise<AIResult<ResumeMatchResult>>;
  generateInterviewQuestions(input: InterviewQuestionInput): Promise<AIResult<InterviewQuestionResult>>;
  evaluateInterviewAnswer(input: InterviewEvaluationInput): Promise<AIResult<InterviewEvaluationResult>>;
  generateCoverLetter(input: CoverLetterInput): Promise<AIResult<CoverLetterResult>>;
}
