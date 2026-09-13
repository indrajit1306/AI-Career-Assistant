import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { EmptyState } from '../ui/EmptyState';
import { Activity } from 'lucide-react';

export const RecentActivity = () => {
  return (
    <GlassCard padding="lg" className="h-full flex flex-col dash-card">
      <Heading level={3} className="mb-6">Recent Activity</Heading>
      <div className="flex-1 flex items-center justify-center min-h-[200px]">
        <EmptyState 
          icon={<Activity size={32} />}
          title="No activity yet"
          description="Your resume updates, job analyses, and interview practice sessions will appear here."
        />
      </div>
    </GlassCard>
  );
};
