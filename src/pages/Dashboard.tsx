import React, { useEffect, useRef } from 'react';
import { DashboardWelcome } from '../components/dashboard/DashboardWelcome';
import { OverviewStatCard } from '../components/dashboard/OverviewStatCard';
import { CareerProgress } from '../components/dashboard/CareerProgress';
import { QuickActions } from '../components/dashboard/QuickActions';
import { GettingStarted } from '../components/dashboard/GettingStarted';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { animateStagger } from '../animations';
import { FileText, Briefcase, MessageSquare, Target } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.dash-card');
      animateStagger(Array.from(cards), { y: 20, delay: 0.1 });
    }
  }, []);

  return (
    <div className="space-y-8 pb-8" ref={containerRef}>
      <DashboardWelcome />
      
      {/* Overview Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewStatCard 
          icon={<FileText size={24} />}
          label="Resume Score"
          value="--"
          description="Demo value"
        />
        <OverviewStatCard 
          icon={<Briefcase size={24} />}
          label="Jobs Analyzed"
          value="0"
          description="Demo value"
        />
        <OverviewStatCard 
          icon={<MessageSquare size={24} />}
          label="Interviews Practiced"
          value="0"
          description="Demo value"
        />
        <OverviewStatCard 
          icon={<Target size={24} />}
          label="Applications Tracked"
          value="0"
          description="Demo value"
        />
      </section>

      {/* Progress & Getting Started */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CareerProgress />
        </div>
        <div className="lg:col-span-1">
          <GettingStarted />
        </div>
      </section>

      {/* Quick Actions & Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivity />
      </section>
    </div>
  );
};
