import { useState, useCallback } from 'react';
import { INITIAL_RESUME_DATA } from '../types/resume';
import type { ResumeData } from '../types/resume';

const STORAGE_KEY = 'aca_resume';

export const useResume = () => {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse resume from local storage', e);
    }
    return INITIAL_RESUME_DATA;
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
    setHasUnsavedChanges(true);
  };

  const updateSummary = (value: string) => {
    setData((prev) => ({ ...prev, summary: value }));
    setHasUnsavedChanges(true);
  };

  const setExperience = (experience: ResumeData['experience']) => {
    setData((prev) => ({ ...prev, experience }));
    setHasUnsavedChanges(true);
  };

  const setEducation = (education: ResumeData['education']) => {
    setData((prev) => ({ ...prev, education }));
    setHasUnsavedChanges(true);
  };

  const setSkills = (skills: ResumeData['skills']) => {
    setData((prev) => ({ ...prev, skills }));
    setHasUnsavedChanges(true);
  };

  const setProjects = (projects: ResumeData['projects']) => {
    setData((prev) => ({ ...prev, projects }));
    setHasUnsavedChanges(true);
  };

  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setHasUnsavedChanges(false);
    } catch (e) {
      console.error('Failed to save resume draft', e);
    }
  }, [data]);

  const resetResume = useCallback(() => {
    setData(INITIAL_RESUME_DATA);
    setHasUnsavedChanges(true);
  }, []);

  return {
    data,
    hasUnsavedChanges,
    updatePersonalInfo,
    updateSummary,
    setExperience,
    setEducation,
    setSkills,
    setProjects,
    saveDraft,
    resetResume,
  };
};
