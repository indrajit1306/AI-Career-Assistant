import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { EmptyState } from '../ui/EmptyState';
import { Activity, FileText, Briefcase, CheckCircle, MessageSquare } from 'lucide-react';
import type { DashboardActivity } from '../../utils/dashboardData';

interface RecentActivityProps {
  activities: DashboardActivity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'resume_updated': return <FileText size={16} />;
      case 'job_added': return <Briefcase size={16} />;
      case 'ats_analyzed': return <CheckCircle size={16} />;
      case 'interview_completed': return <MessageSquare size={16} />;
      default: return <Activity size={16} />;
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    // Very simple relative time formatting
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes || 1}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <GlassCard padding="lg" className="h-full flex flex-col dash-card">
      <Heading level={3} className="mb-6">Recent Activity</Heading>
      
      {activities.length === 0 ? (
        <div className="flex-1 flex items-center justify-center min-h-[200px]">
          <EmptyState 
            icon={<Activity size={32} />}
            title="No recent activity"
            description="Your activity will appear here as you use the Career Assistant."
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          <div className="relative border-l border-border-base ml-3 space-y-6 pb-2">
            {activities.map((activity, idx) => (
              <div key={activity.id + idx} className="relative pl-6">
                <div className="absolute -left-3 top-0.5 bg-surface-elevated border border-border-base rounded-full p-1 text-brand-400">
                  {getIcon(activity.type)}
                </div>
                <div>
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium text-text-primary leading-tight">{activity.title}</h4>
                    <span className="text-xs text-text-muted whitespace-nowrap ml-2">
                      {formatDate(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
};
