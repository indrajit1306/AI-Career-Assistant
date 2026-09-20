import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Settings as SettingsIcon } from 'lucide-react';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';
import { AppPreferences } from '../components/settings/AppPreferences';
import { AIPreferences } from '../components/settings/AIPreferences';
import { DataManagement } from '../components/settings/DataManagement';
import { AboutSection } from '../components/settings/AboutSection';
import { useSettings } from '../hooks/useSettings';

const Settings: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings, updateSetting } = useSettings();

  useEffect(() => {
    if (settings.reduceMotion) return;
    
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.settings-animate-up',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }, containerRef);
    
    return () => ctx.revert(); // cleanup
  }, [settings.reduceMotion]);


  return (
    <div className="flex flex-col h-full overflow-hidden" ref={containerRef}>
      <header className="px-6 py-8 md:py-10 shrink-0">
        <div className="flex items-center space-x-3 mb-2 settings-animate-up opacity-0">
          <div className="bg-brand-500/20 p-2 rounded-xl">
            <SettingsIcon className="text-brand-400" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Settings</h1>
        </div>
        <p className="text-text-secondary max-w-2xl settings-animate-up opacity-0">
          Manage your application preferences and local data.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-20 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="settings-animate-up opacity-0">
            <AppearanceSettings 
              theme={settings.theme}
              reduceMotion={settings.reduceMotion}
              onThemeChange={(val) => updateSetting('theme', val)}
              onMotionChange={(val) => updateSetting('reduceMotion', val)}
            />
          </div>

          <div className="settings-animate-up opacity-0">
            <AppPreferences 
              difficulty={settings.defaultInterviewDifficulty}
              questionCount={settings.defaultInterviewQuestionCount}
              dashboardView={settings.dashboardView}
              onDifficultyChange={(val) => updateSetting('defaultInterviewDifficulty', val)}
              onQuestionCountChange={(val) => updateSetting('defaultInterviewQuestionCount', val)}
              onDashboardViewChange={(val) => updateSetting('dashboardView', val)}
            />
          </div>

          <div className="settings-animate-up opacity-0">
            <AIPreferences />
          </div>

          <div className="settings-animate-up opacity-0">
            <DataManagement />
          </div>

          <div className="settings-animate-up opacity-0">
            <AboutSection />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
