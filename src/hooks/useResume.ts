import { useState, useCallback, useEffect } from 'react';
import { INITIAL_RESUME_DATA } from '../types/resume';
import type { ResumeData } from '../types/resume';
import { safeGet, safeSet, STORAGE_KEYS } from '../utils/storage';

export const useResume = () => {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = safeGet<ResumeData>(STORAGE_KEYS.RESUME);
    if (saved) {
      return saved;
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
    safeSet(STORAGE_KEYS.RESUME, data);
    setHasUnsavedChanges(false);
  }, [data]);

  // Manual save only - auto-save removed per user request

  const resetResume = useCallback(() => {
    setData(INITIAL_RESUME_DATA);
    setHasUnsavedChanges(true);
  }, []);

  const discardChanges = useCallback(() => {
    const saved = safeGet<ResumeData>(STORAGE_KEYS.RESUME);
    if (saved) {
      setData(saved);
    } else {
      setData(INITIAL_RESUME_DATA);
    }
    setHasUnsavedChanges(false);
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
    discardChanges,
  };
};
