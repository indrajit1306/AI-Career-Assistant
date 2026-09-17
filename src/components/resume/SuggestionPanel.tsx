import React from 'react';
import { Button } from '../ui/Button';
import { Check, X, AlertCircle, Info } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface Props {
  originalText?: string;
  suggestedText?: string;
  suggestions?: string[];
  provider: string;
  onAccept: () => void;
  onReject: () => void;
}

export const SuggestionPanel: React.FC<Props> = ({
  originalText,
  suggestedText,
  suggestions,
  provider,
  onAccept,
  onReject
}) => {
  return (
    <div className="mt-4 p-4 rounded-lg border border-brand-400/30 bg-brand-400/5 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SparklesIcon />
          <h4 className="font-medium text-text-primary">AI Suggestion</h4>
          {provider.includes('Mock') && (
            <Badge variant="warning" className="text-xs">Demo AI</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onReject} className="text-text-muted hover:text-red-400">
            <X size={16} className="mr-1" /> Reject
          </Button>
          <Button variant="primary" size="sm" onClick={onAccept}>
            <Check size={16} className="mr-1" /> Apply Changes
          </Button>
        </div>
      </div>

      {provider.includes('Mock') && (
        <div className="mb-4 flex items-start gap-2 p-2 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/90 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <p>Demo AI response — verify all suggestions before applying. Do not add skills or experience you do not possess.</p>
        </div>
      )}

      {suggestedText && (
        <div className="mb-4 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {originalText && (
              <div>
                <span className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1 block">Original</span>
                <div className="p-3 rounded bg-surface/50 border border-border-base text-text-secondary text-sm line-through opacity-80">
                  {originalText}
                </div>
              </div>
            )}
            <div>
              <span className="text-xs font-medium text-brand-400 uppercase tracking-wider mb-1 block">Suggested</span>
              <div className="p-3 rounded bg-surface border border-brand-400/30 text-text-primary text-sm">
                {suggestedText}
              </div>
            </div>
          </div>
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div>
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 block flex items-center gap-1">
            <Info size={14} /> Feedback
          </span>
          <ul className="space-y-2">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-brand-400 mt-1">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
  </svg>
);
