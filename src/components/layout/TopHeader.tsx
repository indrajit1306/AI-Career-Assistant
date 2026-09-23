import { useLocation } from 'react-router-dom';
import { Menu, Sparkles, Sun, Moon } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { useSettings } from '../../hooks/useSettings';

export interface TopHeaderProps extends HTMLAttributes<HTMLElement> {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/resume': 'Resume Builder',
  '/jobs': 'Job Analyzer',
  '/ats': 'ATS Check',
  '/interview': 'Interview Prep',
};

export const TopHeader: React.FC<TopHeaderProps> = ({ onMenuClick, isMenuOpen, ...props }) => {
  const location = useLocation();
  const title = routeTitles[location.pathname] || 'AI Career Assistant';
  const { settings, updateSetting } = useSettings();

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSetting('theme', newTheme);
  };

  return (
    <header className="h-16 border-b border-border-base bg-surface flex items-center px-4 md:px-8 justify-between z-10 shrink-0" {...props}>
      <div className="flex items-center gap-3">
        <button 
          className="md:hidden p-2 -ml-2 text-text-secondary hover:bg-surface-elevated hover:text-text-primary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary transition-colors"
          onClick={onMenuClick}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-drawer"
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 text-text-secondary hover:bg-surface-elevated hover:text-text-primary rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary transition-colors"
          aria-label={`Switch to ${settings.theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${settings.theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {settings.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <div className="flex items-center gap-2 text-brand-400 opacity-80">
          <Sparkles size={16} />
          <span className="text-sm font-medium hidden sm:inline-block">AI Workspace</span>
        </div>
      </div>
    </header>
  );
};
