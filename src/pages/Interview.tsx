import React from 'react';
import { Heading } from '../components/ui/Heading';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { MessageSquare } from 'lucide-react';

export const Interview: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <header>
        <Heading level={1}>Interview</Heading>
        <p className="text-text-secondary mt-1">Practice text-based mock interviews with AI.</p>
      </header>
      
      <GlassCard className="flex-1 flex items-center justify-center">
        <EmptyState 
          icon={<MessageSquare size={32} />}
          title="Interview Prep"
          description="Interactive interview features will be implemented in a later step. You will be able to practice answering questions tailored to your target roles."
        />
      </GlassCard>
    </div>
  );
};
