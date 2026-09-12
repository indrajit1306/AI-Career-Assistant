import React from 'react';
import { Heading } from '../components/ui/Heading';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { LayoutDashboard } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <Heading level={1}>Dashboard</Heading>
        <p className="text-text-secondary mt-1">Welcome to your AI Career Assistant dashboard.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-brand-500/50 transition-colors">
          <h3 className="font-semibold text-text-primary">Resumes</h3>
          <p className="text-3xl font-bold text-brand-400 mt-2">0</p>
        </Card>
        <Card className="hover:border-brand-500/50 transition-colors">
          <h3 className="font-semibold text-text-primary">Jobs Analyzed</h3>
          <p className="text-3xl font-bold text-brand-400 mt-2">0</p>
        </Card>
        <Card className="hover:border-brand-500/50 transition-colors">
          <h3 className="font-semibold text-text-primary">Interviews Prep</h3>
          <p className="text-3xl font-bold text-brand-400 mt-2">0</p>
        </Card>
      </div>
      
      <Card elevated className="min-h-[300px] flex items-center justify-center">
        <EmptyState 
          icon={<LayoutDashboard size={32} />}
          title="No Recent Activity"
          description="Your activity chart and insights will appear here once you start using the tools."
        />
      </Card>
    </div>
  );
};
