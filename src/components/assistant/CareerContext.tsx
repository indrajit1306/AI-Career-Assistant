import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { getDashboardData } from '../../utils/dashboardData';
import { FileText, Briefcase, CheckCircle, MessageSquare } from 'lucide-react';

export const CareerContext: React.FC = () => {
  // Use getDashboardData directly as this is a snapshot component
  const data = getDashboardData();
  
  const hasResume = data.readiness.resumeScore > 0;
  const savedJobs = data.activities.filter(a => a.action === 'Added new job').length;
  const atsScore = data.readiness.atsMatchRate;
  const interviewSessions = data.activities.filter(a => a.type === 'interview').length;

  return (
    <GlassCard className="p-5">
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Your Career Context
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-text-primary">
            <div className={`p-2 rounded-lg ${hasResume ? 'bg-success/20 text-success' : 'bg-surface-elevated text-text-muted'}`}>
              <FileText size={16} />
            </div>
            <span className="font-medium text-sm">Resume Profile</span>
          </div>
          <span className="text-sm text-text-secondary">{hasResume ? 'Active' : 'Missing'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-text-primary">
            <div className="p-2 rounded-lg bg-info/20 text-info">
              <Briefcase size={16} />
            </div>
            <span className="font-medium text-sm">Target Jobs</span>
          </div>
          <span className="text-sm text-text-secondary">{savedJobs} Saved</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-text-primary">
            <div className="p-2 rounded-lg bg-warning/20 text-warning">
              <CheckCircle size={16} />
            </div>
            <span className="font-medium text-sm">Latest ATS Score</span>
          </div>
          <span className="text-sm text-text-secondary">{atsScore ? `${atsScore}%` : 'N/A'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-text-primary">
            <div className="p-2 rounded-lg bg-action-primary/20 text-action-primary">
              <MessageSquare size={16} />
            </div>
            <span className="font-medium text-sm">Interview Prep</span>
          </div>
          <span className="text-sm text-text-secondary">{interviewSessions} Sessions</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border-base text-xs text-text-muted">
        This context helps the AI provide personalized recommendations and advice.
      </div>
    </GlassCard>
  );
};
