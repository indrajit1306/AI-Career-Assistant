import React, { useEffect, useRef, useState } from 'react';
import { Heading } from '../components/ui/Heading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Save, RefreshCw, Eye, Edit2, Trash2, ArrowLeft, FileText } from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { PersonalInfoForm } from '../components/resume/PersonalInfoForm';
import { SummaryForm } from '../components/resume/SummaryForm';
import { ExperienceForm } from '../components/resume/ExperienceForm';
import { EducationForm } from '../components/resume/EducationForm';
import { SkillsForm } from '../components/resume/SkillsForm';
import { ProjectsForm } from '../components/resume/ProjectsForm';
import { ResumePreview } from '../components/resume/ResumePreview';
import { animateFadeIn } from '../animations';
import { safeSet, STORAGE_KEYS } from '../utils/storage';
import { INITIAL_RESUME_DATA } from '../types/resume';

export const Resume = () => {
  const {
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
    discardChanges
  } = useResume();

  const hasResume = data.personalInfo.fullName !== '' || data.experience.length > 0;
  const [isEditing, setIsEditing] = useState(!hasResume);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animateFadeIn(containerRef.current, { duration: 0.5 });
    }
  }, []);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to delete your resume? All data will be lost.')) {
      resetResume();
      safeSet(STORAGE_KEYS.RESUME, INITIAL_RESUME_DATA);
      setIsEditing(true);
      setIsPreviewing(false);
    }
  };

  const handleSave = () => {
    saveDraft();
    setIsEditing(false);
    setIsPreviewing(false);
  };

  // Format the date if it exists, otherwise just say "Just now"
  const getFormattedDate = () => {
    if (!data.updatedAt) return { date: 'Today', time: '' };
    const d = new Date(data.updatedAt);
    return {
      date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      time: d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    };
  };

  const { date, time } = getFormattedDate();

  return (
    <div className="h-full flex flex-col" ref={containerRef}>
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <Heading level={1}>
              {isEditing ? 'Resume Workspace' : (isPreviewing ? 'Resume Preview' : 'Saved Resumes')}
            </Heading>
            {isEditing && <Badge variant="warning">Draft</Badge>}
          </div>
          <p className="text-text-secondary mt-1">
            {isEditing 
              ? <><span className="text-brand-400 font-medium">Local draft — not connected to AI yet.</span></>
              : (isPreviewing ? 'Previewing your saved resume.' : 'Manage your saved resumes here.')}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {!isEditing ? (
            <>
              {isPreviewing && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsPreviewing(false)} 
                  className="flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Back to List
                </Button>
              )}
              <Button 
                variant="primary" 
                onClick={() => { setIsEditing(true); setIsPreviewing(false); }} 
                className="flex items-center gap-2"
              >
                <Edit2 size={16} /> Edit Resume
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={handleReset} className="flex items-center gap-2 text-error hover:text-error/90 hover:bg-error/10">
                <Trash2 size={16} /> Delete
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 lg:hidden"
                onClick={() => setShowMobilePreview(!showMobilePreview)}
              >
                <Eye size={16} /> {showMobilePreview ? 'Edit Resume' : 'Preview Resume'}
              </Button>
              {hasResume && !hasUnsavedChanges && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)} 
                  className="flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Back
                </Button>
              )}
              {hasUnsavedChanges && (
                <Button 
                  variant="outline" 
                  onClick={discardChanges} 
                  className="flex items-center gap-2"
                >
                  Discard Changes
                </Button>
              )}
              <Button 
                variant="primary" 
                onClick={handleSave} 
                className="flex items-center gap-2"
                disabled={!hasUnsavedChanges}
              >
                <Save size={16} /> {hasUnsavedChanges ? 'Save Draft' : 'Saved'}
              </Button>
            </>
          )}
        </div>
      </header>
      
      {/* Workspace / View Area */}
      {isEditing ? (
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6">
          
          {/* Editor Column */}
          <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar ${showMobilePreview ? 'hidden lg:block' : 'block'}`}>
            <form onSubmit={(e) => e.preventDefault()} className="pb-8">
              <PersonalInfoForm data={data.personalInfo} onChange={updatePersonalInfo} />
              <SummaryForm summary={data.summary} onChange={updateSummary} />
              <ExperienceForm experience={data.experience} onChange={setExperience} />
              <EducationForm education={data.education} onChange={setEducation} />
              <SkillsForm skills={data.skills} onChange={setSkills} />
              <ProjectsForm projects={data.projects} onChange={setProjects} />
            </form>
          </div>

          {/* Preview Column */}
          <div className={`lg:w-[500px] xl:w-[600px] shrink-0 flex flex-col ${!showMobilePreview ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex justify-between items-center mb-3 shrink-0">
              <Heading level={3} className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                Live Preview
              </Heading>
            </div>
            <div className="flex-1 overflow-y-auto rounded-lg border border-border-base bg-surface-elevated/50 p-2 custom-scrollbar">
              <ResumePreview data={data} />
            </div>
          </div>
          
        </div>
      ) : (
        <div className="flex-1 min-h-0 flex flex-col pb-8 overflow-y-auto custom-scrollbar">
          {!isPreviewing ? (
            <div className="w-full max-w-4xl">
              {hasResume ? (
                <div className="bg-surface-elevated border border-border-base rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-brand-500/50">
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Left side: Date and time */}
                    <div className="flex flex-col items-center justify-center min-w-[80px] sm:border-r border-border-base sm:pr-6">
                      <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                        {date}
                      </span>
                      {time && (
                        <span className="text-xs text-text-muted mt-0.5">
                          {time}
                        </span>
                      )}
                    </div>
                    
                    {/* Resume Name */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 shrink-0">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-text-primary">{data.name || 'My Resume'}</h3>
                        <p className="text-sm text-text-secondary">Ready to use for AI tools</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side: Options */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end mt-4 sm:mt-0">
                    <Button variant="outline" size="sm" onClick={() => setIsPreviewing(true)}>
                      <Eye size={16} className="mr-2" /> See
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit2 size={16} className="mr-2" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-error border-error/20 hover:bg-error/10" onClick={handleReset}>
                      <Trash2 size={16} className="mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-border-base rounded-lg bg-surface-elevated/30">
                  <FileText size={48} className="mx-auto text-text-muted mb-4" />
                  <Heading level={3} className="mb-2">No Saved Resumes</Heading>
                  <p className="text-text-secondary mb-6 max-w-md mx-auto">
                    You haven't created a resume yet. Create one to use it with the ATS Matcher and Interview Prep tools.
                  </p>
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Create Resume
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full max-w-[800px] mx-auto h-fit bg-white/5 shadow-xl rounded-lg border border-border-base p-2 sm:p-4">
              <ResumePreview data={data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
