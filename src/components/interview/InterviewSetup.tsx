import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Heading';
import type { InterviewCategory, InterviewDifficulty, InterviewQuestion } from '../../types/interview';
import type { Job } from '../../types/job';
import type { ResumeData } from '../../types/resume';
import { aiClient } from '../../services/ai/aiClient';
import { safeGet, STORAGE_KEYS } from '../../utils/storage';

interface InterviewSetupProps {
  onStart: (
    category: InterviewCategory,
    difficulty: InterviewDifficulty,
    questionCount: number,
    customQuestions?: InterviewQuestion[],
    isAIGenerated?: boolean
  ) => void;
}

const CATEGORIES: InterviewCategory[] = [
  'JavaScript', 'React', 'Node.js', 'Java', 'Python', 'SQL',
  'Frontend Development', 'Full Stack Development', 'Behavioral', 'HR'
];

const DIFFICULTIES: InterviewDifficulty[] = ['Beginner', 'Intermediate', 'Advanced'];
const QUESTION_COUNTS = [5, 10, 15];

export const InterviewSetup: React.FC<InterviewSetupProps> = ({ onStart }) => {
  const [mode, setMode] = useState<'standard' | 'ai'>('standard');
  const [category, setCategory] = useState<InterviewCategory>('JavaScript');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('Intermediate');
  const [count, setCount] = useState<number>(5);
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [useResume, setUseResume] = useState<boolean>(true);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedJobs = safeGet<Job[]>(STORAGE_KEYS.JOBS);
    if (storedJobs) {
      setJobs(storedJobs);
      if (storedJobs.length > 0) {
        setSelectedJobId(storedJobs[0].id);
      }
    }
    
    const storedResume = safeGet<ResumeData>(STORAGE_KEYS.RESUME);
    if (storedResume) {
      setResumeData(storedResume);
    }
  }, []);

  const handleStart = () => {
    onStart(category, difficulty, count);
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    setError('');

    const job = jobs.find(j => j.id === selectedJobId);
    
    const result = await aiClient.generateInterviewQuestions({
      role: job ? job.title : category,
      difficulty,
      category,
      count,
      resume: useResume && resumeData ? resumeData : undefined,
      jobDescription: job ? job.description : undefined
    });

    setIsGenerating(false);

    if (result.success && result.data) {
      const aiQuestions: InterviewQuestion[] = result.data.questions.map(q => ({
        id: q.id,
        category: q.category as InterviewCategory,
        difficulty: q.difficulty as InterviewDifficulty,
        question: q.question,
        suggestedTopics: q.suggestedTopics,
        evaluationCriteria: q.evaluationCriteria
      }));
      onStart(category, difficulty, count, aiQuestions, true);
    } else {
      setError(result.error || 'Failed to generate AI questions.');
    }
  };

  const selectClassName = "w-full bg-surface border border-border-base rounded-lg px-4 py-2.5 text-text-primary focus-ring transition-colors hover:border-brand-700/50";

  return (
    <GlassCard className="max-w-2xl mx-auto mt-8">
      <div className="space-y-6 p-2">
        <div className="flex justify-between items-center">
          <Heading level={3}>Configure Practice Session</Heading>
          
          <div className="flex bg-surface-hover rounded-lg p-1">
            <button
              onClick={() => setMode('standard')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mode === 'standard' ? 'bg-brand-500 text-white' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Standard Bank
            </button>
            <button
              onClick={() => setMode('ai')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mode === 'ai' ? 'bg-brand-500 text-white' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              AI Generation
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as InterviewCategory)}
              className={selectClassName}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as InterviewDifficulty)}
              className={selectClassName}
            >
              {DIFFICULTIES.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Number of Questions
            </label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className={selectClassName}
            >
              {QUESTION_COUNTS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {mode === 'ai' && (
            <div className="pt-4 border-t border-border-base space-y-4 animate-fade-in">
              <h4 className="text-sm font-medium text-text-primary">AI Context (Optional)</h4>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Target Job Description
                </label>
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className={selectClassName}
                >
                  <option value="">None</option>
                  {jobs.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.title} at {job.company}
                    </option>
                  ))}
                </select>
              </div>

              {resumeData && (
                <label className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox"
                    checked={useResume}
                    onChange={(e) => setUseResume(e.target.checked)}
                    className="rounded border-border-base text-brand-500 focus:ring-brand-500 bg-surface"
                  />
                  <span className="text-sm text-text-secondary">Include your resume context</span>
                </label>
              )}
              
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
            </div>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          {mode === 'standard' ? (
            <Button onClick={handleStart} variant="primary">
              Start Practice
            </Button>
          ) : (
            <Button 
              onClick={handleAIGenerate} 
              variant="primary"
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate AI Questions'}
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
