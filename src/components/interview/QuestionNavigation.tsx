import React from 'react';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight, CheckCircle, Flag } from 'lucide-react';

interface QuestionNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onMarkCompleted: () => void;
  onFinish: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isCompleted: boolean;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  onPrevious,
  onNext,
  onMarkCompleted,
  onFinish,
  canGoPrevious,
  canGoNext,
  isCompleted,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
      <div className="flex w-full sm:w-auto gap-2">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex-1 sm:flex-none"
        >
          <ChevronLeft size={18} className="mr-2" />
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={onNext}
          disabled={!canGoNext}
          className="flex-1 sm:flex-none"
        >
          Next
          <ChevronRight size={18} className="ml-2" />
        </Button>
      </div>

      <div className="flex w-full sm:w-auto gap-2">
        <Button
          variant={isCompleted ? 'outline' : 'primary'}
          onClick={onMarkCompleted}
          className={`flex-1 sm:flex-none ${isCompleted ? 'text-success border-success/50 hover:bg-success/5' : ''}`}
        >
          <CheckCircle size={18} className="mr-2" />
          {isCompleted ? 'Completed' : 'Mark Completed'}
        </Button>
        
        <Button
          variant="outline"
          onClick={onFinish}
          className="flex-1 sm:flex-none text-brand-600 hover:text-brand-700 hover:bg-brand-50"
        >
          <Flag size={18} className="mr-2" />
          Finish Session
        </Button>
      </div>
    </div>
  );
};
