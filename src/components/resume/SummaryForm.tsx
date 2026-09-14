import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Textarea } from '../ui/Textarea';

interface Props {
  summary: string;
  onChange: (value: string) => void;
}

export const SummaryForm: React.FC<Props> = ({ summary, onChange }) => {
  return (
    <GlassCard padding="lg" className="mb-6">
      <Heading level={3} className="mb-2">Professional Summary</Heading>
      <p className="text-sm text-text-muted mb-4">Write a concise summary of your professional background and career goals.</p>
      <Textarea 
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="I am a software engineer with 5 years of experience..."
        rows={4}
      />
    </GlassCard>
  );
};
