import React, { useEffect, useRef } from 'react';
import { DashboardWelcome } from '../components/dashboard/DashboardWelcome';
import { OverviewStatCard } from '../components/dashboard/OverviewStatCard';
import { CareerProgress } from '../components/dashboard/CareerProgress';
import { QuickActions } from '../components/dashboard/QuickActions';
import { GettingStarted } from '../components/dashboard/GettingStarted';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { animateStagger } from '../animations';
import { FileText, Briefcase, MessageSquare, Target } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';

export const Dashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = useDashboard();

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.dash-card');
      // Adding a small timeout ensures the DOM has updated with the dynamic cards before animating
      setTimeout(() => {
        animateStagger(Array.from(cards), { y: 20, delay: 0.1 });
      }, 50);
    }
  }, [data.readiness]); // Re-run animation if major state changes occur, but mostly just on mount

  const hasActivity = data.recentActivity.length > 0;

  return (
    <div className="space-y-8 pb-8" ref={containerRef}>
      <DashboardWelcome />
      
      {/* Overview Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewStatCard 
          icon={<FileText size={24} />}
          label="Resume"
          value={data.resume.hasContent ? 'Draft Saved' : 'Not created yet'}
          description={data.resume.hasContent ? 'Ready to use' : 'Start building your resume'}
          to="/resume"
        />
        <OverviewStatCard 
          icon={<Briefcase size={24} />}
          label="Jobs Analyzed"
          value={data.jobs.totalSaved.toString()}
          description={`${data.jobs.applied} applied, ${data.jobs.interview} interviews`}
          to="/jobs"
        />
        <OverviewStatCard 
          icon={<Target size={24} />}
          label="ATS Compatibility"
          value={data.ats.latestScore !== null ? `${data.ats.latestScore}%` : '--'}
          description={data.ats.latestScore !== null ? 'Estimated Compatibility' : 'Not analyzed yet'}
          to="/ats"
        />
        <OverviewStatCard 
          icon={<MessageSquare size={24} />}
          label="Interview Practice"
          value={data.interviews.totalSessions.toString()}
          description={data.interviews.totalSessions > 0 ? `${data.interviews.questionsPracticed} questions practiced` : 'Not started yet'}
          to="/interview"
        />
      </section>

      {/* Progress & Getting Started */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CareerProgress readiness={data.readiness} />
        </div>
        <div className="lg:col-span-1">
          <GettingStarted readiness={data.readiness} />
        </div>
      </section>

      {/* Quick Actions & Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions readiness={data.readiness} hasActivity={hasActivity} />
        <RecentActivity activities={data.recentActivity} />
      </section>
    </div>
  );
};
