import { useState, useCallback, useEffect } from 'react';
import type { JobAnalysisResult, ResumeMatchResult } from '../services/ai/aiTypes';

const JOB_ANALYSES_STORAGE_KEY = 'aca_job_analyses';
const RESUME_MATCHES_STORAGE_KEY = 'aca_resume_matches';

export const useAIAnalyses = () => {
  const [jobAnalyses, setJobAnalyses] = useState<Record<string, JobAnalysisResult>>({});
  const [resumeMatches, setResumeMatches] = useState<Record<string, ResumeMatchResult>>({});

  useEffect(() => {
    try {
      const storedAnalyses = localStorage.getItem(JOB_ANALYSES_STORAGE_KEY);
      if (storedAnalyses) {
        setJobAnalyses(JSON.parse(storedAnalyses));
      }

      const storedMatches = localStorage.getItem(RESUME_MATCHES_STORAGE_KEY);
      if (storedMatches) {
        setResumeMatches(JSON.parse(storedMatches));
      }
    } catch (e) {
      console.error('Failed to parse AI analyses from local storage', e);
    }
  }, []);

  const saveJobAnalysis = useCallback((jobId: string, result: JobAnalysisResult) => {
    setJobAnalyses(prev => {
      const updated = { ...prev, [jobId]: result };
      localStorage.setItem(JOB_ANALYSES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const saveResumeMatch = useCallback((jobId: string, result: ResumeMatchResult) => {
    setResumeMatches(prev => {
      const updated = { ...prev, [jobId]: result };
      localStorage.setItem(RESUME_MATCHES_STORAGE_KEY, JSON.stringify(updated));
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
