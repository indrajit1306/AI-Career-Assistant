import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Circle } from 'lucide-react';

export const GettingStarted = () => {
  const steps = [
    { label: 'Create your resume' },
    { label: 'Analyze a target job' },
    { label: 'Review ATS compatibility' },
    { label: 'Practice an interview' },
  ];

  return (
    <GlassCard padding="lg" className="h-full dash-card">
      <Heading level={3} className="mb-6">Getting Started</Heading>
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <div className="mt-0.5 text-border-base group-hover:text-brand-400 transition-colors">
              <Circle size={18} />
            </div>
            <span className="text-text-secondary group-hover:text-text-primary transition-colors">{step.label}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
};
