import { Link } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Button } from '../ui/Button';

export const DashboardWelcome = () => {
  return (
    <section className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
      <div>
        <Heading level={1} className="text-3xl sm:text-4xl">Your Career Command Center</Heading>
        <p className="text-text-secondary mt-2 text-lg max-w-2xl">
          Bring your resume building, job analysis, ATS optimization, and interview preparation into one unified workspace.
        </p>
      </div>
      <div className="flex flex-row gap-3 shrink-0">
        <Link to="/resume" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary rounded-lg">
          <Button variant="primary">Create Resume</Button>
        </Link>
        <Link to="/jobs" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary rounded-lg">
          <Button variant="outline">Analyze Job</Button>
        </Link>
      </div>
    </section>
  );
};
