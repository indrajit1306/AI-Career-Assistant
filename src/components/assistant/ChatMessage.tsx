import React from 'react';
import { Bot, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ChatMessage as ChatMessageType } from '../../types/assistant';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  const navigate = useNavigate();

  const handleAction = () => {
    if (message.action?.type === 'NAVIGATE') {
      if (message.action.label.includes('Resume')) {
        navigate('/resume');
      } else if (message.action.label.includes('Job')) {
        navigate('/jobs');
      } else if (message.action.label.includes('Interview')) {
        navigate('/interview');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className={`flex w-full ${isAssistant ? 'justify-start' : 'justify-end'} mb-6`}>
      <div className={`flex max-w-[80%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isAssistant ? 'bg-action-primary/20 text-action-primary mr-3' : 'bg-surface-elevated text-text-secondary ml-3'
        }`}>
          {isAssistant ? <Bot size={18} /> : <User size={18} />}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}>
          <div className={`px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm ${
            isAssistant 
              ? 'bg-surface-elevated text-text-primary border border-border-base rounded-tl-sm' 
              : 'bg-action-primary text-white rounded-tr-sm'
          }`}>
            {message.content}
          </div>
          
          {/* Action Button */}
          {message.action && (
            <div className="mt-2">
              <button
                onClick={handleAction}
                className="flex items-center space-x-2 text-xs font-medium text-action-primary hover:text-action-primary/80 transition-colors bg-action-primary/10 px-3 py-1.5 rounded-full"
              >
                <span>{message.action.label}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
