import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import type { Experience } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ experience, onChange }) => {
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
  };

  const handleRemove = (id: string) => {
    onChange(experience.filter(exp => exp.id !== id));
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-2">
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

            <Textarea 
              label="Description"
              value={exp.description} 
              onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)} 
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
            />
          </div>
        ))}
        {experience.length === 0 && (
          <p className="text-sm text-text-muted text-center py-4">No work experience added yet.</p>
        )}
      </div>
    </GlassCard>
  );
};
