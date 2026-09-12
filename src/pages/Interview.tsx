import React from 'react';
import { Heading } from '../components/ui/Heading';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Interview: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <header>
        <Heading level={1}>Interview Prep</Heading>
        <p className="text-text-secondary mt-1">Practice text-based mock interviews with AI.</p>
      </header>
      
      <GlassCard className="flex-1 flex items-center justify-center">
        <EmptyState 
          icon={<MessageSquare size={32} />}
          title="Interview Prep Placeholder"
          description="Interview practice functionality will be implemented here."
          action={<Button variant="primary">Start Mock Interview</Button>}
        />
      </GlassCard>
    </div>
  );
};
