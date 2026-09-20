export const ACA_DATA_VERSION = "1.0";

export const STORAGE_KEYS = {
  RESUME: 'aca_resume',
  JOBS: 'aca_jobs',
  ANALYSES: 'aca_analyses',
  JOB_ANALYSES: 'aca_job_analyses',
  RESUME_MATCHES: 'aca_resume_matches',
  INTERVIEWS: 'aca_interviews',
  ASSISTANT_CHAT: 'aca_assistant_chat',
  SETTINGS: 'aca_settings',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

export interface StorageData<T> {
  version: string;
  timestamp: string;
  data: T;
}

export const safeGet = <T>(key: StorageKey | string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

export const safeSet = <T>(key: StorageKey | string, data: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('Storage quota exceeded.');
    }
    return false;
  }
};

export const safeRemove = (key: StorageKey | string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

export const clearAllProjectStorage = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    safeRemove(key);
  });
};

export const exportAllData = (): string => {
  const exportData = {
    version: ACA_DATA_VERSION,
    exportedAt: new Date().toISOString(),
    resume: safeGet(STORAGE_KEYS.RESUME) || null,
    jobs: safeGet(STORAGE_KEYS.JOBS) || [],
    atsAnalyses: safeGet(STORAGE_KEYS.ANALYSES) || [],
    jobAnalyses: safeGet(STORAGE_KEYS.JOB_ANALYSES) || {},
    resumeMatches: safeGet(STORAGE_KEYS.RESUME_MATCHES) || {},
    interviews: safeGet(STORAGE_KEYS.INTERVIEWS) || [],
    interviewEvaluations: [], // Implicitly stored in interviews currently
    assistantChat: safeGet(STORAGE_KEYS.ASSISTANT_CHAT) || [],
    settings: safeGet(STORAGE_KEYS.SETTINGS) || {},
  };

  return JSON.stringify(exportData, null, 2);
};
