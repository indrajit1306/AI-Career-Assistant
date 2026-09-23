import React, { useRef, useEffect } from 'react';
import { AssistantHeader } from '../components/assistant/AssistantHeader';
import { CareerContext } from '../components/assistant/CareerContext';
import { ChatWindow } from '../components/assistant/ChatWindow';
import { ChatInput } from '../components/assistant/ChatInput';
import { useAssistantChat } from '../hooks/useAssistantChat';
import { Trash2 } from 'lucide-react';
import { gsap } from 'gsap';


export const Assistant: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { messages, isProcessing, error, sendMessage, clearConversation } = useAssistantChat();

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        const elements = containerRef.current!.children;
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0" ref={containerRef}>
        <AssistantHeader />
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-6 pb-6">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-surface rounded-2xl border border-border-base overflow-hidden relative">
          
          {/* Top Bar inside Chat Area */}
          <div className="absolute top-0 right-0 p-4 z-10">
            {messages.length > 0 && (
              <button
                onClick={clearConversation}
                className="flex items-center space-x-2 text-xs text-text-muted hover:text-error transition-colors px-3 py-1.5 rounded-full bg-surface-elevated/80 backdrop-blur border border-border-base"
                title="Clear Conversation"
              >
                <Trash2 size={14} />
                <span>Clear</span>
              </button>
            )}
          </div>

          <ChatWindow 
            messages={messages} 
            isProcessing={isProcessing} 
            onActionSelect={sendMessage}
          />
          
          <div className="p-4 border-t border-border-base bg-surface-elevated/30">
            {error && (
              <div className="mb-3 p-3 bg-error/10 text-error text-sm rounded-lg border border-error/20">
                {error}
              </div>
            )}
            <div className="max-w-3xl mx-auto">
              <ChatInput 
                onSendMessage={sendMessage} 
                isProcessing={isProcessing} 
              />
              <div className="mt-2 text-center text-[10px] text-text-muted">
                AI can make mistakes. Please verify important career advice.
              </div>
            </div>
          </div>
        </div>

        {/* Side Context Area */}
        <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-6 overflow-y-auto">
          <CareerContext />
        </div>
      </div>
    </div>
  );
};
