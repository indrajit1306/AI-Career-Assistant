import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { ProgressBar } from '../ui/ProgressBar';

export const CareerProgress = () => {
  return (
    <GlassCard padding="lg" className="h-full flex flex-col dash-card">
      <Heading level={3} className="mb-6">Career Progress</Heading>
      <div className="space-y-6 flex-1 flex flex-col justify-center">
        <ProgressBar label="Resume Readiness (Demo)" value={0} />
        <ProgressBar label="Job Search Progress (Demo)" value={0} />
        <ProgressBar label="Interview Preparation (Demo)" value={0} />
      </div>
      <p className="text-xs text-text-muted mt-6 italic">
        * Values are demo placeholders and will be updated based on your activity.
      </p>
    </GlassCard>
  );
};
