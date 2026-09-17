import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import type { Experience, ResumeData } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';
import { AIAssistButton } from './AIAssistButton';
import { SuggestionPanel } from './SuggestionPanel';
import { aiClient } from '../../services/ai';
import type { ResumeImprovementResult } from '../../services/ai';

interface Props {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ experience, onChange }) => {
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [suggestions, setSuggestions] = useState<Record<string, { result: ResumeImprovementResult, provider: string }>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAdd = () => {
    onChange([
      ...experience,
      {
        id: crypto.randomUUID(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        currentPosition: false,
        description: ''
      }
    ]);
  };

  const handleUpdate = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange(experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    if (field === 'description' && suggestions[id]) {
      // Clear suggestion if user edits description manually
      const newSuggestions = { ...suggestions };
      delete newSuggestions[id];
      setSuggestions(newSuggestions);
    }
  };

  const handleRemove = (id: string) => {
    onChange(experience.filter(exp => exp.id !== id));
    
    // Clear suggestions/errors for removed item
    const newSuggestions = { ...suggestions };
    delete newSuggestions[id];
    setSuggestions(newSuggestions);
    
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);
  };

  const handleImprove = async (exp: Experience) => {
    if (!exp.description.trim()) return;

    setLoadingIds(prev => new Set(prev).add(exp.id));
    
    const newErrors = { ...errors };
    delete newErrors[exp.id];
    setErrors(newErrors);
    
    const newSuggestions = { ...suggestions };
    delete newSuggestions[exp.id];
    setSuggestions(newSuggestions);

    const result = await aiClient.improveResume({
      resume: { experience: [exp] } as ResumeData,
      focusArea: 'experience'
    });

    if (result.success && result.data) {
      setSuggestions(prev => ({
        ...prev,
        [exp.id]: { result: result.data!, provider: result.provider }
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [exp.id]: result.error || 'Failed to generate improvements.'
      }));
    }
    
    setLoadingIds(prev => {
      const next = new Set(prev);
      next.delete(exp.id);
      return next;
    });
  };

  const handleAccept = (id: string) => {
    const suggestionInfo = suggestions[id];
    if (suggestionInfo?.result.improvedContent.experience?.[0]?.description) {
      handleUpdate(id, 'description', suggestionInfo.result.improvedContent.experience[0].description);
      const newSuggestions = { ...suggestions };
      delete newSuggestions[id];
      setSuggestions(newSuggestions);
    }
  };

  const handleReject = (id: string) => {
    const newSuggestions = { ...suggestions };
    delete newSuggestions[id];
    setSuggestions(newSuggestions);
  };

  return (
    <GlassCard padding="lg" className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Heading level={3}>Work Experience</Heading>
        <Button variant="outline" size="sm" onClick={handleAdd} className="flex items-center gap-2">
          <Plus size={16} /> Add
        </Button>
      </div>

      <div className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.id} className="p-4 rounded-lg bg-surface border border-border-base relative group">
            <button 
              type="button"
              onClick={() => handleRemove(exp.id)}
              className="absolute top-4 right-4 text-text-muted hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
              title="Remove Experience"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-2 pr-8">
              <Input label="Job Title" value={exp.jobTitle} onChange={(e) => handleUpdate(exp.id, 'jobTitle', e.target.value)} placeholder="Senior Developer" />
              <Input label="Company" value={exp.company} onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)} placeholder="Tech Corp" />
              <Input label="Location" value={exp.location} onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)} placeholder="Remote" />
              
              <div className="grid grid-cols-2 gap-2">
                <Input label="Start Date" value={exp.startDate} onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)} placeholder="MM/YYYY" />
                <Input label="End Date" value={exp.endDate} onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)} placeholder="MM/YYYY" disabled={exp.currentPosition} />
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <input 
                type="checkbox" 
                id={`current-${exp.id}`}
                checked={exp.currentPosition}
                onChange={(e) => handleUpdate(exp.id, 'currentPosition', e.target.checked)}
                className="rounded border-border-base bg-surface text-action-primary focus:ring-action-primary"
              />
              <label htmlFor={`current-${exp.id}`} className="text-sm text-text-secondary cursor-pointer">I currently work here</label>
            </div>

            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-medium text-text-secondary">Description</label>
              <AIAssistButton 
                onClick={() => handleImprove(exp)}
                isProcessing={loadingIds.has(exp.id)}
                disabled={!exp.description.trim()}
              />
            </div>
            
            {errors[exp.id] && (
              <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {errors[exp.id]}
              </div>
            )}

            <Textarea 
              value={exp.description} 
              onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)} 
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
            />

            {suggestions[exp.id] && suggestions[exp.id].result.improvedContent.experience?.[0]?.description && (
              <SuggestionPanel
                originalText={exp.description}
                suggestedText={suggestions[exp.id].result.improvedContent.experience![0].description}
                suggestions={suggestions[exp.id].result.suggestions}
                provider={suggestions[exp.id].provider}
                onAccept={() => handleAccept(exp.id)}
                onReject={() => handleReject(exp.id)}
              />
            )}
          </div>
        ))}
        {experience.length === 0 && (
          <p className="text-sm text-text-muted text-center py-4">No work experience added yet.</p>
        )}
      </div>
    </GlassCard>
  );
};
