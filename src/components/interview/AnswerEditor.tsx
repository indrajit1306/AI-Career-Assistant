import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Textarea } from '../ui/Textarea';

interface AnswerEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const AnswerEditor: React.FC<AnswerEditorProps> = ({ value, onChange, disabled }) => {
  return (
    <GlassCard className="mt-6">
      <h3 className="text-lg font-medium text-text-primary mb-4">Your Answer</h3>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Type your answer here..."
        className="min-h-[200px]"
        aria-label="Answer input"
      />
    </GlassCard>
  );
};
