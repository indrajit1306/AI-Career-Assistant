import React from 'react';
import { SettingsSection } from './SettingsSection';
import { Info, Code, ExternalLink } from 'lucide-react';
import { ACA_DATA_VERSION } from '../../utils/storage';

export const AboutSection: React.FC = () => {
  return (
    <SettingsSection 
      title="About" 
      icon={<Info size={24} />}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Version</span>
          <span className="text-sm font-medium text-text-primary">1.0.0 (Data v{ACA_DATA_VERSION})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Environment</span>
          <span className="text-sm font-medium text-brand-400 bg-brand-500/10 px-2 py-1 rounded">Local Demo Mode</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Tech Stack</span>
          <span className="text-sm font-medium text-text-primary text-right">React 18, TailwindCSS, GSAP, Lucide</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border-base flex gap-4">
        <a 
          href="#"
          className="flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <Code size={16} className="mr-2" />
          Source Code
        </a>
        <a 
          href="#"
          className="flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <ExternalLink size={16} className="mr-2" />
          Documentation
        </a>
      </div>
    </SettingsSection>
  );
};
