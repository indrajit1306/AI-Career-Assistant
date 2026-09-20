import React from 'react';
import { GlassCard } from '../ui/GlassCard';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children, icon }) => {
  return (
    <GlassCard className="p-6 mb-6">
      <div className="flex items-start mb-6 border-b border-border-base pb-4">
        {icon && (
          <div className="mr-4 mt-1 text-action-primary p-2 bg-action-primary/10 rounded-lg">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-text-primary">{title}</h2>
          {description && (
            <p className="text-sm text-text-secondary mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </GlassCard>
  );
};
