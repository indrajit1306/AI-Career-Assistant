import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Button } from '../ui/Button';
import { useResume } from '../../hooks/useResume';
import { useToast } from '../../contexts/ToastContext';
import { RefreshCw, Upload, Loader2 } from 'lucide-react';
import { clearAllProjectStorage, safeSet, STORAGE_KEYS } from '../../utils/storage';
import { parseResumeFile } from '../../utils/resumeParser';

export const DashboardWelcome = () => {
  const { data: resumeData } = useResume();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const hasResume = resumeData.personalInfo.fullName !== '' || resumeData.experience.length > 0;
  
  // Check if there is any data to reset
  const hasAnyData = hasResume || 
    localStorage.getItem(STORAGE_KEYS.JOBS) !== null || 
    localStorage.getItem(STORAGE_KEYS.ANALYSES) !== null ||
    localStorage.getItem(STORAGE_KEYS.INTERVIEWS) !== null;

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to reset all your data? This will clear your resume, saved jobs, ATS scores, and interview practice.')) {
      clearAllProjectStorage();
      window.location.reload();
    }
  };

  const handleFileBrowse = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const parsedResume = await parseResumeFile(file);
      safeSet(STORAGE_KEYS.RESUME, parsedResume);
      addToast(`Resume "${file.name}" uploaded successfully!`, 'success');
      
      setTimeout(() => {
        navigate('/resume');
      }, 700);
    } catch (err: any) {
      console.error('Failed to parse uploaded resume:', err);
      addToast(err?.message || 'Failed to parse resume file. Please try a .json, .pdf, or .txt file.', 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <section className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
      <div>
        <Heading level={1} className="text-3xl sm:text-4xl">Your Career Command Center</Heading>
        <p className="text-text-secondary mt-2 text-lg max-w-2xl">
          Bring your resume building, job analysis, ATS optimization, and interview preparation into one unified workspace.
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-3 shrink-0 items-center">
        <Link to="/resume" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary rounded-lg">
          <Button variant="primary">{hasResume ? 'Edit Resume' : 'Create Resume'}</Button>
        </Link>

        {/* Hidden file input for Browse Resume */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileBrowse} 
          accept=".json,.pdf,.docx,.doc,.txt,.md" 
          className="hidden" 
          aria-label="Upload Resume File"
        />

        <Button 
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 cursor-pointer"
          title="Browse and upload a resume file (.pdf, .docx, .json, .txt)"
        >
          {isUploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={16} />
              <span>Browse Resume</span>
            </>
          )}
        </Button>

        {hasAnyData && (
          <Button variant="outline" onClick={handleReset} className="text-error hover:text-error/90 hover:bg-error/10 border-error/30">
            <RefreshCw size={16} className="mr-2" /> Reset Data
          </Button>
        )}
      </div>
    </section>
  );
};
