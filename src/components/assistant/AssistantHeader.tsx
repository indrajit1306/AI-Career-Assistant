import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const AssistantHeader: React.FC = () => {
  return (
    <GlassCard className="p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-action-primary/20 rounded-xl flex items-center justify-center text-action-primary">
            <Bot size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">AI Career Assistant</h1>
            <p className="text-text-secondary mt-1">Your personal guide for resumes, job matching, and interview prep.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-surface-elevated rounded-full text-xs font-medium text-text-secondary border border-border-base">
          <Sparkles size={14} className="text-action-primary" />
          <span>Demo AI Mode</span>
        </div>
      </div>
    </GlassCard>
  );
};
