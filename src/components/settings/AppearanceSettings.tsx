import React from 'react';
import { SettingsSection } from './SettingsSection';
import { Palette, Moon, Sun, Monitor, Activity } from 'lucide-react';
import type { ThemeType } from '../../hooks/useSettings';

interface AppearanceSettingsProps {
  theme: ThemeType;
  reduceMotion: boolean;
  onThemeChange: (theme: ThemeType) => void;
  onMotionChange: (reduce: boolean) => void;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ 
  theme, 
  reduceMotion, 
  onThemeChange, 
  onMotionChange 
}) => {
  return (
    <SettingsSection 
      title="Appearance" 
      description="Customize how the application looks and feels."
      icon={<Palette size={24} />}
    >
      {/* Theme Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-text-primary block">Theme</label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onThemeChange('dark')}
            className={`flex flex-col items-center p-4 rounded-xl border ${
              theme === 'dark' 
                ? 'border-action-primary bg-action-primary/10 text-action-primary' 
                : 'border-border-base bg-surface hover:bg-surface-elevated text-text-secondary'
            } transition-colors`}
          >
            <Moon size={24} className="mb-2" />
            <span className="text-sm font-medium">Dark</span>
          </button>
          
          <button
            onClick={() => onThemeChange('light')}
            className={`flex flex-col items-center p-4 rounded-xl border ${
              theme === 'light' 
                ? 'border-action-primary bg-action-primary/10 text-action-primary' 
                : 'border-border-base bg-surface hover:bg-surface-elevated text-text-secondary'
            } transition-colors`}
          >
            <Sun size={24} className="mb-2" />
            <span className="text-sm font-medium">Light</span>
          </button>
          
          <button
            onClick={() => onThemeChange('system')}
            className={`flex flex-col items-center p-4 rounded-xl border ${
              theme === 'system' 
                ? 'border-action-primary bg-action-primary/10 text-action-primary' 
                : 'border-border-base bg-surface hover:bg-surface-elevated text-text-secondary'
            } transition-colors`}
          >
            <Monitor size={24} className="mb-2" />
            <span className="text-sm font-medium">System</span>
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-border-base">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Activity size={18} className="text-text-secondary" />
              <label className="text-sm font-medium text-text-primary">Reduce Animations</label>
            </div>
            <p className="text-xs text-text-muted mt-1">
              Disable non-essential GSAP and CSS animations.
            </p>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={reduceMotion}
              onChange={(e) => onMotionChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-action-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-action-primary border border-border-base"></div>
          </label>
        </div>
      </div>
    </SettingsSection>
  );
};
