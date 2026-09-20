export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  action?: {
    type: string;
    label: string;
  };
}

export interface ChatInputPayload {
  message: string;
  history: ChatMessage[];
  context?: {
    hasResume: boolean;
    savedJobsCount: number;
    latestAtsScore: number | null;
    interviewSessionsCount: number;
  };
}

export interface ChatResultPayload {
  message: string;
  action?: {
    type: string;
    label: string;
  };
  suggestions?: string[];
  warnings?: string[];
}
