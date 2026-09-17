import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { X, Plus } from 'lucide-react';
import { AIAssistButton } from './AIAssistButton';
import { SuggestionPanel } from './SuggestionPanel';
import { aiClient } from '../../services/ai';
import type { ResumeImprovementResult } from '../../services/ai';
import type { ResumeData } from '../../types/resume';

interface Props {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export const SkillsForm: React.FC<Props> = ({ skills, onChange }) => {
  const [newSkill, setNewSkill] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestion, setSuggestion] = useState<ResumeImprovementResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>('');

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill('');
      setSuggestion(null);
    }
  };

  const handleRemove = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
    setSuggestion(null);
  };

  const handleImprove = async () => {
    if (skills.length === 0) return;
    
    setIsProcessing(true);
    setError(null);
    setSuggestion(null);

    const result = await aiClient.improveResume({
      resume: { skills } as ResumeData,
      focusArea: 'skills'
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
    if (suggestion?.improvedContent.skills) {
      onChange(suggestion.improvedContent.skills);
      setSuggestion(null);
    }
  };

  const handleReject = () => {
    setSuggestion(null);
  };

  return (
    <GlassCard padding="lg" className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Heading level={3}>Skills</Heading>
        <AIAssistButton 
          onClick={handleImprove} 
          isProcessing={isProcessing} 
          disabled={skills.length === 0} 
        />
      </div>
      
      {error && (
        <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <div className="flex-1">
          <Input 
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="E.g. React, TypeScript, Python..."
          />
        </div>
        <Button type="button" onClick={handleAdd} variant="secondary" className="mt-6 flex items-center gap-2 px-4">
          <Plus size={18} />
          <span className="hidden sm:inline">Add</span>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center gap-2 px-3 py-1.5 bg-surface-elevated border border-border-base rounded-full">
            <span className="text-sm text-text-primary">{skill}</span>
            <button 
              type="button"
              onClick={() => handleRemove(skill)}
              className="text-text-muted hover:text-red-400 focus-visible:outline-none focus-visible:text-red-400 transition-colors"
              title={`Remove ${skill}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-text-muted w-full text-center py-2">No skills added yet.</p>
        )}
      </div>

      {suggestion && suggestion.improvedContent.skills && (
        <SuggestionPanel
          originalText={skills.join(', ')}
          suggestedText={suggestion.improvedContent.skills.join(', ')}
          suggestions={suggestion.suggestions}
          provider={provider}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </GlassCard>
  );
};
