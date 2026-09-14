import React from 'react';
import { Heading } from '../components/ui/Heading';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { FileText } from 'lucide-react';

export const Resume: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <header>
        <Heading level={1}>Resume</Heading>
        <p className="text-text-secondary mt-1">Create, upload, edit, and improve your resume.</p>
      </header>
      
      <GlassCard className="flex-1 flex items-center justify-center">
        <EmptyState 
          icon={<FileText size={32} />}
          title="Resume Builder"
          description="Resume features will be implemented in a later step. You will be able to manage your professional experience and tailor resumes for specific roles."
        />
      </GlassCard>
    </div>
  );
};
