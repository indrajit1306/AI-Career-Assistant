import React from 'react';
import { Heading } from '../components/ui/Heading';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Briefcase } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Jobs: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <header>
        <Heading level={1}>Job Analyzer</Heading>
        <p className="text-text-secondary mt-1">Analyze job descriptions and compare them with your resume.</p>
      </header>
      
      <GlassCard className="flex-1 flex items-center justify-center">
        <EmptyState 
          icon={<Briefcase size={32} />}
          title="Job Analyzer Placeholder"
          description="Job analysis functionality will be implemented here."
          action={<Button variant="primary">Analyze a Job</Button>}
        />
      </GlassCard>
    </div>
  );
};
