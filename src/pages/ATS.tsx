import React from 'react';
import { Heading } from '../components/ui/Heading';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ATS: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <header>
        <Heading level={1}>ATS Analyzer</Heading>
        <p className="text-text-secondary mt-1">Check how applicant tracking systems will read your resume.</p>
      </header>
      
      <GlassCard className="flex-1 flex items-center justify-center">
        <EmptyState 
          icon={<CheckCircle size={32} />}
          title="ATS Analyzer Placeholder"
          description="ATS functionality will be implemented here."
          action={<Button variant="primary">Run ATS Check</Button>}
        />
      </GlassCard>
    </div>
  );
};
