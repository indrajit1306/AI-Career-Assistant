import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import type { Project } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ projects, onChange }) => {
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
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter(proj => proj.id !== id));
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
              onClick={() => handleRemove(proj.id)}
              className="absolute top-4 right-4 text-text-muted hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
              title="Remove Project"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-2">
              <Input label="Project Name" value={proj.projectName} onChange={(e) => handleUpdate(proj.id, 'projectName', e.target.value)} placeholder="AI Career Assistant" />
              <Input label="Project URL" type="url" value={proj.projectUrl} onChange={(e) => handleUpdate(proj.id, 'projectUrl', e.target.value)} placeholder="https://..." />
            </div>
            
            <div className="mb-4">
              <Input label="Technologies Used" value={proj.technologies} onChange={(e) => handleUpdate(proj.id, 'technologies', e.target.value)} placeholder="React, Node.js, TypeScript" />
            </div>

            <Textarea 
              label="Description"
              value={proj.description} 
              onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)} 
              placeholder="What did you build and what was the impact?"
              rows={3}
            />
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-sm text-text-muted text-center py-4">No projects added yet.</p>
        )}
      </div>
    </GlassCard>
  );
};
