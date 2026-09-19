import React, { useEffect, useRef } from 'react';
import type { ChatMessage as ChatMessageType } from '../../types/assistant';
import { ChatMessage } from './ChatMessage';
import { AssistantEmptyState } from './AssistantEmptyState';
import { Bot, Loader2 } from 'lucide-react';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isProcessing: boolean;
  onActionSelect: (action: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isProcessing, onActionSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        <AssistantEmptyState onActionSelect={onActionSelect} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6" ref={scrollRef}>
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        
        {isProcessing && (
          <div className="flex w-full justify-start mb-6">
            <div className="flex max-w-[80%] flex-row">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-action-primary/20 text-action-primary mr-3">
                <Bot size={18} />
              </div>
              <div className="px-4 py-4 rounded-2xl bg-surface-elevated border border-border-base rounded-tl-sm flex items-center justify-center space-x-2 text-text-muted text-sm">
                <Loader2 size={16} className="animate-spin" />
                <span>Assistant is typing...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
