import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import type { Education } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationForm: React.FC<Props> = ({ education, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...education,
      {
        id: crypto.randomUUID(),
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    onChange(education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const handleRemove = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  return (
    <GlassCard padding="lg" className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Heading level={3}>Education</Heading>
        <Button variant="outline" size="sm" onClick={handleAdd} className="flex items-center gap-2">
          <Plus size={16} /> Add
        </Button>
      </div>

      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 rounded-lg bg-surface border border-border-base relative group">
            <button 
              type="button"
              onClick={() => handleRemove(edu.id)}
              className="absolute top-4 right-4 text-text-muted hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
              title="Remove Education"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-2">
              <Input label="Degree / Certification" value={edu.degree} onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)} placeholder="B.S. Computer Science" />
              <Input label="Institution" value={edu.institution} onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)} placeholder="University of Technology" />
              <Input label="Location" value={edu.location} onChange={(e) => handleUpdate(edu.id, 'location', e.target.value)} placeholder="City, State" />
              
              <div className="grid grid-cols-2 gap-2">
                <Input label="Start Date" value={edu.startDate} onChange={(e) => handleUpdate(edu.id, 'startDate', e.target.value)} placeholder="MM/YYYY" />
                <Input label="End Date" value={edu.endDate} onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)} placeholder="MM/YYYY" />
              </div>
            </div>

            <Textarea 
              label="Description (Optional)"
              value={edu.description} 
              onChange={(e) => handleUpdate(edu.id, 'description', e.target.value)} 
              placeholder="Relevant coursework, honors, or activities..."
              rows={2}
            />
          </div>
        ))}
        {education.length === 0 && (
          <p className="text-sm text-text-muted text-center py-4">No education added yet.</p>
        )}
      </div>
    </GlassCard>
  );
};
