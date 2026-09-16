import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { X, Plus } from 'lucide-react';

interface Props {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export const SkillsForm: React.FC<Props> = ({ skills, onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemove = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <GlassCard padding="lg" className="mb-6">
      <Heading level={3} className="mb-4">Skills</Heading>
      
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

      <div className="flex flex-wrap gap-2">
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
    </GlassCard>
  );
};
