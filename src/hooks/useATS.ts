import { useState, useCallback, useEffect } from 'react';
import type { Job } from '../types/job';
import { MOCK_JOB } from '../types/job';
import type { AnalysisHistoryRecord, ATSAnalysisResult } from '../types/ats';
import { useResume } from './useResume';
import { runATSAnalysis } from '../utils/atsScoring';

import { safeGet, safeSet, STORAGE_KEYS } from '../utils/storage';

export const useATS = () => {
  const { data: resumeData } = useResume();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [history, setHistory] = useState<AnalysisHistoryRecord[]>([]);
  
  // For the active analysis session
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<ATSAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load jobs and history on mount
  useEffect(() => {
    let loadedJobs = safeGet<Job[]>(STORAGE_KEYS.JOBS) || [];
    
    // Inject MOCK_JOB if no jobs exist to allow testing Step 7
    if (loadedJobs.length === 0) {
      loadedJobs = [MOCK_JOB];
      safeSet(STORAGE_KEYS.JOBS, loadedJobs);
    }
    setJobs(loadedJobs);

    if (loadedJobs.length > 0) {
      setSelectedJobId(loadedJobs[0].id);
    }

    const storedHistory = safeGet<AnalysisHistoryRecord[]>(STORAGE_KEYS.ANALYSES);
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);

  const analyze = useCallback(() => {
    if (!selectedJobId) return;
    
    const targetJob = jobs.find(j => j.id === selectedJobId);
    if (!targetJob) return;

    setIsAnalyzing(true);
    
    // Simulate a slight delay to feel like "AI Analysis"
    setTimeout(() => {
      const result = runATSAnalysis(resumeData, targetJob);
      setCurrentResult(result);
      
      const historyRecord: AnalysisHistoryRecord = {
        ...result,
        jobTitle: targetJob.title,
        company: targetJob.company
      };
      
      const newHistory = [historyRecord, ...history].slice(0, 50); // keep last 50
      setHistory(newHistory);
      safeSet(STORAGE_KEYS.ANALYSES, newHistory);
      
      setIsAnalyzing(false);
    }, 1500);
  }, [resumeData, selectedJobId, jobs, history]);

  const deleteHistory = useCallback((id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    safeSet(STORAGE_KEYS.ANALYSES, newHistory);
  }, [history]);

  const viewHistory = useCallback((id: string) => {
    const record = history.find(h => h.id === id);
    if (record) {
      setCurrentResult(record);
      setSelectedJobId(record.jobId);
    }
  }, [history]);

  const clearCurrentResult = useCallback(() => {
    setCurrentResult(null);
  }, []);

  return {
    resumeData,
    jobs,
    history,
    selectedJobId,
    setSelectedJobId,
    currentResult,
    isAnalyzing,
    analyze,
    deleteHistory,
    viewHistory,
    clearCurrentResult
  };
};
