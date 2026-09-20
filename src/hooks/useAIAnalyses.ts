import { useState, useCallback, useEffect } from 'react';
import type { JobAnalysisResult, ResumeMatchResult } from '../services/ai/aiTypes';
import { safeGet, safeSet, STORAGE_KEYS } from '../utils/storage';

export const useAIAnalyses = () => {
  const [jobAnalyses, setJobAnalyses] = useState<Record<string, JobAnalysisResult>>({});
  const [resumeMatches, setResumeMatches] = useState<Record<string, ResumeMatchResult>>({});

  useEffect(() => {
    const storedAnalyses = safeGet<Record<string, JobAnalysisResult>>(STORAGE_KEYS.JOB_ANALYSES);
    if (storedAnalyses) {
      setJobAnalyses(storedAnalyses);
    }

    const storedMatches = safeGet<Record<string, ResumeMatchResult>>(STORAGE_KEYS.RESUME_MATCHES);
    if (storedMatches) {
      setResumeMatches(storedMatches);
    }
  }, []);

  const saveJobAnalysis = useCallback((jobId: string, result: JobAnalysisResult) => {
    setJobAnalyses(prev => {
      const updated = { ...prev, [jobId]: result };
      safeSet(STORAGE_KEYS.JOB_ANALYSES, updated);
      return updated;
    });
  }, []);

  const saveResumeMatch = useCallback((jobId: string, result: ResumeMatchResult) => {
    setResumeMatches(prev => {
      const updated = { ...prev, [jobId]: result };
      safeSet(STORAGE_KEYS.RESUME_MATCHES, updated);
      return updated;
    });
  }, []);

  return {
    jobAnalyses,
    resumeMatches,
    saveJobAnalysis,
    saveResumeMatch
  };
};
