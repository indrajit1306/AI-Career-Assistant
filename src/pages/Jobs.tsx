import React, { useState, useEffect } from 'react';
import { Heading } from '../components/ui/Heading';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Briefcase, Loader2, Sparkles, Building2, MapPin } from 'lucide-react';
import type { Job } from '../types/job';
import { useAIAnalyses } from '../hooks/useAIAnalyses';
import { aiClient } from '../services/ai/aiClient';
import { JobAnalysisPanel } from '../components/jobs/JobAnalysisPanel';
import { safeGet, STORAGE_KEYS } from '../utils/storage';

export const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { jobAnalyses, saveJobAnalysis } = useAIAnalyses();

  useEffect(() => {
    const storedJobs = safeGet<Job[]>(STORAGE_KEYS.JOBS);
    if (storedJobs) {
      setJobs(storedJobs);
      if (storedJobs.length > 0 && !selectedJobId) {
        setSelectedJobId(storedJobs[0].id);
      }
    }
  }, []);

  const handleAnalyze = async () => {
    const job = jobs.find(j => j.id === selectedJobId);
    if (!job) return;

    setIsAnalyzing(true);
    try {
      const result = await aiClient.analyzeJob({ jobDescription: job.description });
      if (result.success && result.data) {
        saveJobAnalysis(job.id, result.data);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <header>
        <Heading level={1}>Jobs</Heading>
        <p className="text-text-secondary mt-1">Analyze job descriptions and compare them with your resume.</p>
      </header>
      
      {jobs.length === 0 ? (
        <GlassCard className="flex-1 flex items-center justify-center">
          <EmptyState 
            icon={<Briefcase size={32} />}
            title="No Saved Jobs"
            description="Go to the ATS Analyzer to add a job, or add one here later."
          />
        </GlassCard>
      ) : (
        <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
          <div className="w-1/3 flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {jobs.map(job => (
              <button
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`text-left w-full transition-all duration-200 ${selectedJobId === job.id ? 'ring-2 ring-brand-500 scale-[1.02]' : 'opacity-70 hover:opacity-100'}`}
              >
                <GlassCard padding="md" className="h-full cursor-pointer hover:bg-surface-elevated/50 transition-colors">
                  <h3 className="font-bold text-text-primary text-lg truncate">{job.title}</h3>
                  <div className="flex items-center text-text-secondary text-sm mt-2">
                    <Building2 size={14} className="mr-1.5" />
                    <span className="truncate">{job.company}</span>
                  </div>
                  <div className="flex items-center text-text-muted text-xs mt-1">
                    <MapPin size={12} className="mr-1.5" />
                    <span>{job.location}</span>
                  </div>
                </GlassCard>
              </button>
            ))}
          </div>
          
          <div className="w-2/3 overflow-y-auto pr-2 custom-scrollbar space-y-6 pb-20">
            {selectedJob && (
              <>
                <GlassCard padding="lg">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary">{selectedJob.title}</h2>
                      <p className="text-brand-400 font-medium text-lg mt-1">{selectedJob.company}</p>
                      <p className="text-text-muted text-sm mt-1">{selectedJob.location}</p>
                    </div>
                    <button 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="btn-primary py-2 px-4 flex items-center gap-2 text-sm whitespace-nowrap"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          Analyze Job Description
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-text-secondary text-sm leading-relaxed font-mono bg-surface-base p-4 rounded border border-surface-elevated max-h-64 overflow-y-auto custom-scrollbar">
                      {selectedJob.description}
                    </div>
                  </div>
                </GlassCard>

                {jobAnalyses[selectedJob.id] && (
                  <JobAnalysisPanel result={jobAnalyses[selectedJob.id]} />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
