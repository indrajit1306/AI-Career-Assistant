import React from 'react';
import { SettingsSection } from './SettingsSection';
import { Sparkles, ShieldAlert } from 'lucide-react';

export const AIPreferences: React.FC = () => {
  return (
    <SettingsSection 
      title="AI Integration" 
      description="Manage how the application interacts with AI providers."
      icon={<Sparkles size={24} />}
    >
      <div className="bg-surface-elevated rounded-lg p-4 border border-border-base flex items-start space-x-4">
        <div className="bg-brand-500/20 text-brand-400 p-2 rounded-full shrink-0">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary">Current Provider: Mock AI (Local)</h3>
          <p className="text-xs text-text-secondary mt-1">
            The application is currently running in local demonstration mode. AI responses are generated using a localized mock provider to ensure maximum privacy and security without requiring external API keys.
          </p>
        </div>
      </div>

      <div className="bg-error/10 border border-error/30 rounded-lg p-4 flex items-start space-x-3 mt-4">
        <ShieldAlert className="text-error shrink-0 mt-0.5" size={18} />
        <div>
          <h4 className="text-sm font-medium text-error">Security Notice</h4>
          <p className="text-xs text-error/80 mt-1 leading-relaxed">
            API keys should never be stored in browser `localStorage` or frontend code. 
            If you wish to use a real LLM provider in the future, connect this application to a secure backend server that manages authentication and secret keys safely.
          </p>
        </div>
      </div>
    </SettingsSection>
  );
};
