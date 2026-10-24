import React, { useState, useEffect } from 'react';
import { Heading } from '../components/ui/Heading';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Briefcase, Loader2, Sparkles, Building2, MapPin, Plus, Trash2, X } from 'lucide-react';
import type { Job } from '../types/job';
import { MOCK_JOB } from '../types/job';
import { useAIAnalyses } from '../hooks/useAIAnalyses';
import { aiClient } from '../services/ai/aiClient';
import { JobAnalysisPanel } from '../components/jobs/JobAnalysisPanel';
import { safeGet, safeSet, STORAGE_KEYS } from '../utils/storage';

export const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { jobAnalyses, saveJobAnalysis } = useAIAnalyses();

  // Add Job Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const storedJobs = safeGet<Job[]>(STORAGE_KEYS.JOBS);
    if (storedJobs) {
      setJobs(storedJobs);
      if (storedJobs.length > 0 && !selectedJobId) {
        setSelectedJobId(storedJobs[0].id);
      }
    }
  }, []);

  const handleLoadSampleJob = () => {
    const sample = [MOCK_JOB];
    setJobs(sample);
    setSelectedJobId(MOCK_JOB.id);
    safeSet(STORAGE_KEYS.JOBS, sample);
  };

  const handleSaveCustomJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim() || !newDescription.trim()) return;

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: newTitle.trim(),
      company: newCompany.trim(),
      location: newLocation.trim() || 'Remote',
      description: newDescription.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'saved',
    };

    const updated = [newJob, ...jobs];
    setJobs(updated);
    setSelectedJobId(newJob.id);
    safeSet(STORAGE_KEYS.JOBS, updated);

    setNewTitle('');
    setNewCompany('');
    setNewLocation('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  const handleDeleteJob = (id: string) => {
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated);
    safeSet(STORAGE_KEYS.JOBS, updated);
    if (selectedJobId === id) {
      setSelectedJobId(updated.length > 0 ? updated[0].id : '');
    }
  };

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
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Heading level={1}>Jobs</Heading>
          <p className="text-text-secondary mt-1">Analyze job descriptions and compare them with your resume.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLoadSampleJob}
            className="flex items-center gap-1.5 text-xs"
          >
            <Sparkles size={14} /> Sample Job
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus size={16} /> Add Job
          </Button>
        </div>
      </header>
      
      {jobs.length === 0 ? (
        <GlassCard className="flex-1 flex items-center justify-center p-6">
          <EmptyState 
            icon={<Briefcase size={32} />}
            title="No Saved Jobs"
            description="You don't have any jobs saved yet. Load a sample job to explore analysis and ATS checking, or add your own job description."
            action={
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  variant="primary"
                  onClick={handleLoadSampleJob}
                  className="flex items-center gap-2"
                >
                  <Sparkles size={16} /> Load Sample Job
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} /> Add Custom Job
                </Button>
              </div>
            }
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
                      <p className="text-brand-600 dark:text-brand-400 font-medium text-lg mt-1">{selectedJob.company}</p>
                      <p className="text-text-muted text-sm mt-1">{selectedJob.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="primary"
                        size="sm"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="flex items-center gap-2 whitespace-nowrap"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles size={16} />
                            Analyze Job
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteJob(selectedJob.id)}
                        className="text-error hover:text-error/90 hover:bg-error/10 border-error/30"
                        title="Delete job"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
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

      {/* Add Job Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-surface border border-border-base rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-text-primary">Add Target Job</h3>
              <button 
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-text-muted hover:text-text-primary p-1 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveCustomJob} className="space-y-4">
              <Input 
                label="Job Title"
                placeholder="e.g. Senior Frontend Engineer"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  label="Company Name"
                  placeholder="e.g. Acme Corp"
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                  required
                />
                <Input 
                  label="Location"
                  placeholder="e.g. Remote / New York"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                />
              </div>
              <Textarea 
                label="Job Description"
                placeholder="Paste the full job description, requirements, and responsibilities here..."
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                rows={6}
                maxLength={10000}
                required
              />
              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={!newTitle.trim() || !newCompany.trim() || !newDescription.trim()}
                >
                  Save Job
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
