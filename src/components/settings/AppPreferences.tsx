import React from 'react';
import { SettingsSection } from './SettingsSection';
import { Sliders, LayoutDashboard } from 'lucide-react';
import type { DashboardViewType } from '../../hooks/useSettings';

interface AppPreferencesProps {
  difficulty: string;
  questionCount: number;
  dashboardView: DashboardViewType;
  onDifficultyChange: (val: string) => void;
  onQuestionCountChange: (val: number) => void;
  onDashboardViewChange: (val: DashboardViewType) => void;
}

export const AppPreferences: React.FC<AppPreferencesProps> = ({
  difficulty,
  questionCount,
  dashboardView,
  onDifficultyChange,
  onQuestionCountChange,
  onDashboardViewChange
}) => {
  return (
    <SettingsSection 
      title="Application Preferences" 
      description="Configure default behaviors for specific tools."
      icon={<Sliders size={24} />}
    >
      <div className="space-y-6">
        
        {/* Dashboard Settings */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-text-primary flex items-center space-x-2">
            <LayoutDashboard size={16} className="text-brand-400" />
            <span>Dashboard Layout</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 text-sm text-text-secondary cursor-pointer">
              <input 
                type="radio" 
                className="text-action-primary bg-surface border-border-base focus:ring-action-primary"
                name="dashboardView"
                checked={dashboardView === 'standard'}
                onChange={() => onDashboardViewChange('standard')}
              />
              <span>Standard (Full details)</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-text-secondary cursor-pointer">
              <input 
                type="radio" 
                className="text-action-primary bg-surface border-border-base focus:ring-action-primary"
                name="dashboardView"
                checked={dashboardView === 'compact'}
                onChange={() => onDashboardViewChange('compact')}
              />
              <span>Compact (Overview only)</span>
            </label>
          </div>
        </div>

        <div className="border-t border-border-base pt-6 space-y-4">
          <h3 className="text-sm font-medium text-text-primary mb-2">Interview Practice Defaults</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-text-secondary">Default Difficulty</label>
              <select 
                value={difficulty}
                onChange={(e) => onDifficultyChange(e.target.value)}
                className="w-full bg-surface border border-border-base rounded-lg px-3 py-2 text-sm text-text-primary focus-ring"
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Senior">Senior</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-text-secondary">Questions per Session</label>
              <select 
                value={questionCount}
                onChange={(e) => onQuestionCountChange(Number(e.target.value))}
                className="w-full bg-surface border border-border-base rounded-lg px-3 py-2 text-sm text-text-primary focus-ring"
              >
                <option value={3}>3 Questions (Quick)</option>
                <option value={5}>5 Questions (Standard)</option>
                <option value={10}>10 Questions (Full)</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </SettingsSection>
  );
};
