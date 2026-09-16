import { useState, useCallback, useEffect } from 'react';
import type { Job } from '../types/job';
import { MOCK_JOB } from '../types/job';
import type { AnalysisHistoryRecord, ATSAnalysisResult } from '../types/ats';
import { useResume } from './useResume';
import { runATSAnalysis } from '../utils/atsScoring';

const JOBS_STORAGE_KEY = 'aca_jobs';
const HISTORY_STORAGE_KEY = 'aca_analyses';

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
    try {
      const storedJobs = localStorage.getItem(JOBS_STORAGE_KEY);
      let loadedJobs: Job[] = [];
      if (storedJobs) {
        loadedJobs = JSON.parse(storedJobs);
      }
      
      // Inject MOCK_JOB if no jobs exist to allow testing Step 7
      if (loadedJobs.length === 0) {
        loadedJobs = [MOCK_JOB];
        localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(loadedJobs));
      }
      setJobs(loadedJobs);

      if (loadedJobs.length > 0) {
        setSelectedJobId(loadedJobs[0].id);
      }

      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error('Failed to parse local storage data for ATS', e);
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
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
      
      setIsAnalyzing(false);
    }, 1500);
  }, [resumeData, selectedJobId, jobs, history]);

  const deleteHistory = useCallback((id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
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
