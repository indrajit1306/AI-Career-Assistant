import { useState, useEffect, useCallback } from 'react';
import { safeGet, safeSet, STORAGE_KEYS } from '../utils/storage';

export type ThemeType = 'dark' | 'light' | 'system';
export type DashboardViewType = 'standard' | 'compact';

export interface AppSettings {
  theme: ThemeType;
  reduceMotion: boolean;
  defaultInterviewDifficulty: string;
  defaultInterviewQuestionCount: number;
  dashboardView: DashboardViewType;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark', // Project default is dark
  reduceMotion: false,
  defaultInterviewDifficulty: 'Intermediate',
  defaultInterviewQuestionCount: 5,
  dashboardView: 'standard',
};

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const stored = safeGet<AppSettings>(STORAGE_KEYS.SETTINGS);
    return stored ? { ...DEFAULT_SETTINGS, ...stored } : DEFAULT_SETTINGS;
  });

  const updateSetting = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      safeSet(STORAGE_KEYS.SETTINGS, newSettings);
      return newSettings;
    });
  }, []);

  // Apply Theme
  useEffect(() => {
    const applyTheme = (theme: ThemeType) => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');

      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add(systemPrefersDark ? 'dark' : 'light');
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme(settings.theme);

    // Listen for system changes if set to system
    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [settings.theme]);

  // Apply Reduced Motion
  useEffect(() => {
    const applyMotion = (reduce: boolean) => {
      const root = document.documentElement;
      if (reduce) {
        root.classList.add('reduce-motion');
      } else {
        root.classList.remove('reduce-motion');
      }
    };

    applyMotion(settings.reduceMotion);
  }, [settings.reduceMotion]);

  return {
    settings,
    updateSetting,
  };
};
