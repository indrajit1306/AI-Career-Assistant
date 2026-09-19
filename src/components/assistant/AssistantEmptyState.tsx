import React from 'react';
import { Bot } from 'lucide-react';
import { SuggestedActions } from './SuggestedActions';

interface AssistantEmptyStateProps {
  onActionSelect: (action: string) => void;
}

export const AssistantEmptyState: React.FC<AssistantEmptyStateProps> = ({ onActionSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center px-4 py-12">
      <div className="w-16 h-16 bg-action-primary/10 rounded-2xl flex items-center justify-center text-action-primary mb-6">
        <Bot size={32} />
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">How can I help your career today?</h2>
      <p className="text-text-secondary mb-8">
        I'm connected to your resume, saved jobs, and interview history. Ask me anything or choose a suggestion below.
      </p>
      
      <div className="w-full text-left">
        <SuggestedActions onActionSelect={onActionSelect} />
      </div>
    </div>
  );
};
