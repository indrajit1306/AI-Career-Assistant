import { Link } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Button } from '../ui/Button';
import { useResume } from '../../hooks/useResume';
import { RefreshCw } from 'lucide-react';
import { safeSet, STORAGE_KEYS } from '../../utils/storage';
import { INITIAL_RESUME_DATA } from '../../types/resume';

export const DashboardWelcome = () => {
  const { data, resetResume } = useResume();
  const hasContent = data.personalInfo.fullName !== '' || data.experience.length > 0;

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete your saved resume?')) {
      resetResume();
      safeSet(STORAGE_KEYS.RESUME, INITIAL_RESUME_DATA);
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
          <Button variant="primary">{hasContent ? 'Edit Resume' : 'Create Resume'}</Button>
        </Link>
        {hasContent && (
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
