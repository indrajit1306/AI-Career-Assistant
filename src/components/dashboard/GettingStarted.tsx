import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Circle, CheckCircle } from 'lucide-react';
import type { DashboardData } from '../../utils/dashboardData';

interface GettingStartedProps {
  readiness: DashboardData['readiness'];
}

export const GettingStarted = ({ readiness }: GettingStartedProps) => {
  const steps = [
    { label: 'Create your resume', completed: readiness.resumeCompleted },
    { label: 'Analyze a target job', completed: readiness.jobsCompleted },
    { label: 'Review ATS compatibility', completed: readiness.atsCompleted },
    { label: 'Practice an interview', completed: readiness.interviewCompleted },
  ];

  return (
    <GlassCard padding="lg" className="h-full dash-card">
      <Heading level={3} className="mb-6">Getting Started</Heading>
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className={`flex items-start gap-3 group ${step.completed ? 'opacity-80' : ''}`}>
            <div className={`mt-0.5 transition-colors ${step.completed ? 'text-brand-500' : 'text-border-base group-hover:text-brand-400'}`}>
              {step.completed ? <CheckCircle size={18} /> : <Circle size={18} />}
            </div>
            <span className={`transition-colors ${step.completed ? 'text-text-muted line-through decoration-text-muted/30' : 'text-text-secondary group-hover:text-text-primary'}`}>
              {step.label}
            </span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
};
