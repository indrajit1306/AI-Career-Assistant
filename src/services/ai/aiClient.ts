import type {
  AIProvider,
  AIResult,
  CoverLetterInput,
  CoverLetterResult,
  InterviewEvaluationInput,
  InterviewEvaluationResult,
  InterviewQuestionInput,
  InterviewQuestionResult,
  JobAnalysisInput,
  JobAnalysisResult,
  ResumeImprovementInput,
  ResumeImprovementResult,
  ResumeMatchInput,
  ResumeMatchResult,
} from './aiTypes';
import type { ChatInputPayload, ChatResultPayload } from '../../types/assistant';
import { MockAIProvider } from './mockAIProvider';

class AIClient implements AIProvider {
  private provider: AIProvider;

  constructor(initialProvider?: AIProvider) {
    // Default to the mock provider until a secure backend is available.
    this.provider = initialProvider || new MockAIProvider();
  }

  setProvider(newProvider: AIProvider) {
    this.provider = newProvider;
  }

  private async handleRequest<T>(
    operationName: string,
    operation: () => Promise<AIResult<T>>
  ): Promise<AIResult<T>> {
    try {
      return await operation();
    } catch (error) {
      console.error(`[AIClient] Error during ${operationName}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred.',
        provider: 'AIClient_ErrorBoundary',
      };
    }
  }

  async improveResume(input: ResumeImprovementInput): Promise<AIResult<ResumeImprovementResult>> {
    if (!input.resume) {
      return { success: false, error: 'Resume data is required.', provider: 'AIClient' };
    }
    return this.handleRequest('improveResume', () => this.provider.improveResume(input));
  }

  async analyzeJob(input: JobAnalysisInput): Promise<AIResult<JobAnalysisResult>> {
    if (!input.jobDescription?.trim()) {
      return { success: false, error: 'Job description is required.', provider: 'AIClient' };
    }
    return this.handleRequest('analyzeJob', () => this.provider.analyzeJob(input));
  }

  async matchResumeToJob(input: ResumeMatchInput): Promise<AIResult<ResumeMatchResult>> {
    if (!input.resume || !input.jobDescription?.trim()) {
      return { success: false, error: 'Both resume and job description are required.', provider: 'AIClient' };
    }
    return this.handleRequest('matchResumeToJob', () => this.provider.matchResumeToJob(input));
  }

  async generateInterviewQuestions(input: InterviewQuestionInput): Promise<AIResult<InterviewQuestionResult>> {
    if (!input.role?.trim() || !input.category?.trim() || input.count <= 0) {
      return { success: false, error: 'Invalid interview question parameters.', provider: 'AIClient' };
    }
    return this.handleRequest('generateInterviewQuestions', () => this.provider.generateInterviewQuestions(input));
  }

  async evaluateInterviewAnswer(input: InterviewEvaluationInput): Promise<AIResult<InterviewEvaluationResult>> {
    if (!input.question?.trim() || !input.answer?.trim()) {
      return { success: false, error: 'Both question and answer are required.', provider: 'AIClient' };
    }
    return this.handleRequest('evaluateInterviewAnswer', () => this.provider.evaluateInterviewAnswer(input));
  }

  async generateCoverLetter(input: CoverLetterInput): Promise<AIResult<CoverLetterResult>> {
    if (!input.resume || !input.jobDescription?.trim() || !input.companyName?.trim()) {
      return { success: false, error: 'Missing required parameters for cover letter generation.', provider: 'AIClient' };
    }
    return this.handleRequest('generateCoverLetter', () => this.provider.generateCoverLetter(input));
  }

  async chat(input: ChatInputPayload): Promise<AIResult<ChatResultPayload>> {
    if (!input.message?.trim()) {
      return { success: false, error: 'Message is required.', provider: 'AIClient' };
    }
    return this.handleRequest('chat', () => this.provider.chat(input));
  }
}

export const aiClient = new AIClient();
