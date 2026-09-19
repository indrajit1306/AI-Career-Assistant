import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { ProgressBar } from '../ui/ProgressBar';
import type { DashboardData } from '../../utils/dashboardData';

interface CareerProgressProps {
  readiness: DashboardData['readiness'];
}

export const CareerProgress = ({ readiness }: CareerProgressProps) => {
  const resumeValue = readiness.resumeCompleted ? 100 : 0;
  const jobsValue = readiness.jobsCompleted ? 100 : 0;
  const atsValue = readiness.atsCompleted ? 100 : 0;
  const interviewValue = readiness.interviewCompleted ? 100 : 0;

  return (
    <GlassCard padding="lg" className="h-full flex flex-col dash-card">
      <Heading level={3} className="mb-6">Career Preparation</Heading>
      <div className="space-y-6 flex-1 flex flex-col justify-center">
        <ProgressBar label="Resume" value={resumeValue} />
        <ProgressBar label="Jobs" value={jobsValue} />
        <ProgressBar label="ATS" value={atsValue} />
        <ProgressBar label="Interview" value={interviewValue} />
      </div>
      <p className="text-xs text-text-muted mt-6 italic">
        These indicators reflect activity inside this app and are not a measure of employability or hiring readiness.
      </p>
    </GlassCard>
  );
};
