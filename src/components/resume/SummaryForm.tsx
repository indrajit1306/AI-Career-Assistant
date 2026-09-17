import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Textarea } from '../ui/Textarea';
import { AIAssistButton } from './AIAssistButton';
import { SuggestionPanel } from './SuggestionPanel';
import { aiClient } from '../../services/ai';
import type { ResumeImprovementResult } from '../../services/ai';
import type { ResumeData } from '../../types/resume';

interface Props {
  summary: string;
  onChange: (value: string) => void;
}

export const SummaryForm: React.FC<Props> = ({ summary, onChange }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestion, setSuggestion] = useState<ResumeImprovementResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>('');

  const handleImprove = async () => {
    if (!summary.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    setSuggestion(null);

    const result = await aiClient.improveResume({
      resume: { summary } as ResumeData,
      focusArea: 'summary'
    });

    if (result.success && result.data) {
      setSuggestion(result.data);
      setProvider(result.provider);
    } else {
      setError(result.error || 'Failed to generate improvements.');
    }
    
    setIsProcessing(false);
  };

  const handleAccept = () => {
    if (suggestion?.improvedContent.summary) {
      onChange(suggestion.improvedContent.summary);
      setSuggestion(null);
    }
  };

  const handleReject = () => {
    setSuggestion(null);
  };

  return (
    <GlassCard padding="lg" className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <Heading level={3}>Professional Summary</Heading>
        <AIAssistButton 
          onClick={handleImprove} 
          isProcessing={isProcessing} 
          disabled={!summary.trim()} 
        />
      </div>
      <p className="text-sm text-text-muted mb-4">Write a concise summary of your professional background and career goals.</p>
      
      {error && (
        <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <Textarea 
        value={summary}
        onChange={(e) => {
          onChange(e.target.value);
          if (suggestion) setSuggestion(null); // Clear suggestion if user manually edits
        }}
        placeholder="I am a software engineer with 5 years of experience..."
        rows={4}
      />

      {suggestion && suggestion.improvedContent.summary && (
        <SuggestionPanel
          originalText={summary}
          suggestedText={suggestion.improvedContent.summary}
          suggestions={suggestion.suggestions}
          provider={provider}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </GlassCard>
  );
};
