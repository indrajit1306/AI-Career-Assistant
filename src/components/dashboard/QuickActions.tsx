import { Link } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { FileText, Briefcase, CheckCircle, MessageSquare, ChevronRight } from 'lucide-react';
import type { DashboardData } from '../../utils/dashboardData';

interface QuickActionsProps {
  readiness: DashboardData['readiness'];
  hasActivity: boolean;
}

export const QuickActions = ({ readiness, hasActivity }: QuickActionsProps) => {
  const actions = [
    { 
      name: readiness.resumeCompleted ? 'Improve Your Resume' : 'Create Your Resume', 
      path: '/resume', 
      icon: <FileText size={20} /> 
    },
    { 
      name: readiness.jobsCompleted ? 'Analyze a Job Description' : 'Add Your First Job', 
      path: '/jobs', 
      icon: <Briefcase size={20} /> 
    },
    { 
      name: readiness.atsCompleted ? 'Run New ATS Analysis' : 'Check ATS Compatibility', 
      path: '/ats', 
      icon: <CheckCircle size={20} /> 
    },
    { 
      name: readiness.interviewCompleted ? 'Continue Practicing' : 'Start Interview Practice', 
      path: '/interview', 
      icon: <MessageSquare size={20} /> 
    },
  ];

  return (
    <GlassCard padding="lg" className="dash-card">
      <Heading level={3} className="mb-6">{hasActivity ? 'Continue Preparing' : 'Quick Actions'}</Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link 
            key={action.path}
            to={action.path}
            className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border-base hover:border-brand-500/50 hover:bg-surface-elevated transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary"
          >
            <div className="flex items-center gap-3 text-text-primary">
              <div className="text-brand-400">{action.icon}</div>
              <span className="font-medium text-sm sm:text-base">{action.name}</span>
            </div>
            <ChevronRight size={18} className="text-text-secondary group-hover:translate-x-1 group-hover:text-text-primary transition-all flex-shrink-0" />
          </Link>
        ))}
      </div>
    </GlassCard>
  );
};
