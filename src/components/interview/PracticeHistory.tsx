import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Button } from '../ui/Button';
import type { PracticeSession } from '../../types/interview';
import { Trash2 } from 'lucide-react';

interface PracticeHistoryProps {
  sessions: PracticeSession[];
  onDeleteSession: (id: string) => void;
  onStartNew: () => void;
}

export const PracticeHistory: React.FC<PracticeHistoryProps> = ({ sessions, onDeleteSession, onStartNew }) => {
  if (sessions.length === 0) {
    return (
      <GlassCard className="mt-8 text-center py-12">
        <Heading level={3}>No practice sessions yet</Heading>
        <p className="text-text-secondary mt-2 mb-6">
          Start an interview practice session to build your preparation history.
        </p>
        <Button onClick={onStartNew} variant="primary">
          Start Practice
        </Button>
      </GlassCard>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <Heading level={3}>Practice History</Heading>
      <div className="grid gap-4">
        {sessions.map((session) => (
          <GlassCard key={session.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-medium text-text-primary">
                {session.category} • {session.difficulty}
              </h4>
              <p className="text-sm text-text-secondary mt-1">
                {session.questions.length} Questions • {new Date(session.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm px-2 py-1 rounded-full ${
                session.status === 'completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
              }`}>
                {session.status}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDeleteSession(session.id)}
                className="text-error hover:bg-error/10"
                aria-label="Delete session"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
