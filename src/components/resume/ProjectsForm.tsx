import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import type { Project, ResumeData } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';
import { AIAssistButton } from './AIAssistButton';
import { SuggestionPanel } from './SuggestionPanel';
import { aiClient } from '../../services/ai';
import type { ResumeImprovementResult } from '../../services/ai';

interface Props {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ projects, onChange }) => {
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [suggestions, setSuggestions] = useState<Record<string, { result: ResumeImprovementResult, provider: string }>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAdd = () => {
    onChange([
      ...projects,
      {
        id: crypto.randomUUID(),
        projectName: '',
        description: '',
        technologies: '',
        projectUrl: ''
      }
    ]);
  };

  const handleUpdate = (id: string, field: keyof Project, value: string) => {
    onChange(projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj));
    if (field === 'description' && suggestions[id]) {
      const newSuggestions = { ...suggestions };
      delete newSuggestions[id];
      setSuggestions(newSuggestions);
    }
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter(proj => proj.id !== id));

    const newSuggestions = { ...suggestions };
    delete newSuggestions[id];
    setSuggestions(newSuggestions);
    
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);
  };

  const handleImprove = async (proj: Project) => {
    if (!proj.description.trim()) return;

    setLoadingIds(prev => new Set(prev).add(proj.id));
    
    const newErrors = { ...errors };
    delete newErrors[proj.id];
    setErrors(newErrors);
    
    const newSuggestions = { ...suggestions };
    delete newSuggestions[proj.id];
    setSuggestions(newSuggestions);

    const result = await aiClient.improveResume({
      resume: { projects: [proj] } as ResumeData,
      focusArea: 'project'
    });

    if (result.success && result.data) {
      setSuggestions(prev => ({
        ...prev,
        [proj.id]: { result: result.data!, provider: result.provider }
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [proj.id]: result.error || 'Failed to generate improvements.'
      }));
    }
    
    setLoadingIds(prev => {
      const next = new Set(prev);
      next.delete(proj.id);
      return next;
    });
  };

  const handleAccept = (id: string) => {
    const suggestionInfo = suggestions[id];
    if (suggestionInfo?.result.improvedContent.projects?.[0]?.description) {
      handleUpdate(id, 'description', suggestionInfo.result.improvedContent.projects[0].description);
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
        <Heading level={3}>Projects</Heading>
        <Button variant="outline" size="sm" onClick={handleAdd} className="flex items-center gap-2">
          <Plus size={16} /> Add
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((proj) => (
          <div key={proj.id} className="p-4 rounded-lg bg-surface border border-border-base relative group">
            <button 
              type="button"
              onClick={() => handleRemove(proj.id)}
              className="absolute top-4 right-4 text-text-muted hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
              title="Remove Project"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-2 pr-8">
              <Input label="Project Name" value={proj.projectName} onChange={(e) => handleUpdate(proj.id, 'projectName', e.target.value)} placeholder="AI Career Assistant" />
              <Input label="Project URL" type="url" value={proj.projectUrl} onChange={(e) => handleUpdate(proj.id, 'projectUrl', e.target.value)} placeholder="https://..." />
            </div>
            
            <div className="mb-4">
              <Input label="Technologies Used" value={proj.technologies} onChange={(e) => handleUpdate(proj.id, 'technologies', e.target.value)} placeholder="React, Node.js, TypeScript" />
            </div>

            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-medium text-text-secondary">Description</label>
              <AIAssistButton 
                onClick={() => handleImprove(proj)}
                isProcessing={loadingIds.has(proj.id)}
                disabled={!proj.description.trim()}
              />
            </div>
            
            {errors[proj.id] && (
              <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {errors[proj.id]}
              </div>
            )}

            <Textarea 
              value={proj.description} 
              onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)} 
              placeholder="What did you build and what was the impact?"
              rows={3}
            />

            {suggestions[proj.id] && suggestions[proj.id].result.improvedContent.projects?.[0]?.description && (
              <SuggestionPanel
                originalText={proj.description}
                suggestedText={suggestions[proj.id].result.improvedContent.projects![0].description}
                suggestions={suggestions[proj.id].result.suggestions}
                provider={suggestions[proj.id].provider}
                onAccept={() => handleAccept(proj.id)}
                onReject={() => handleReject(proj.id)}
              />
            )}
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-sm text-text-muted text-center py-4">No projects added yet.</p>
        )}
      </div>
    </GlassCard>
  );
};
