import { Link } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Button } from '../ui/Button';
import { useResume } from '../../hooks/useResume';
import { RefreshCw } from 'lucide-react';
import { clearAllProjectStorage, STORAGE_KEYS } from '../../utils/storage';

export const DashboardWelcome = () => {
  const { data: resumeData } = useResume();
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

  return (
    <section className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
      <div>
        <Heading level={1} className="text-3xl sm:text-4xl">Your Career Command Center</Heading>
        <p className="text-text-secondary mt-2 text-lg max-w-2xl">
          Bring your resume building, job analysis, ATS optimization, and interview preparation into one unified workspace.
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-3 shrink-0">
        <Link to="/resume" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary rounded-lg">
          <Button variant="primary">{hasResume ? 'Edit Resume' : 'Create Resume'}</Button>
        </Link>
        {hasAnyData && (
          <Button variant="outline" onClick={handleReset} className="text-error hover:text-error/90 hover:bg-error/10 border-error/30">
            <RefreshCw size={16} className="mr-2" /> Reset Data
          </Button>
        )}
        <Link to="/jobs" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary rounded-lg">
          <Button variant="outline">Analyze Job</Button>
        </Link>
      </div>
    </section>
  );
};
