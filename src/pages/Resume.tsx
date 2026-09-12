import React from 'react';
import { Heading } from '../components/ui/Heading';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Resume: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <header>
        <Heading level={1}>Resume Builder</Heading>
        <p className="text-text-secondary mt-1">Create, manage, and optimize your resumes.</p>
      </header>
      
      <GlassCard className="flex-1 flex items-center justify-center">
        <EmptyState 
          icon={<FileText size={32} />}
          title="Resume Builder Placeholder"
          description="Resume functionality will be implemented here."
          action={<Button variant="primary">Create New Resume</Button>}
        />
      </GlassCard>
    </div>
  );
};
