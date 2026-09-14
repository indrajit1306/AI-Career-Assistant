import React, { useEffect, useRef, useState } from 'react';
import { Heading } from '../components/ui/Heading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Save, RefreshCw, Eye } from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { PersonalInfoForm } from '../components/resume/PersonalInfoForm';
import { SummaryForm } from '../components/resume/SummaryForm';
import { ExperienceForm } from '../components/resume/ExperienceForm';
import { EducationForm } from '../components/resume/EducationForm';
import { SkillsForm } from '../components/resume/SkillsForm';
import { ProjectsForm } from '../components/resume/ProjectsForm';
import { ResumePreview } from '../components/resume/ResumePreview';
import { animateFadeIn } from '../animations';

export const Resume: React.FC = () => {
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
    resetResume
  } = useResume();

  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animateFadeIn(containerRef.current, { duration: 0.5 });
    }
  }, []);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your resume? All unsaved data will be lost.')) {
      resetResume();
    }
  };

  return (
    <div className="h-full flex flex-col" ref={containerRef}>
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <Heading level={1}>Resume Workspace</Heading>
            <Badge variant="warning">Draft</Badge>
          </div>
          <p className="text-text-secondary mt-1">
            Create and edit your resume. <span className="text-brand-400 font-medium">Local draft — not connected to AI yet.</span>
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Button variant="ghost" onClick={handleReset} className="flex items-center gap-2">
            <RefreshCw size={16} /> New Resume
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 lg:hidden"
            onClick={() => setShowMobilePreview(!showMobilePreview)}
          >
            <Eye size={16} /> {showMobilePreview ? 'Edit Resume' : 'Preview Resume'}
          </Button>
          <Button 
            variant="primary" 
            onClick={saveDraft} 
            className="flex items-center gap-2"
            disabled={!hasUnsavedChanges}
          >
            <Save size={16} /> {hasUnsavedChanges ? 'Save Draft' : 'Saved'}
          </Button>
        </div>
      </header>
      
      {/* Workspace Area */}
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
    </div>
  );
};
