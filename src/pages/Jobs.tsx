import React from 'react';
import { Heading } from '../components/ui/Heading';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Briefcase } from 'lucide-react';

export const Jobs: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <header>
        <Heading level={1}>Jobs</Heading>
        <p className="text-text-secondary mt-1">Analyze job descriptions and compare them with your resume.</p>
      </header>
      
      <GlassCard className="flex-1 flex items-center justify-center">
        <EmptyState 
          icon={<Briefcase size={32} />}
          title="Job Analyzer"
          description="Job analysis functionality will be implemented in a later step. You will be able to paste job descriptions and see how well your skills match."
        />
      </GlassCard>
    </div>
  );
};
