import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Play } from 'lucide-react';
import type { Job } from '../../types/job';
import { Link } from 'react-router-dom';
import type { ResumeData } from '../../types/resume';

interface Props {
  jobs: Job[];
  selectedJobId: string;
  onJobSelect: (id: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onRunAIMatch: () => void;
  isMatchingAI: boolean;
  resumeData: ResumeData;
}

export const ATSSelectors: React.FC<Props> = ({ 
  jobs, 
  selectedJobId, 
  onJobSelect, 
  onAnalyze, 
  isAnalyzing,
  onRunAIMatch,
  isMatchingAI,
  resumeData
}) => {
  return (
    <GlassCard padding="lg" className="mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-end">
        
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Target Job Description
          </label>
          {jobs.length > 0 ? (
            <select
              value={selectedJobId}
              onChange={(e) => onJobSelect(e.target.value)}
              className="w-full bg-surface border border-border-base rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
            >
              <option value="" disabled>Select a job...</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title} at {job.company}
                </option>
              ))}
            </select>
          ) : (
            <div className="w-full bg-surface-elevated border border-border-base border-dashed rounded-lg px-4 py-2.5 flex justify-between items-center text-text-secondary">
              <span className="text-sm">No jobs saved yet</span>
              <Link to="/jobs" className="text-brand-400 text-sm hover:underline">Add a Job</Link>
            </div>
          )}
        </div>

        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Resume to Analyze
          </label>
          <select
            disabled
            className="w-full bg-surface-elevated border border-border-base rounded-lg px-4 py-2.5 text-text-secondary opacity-80 cursor-not-allowed"
          >
            <option>
              {resumeData?.personalInfo?.fullName 
                ? `${resumeData.personalInfo.fullName}'s Resume` 
                : 'Local Draft (from /resume)'}
            </option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
          <Button 
            onClick={onAnalyze} 
            disabled={!selectedJobId || isAnalyzing}
            size="lg"
            className="w-full sm:w-auto min-w-[140px] flex gap-2"
          >
            {isAnalyzing ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Analyzing...
              </>
            ) : (
              <>
                <Play size={18} /> Analyze
              </>
            )}
          </Button>

          <Button 
            onClick={onRunAIMatch} 
            disabled={!selectedJobId || isMatchingAI}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[140px] flex gap-2 border-brand-500 text-brand-400 hover:bg-brand-500/10"
          >
            {isMatchingAI ? (
              <>
                <span className="w-5 h-5 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></span>
                Matching...
              </>
            ) : (
              <>
                <Play size={18} /> Run AI Match
              </>
            )}
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
