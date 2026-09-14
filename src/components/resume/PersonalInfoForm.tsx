import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Input } from '../ui/Input';
import type { PersonalInfo } from '../../types/resume';

interface Props {
  data: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <GlassCard padding="lg" className="mb-6">
      <Heading level={3} className="mb-4">Personal Information</Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input 
          label="Full Name *" 
          value={data.fullName} 
          onChange={(e) => onChange('fullName', e.target.value)} 
          placeholder="Jane Doe" 
          required
        />
        <Input 
          label="Professional Title" 
          value={data.professionalTitle} 
          onChange={(e) => onChange('professionalTitle', e.target.value)} 
          placeholder="Software Engineer" 
        />
        <Input 
          label="Email" 
          type="email"
          value={data.email} 
          onChange={(e) => onChange('email', e.target.value)} 
          placeholder="jane@example.com" 
        />
        <Input 
          label="Phone" 
          type="tel"
          value={data.phone} 
          onChange={(e) => onChange('phone', e.target.value)} 
          placeholder="(555) 123-4567" 
        />
        <Input 
          label="Location" 
          value={data.location} 
          onChange={(e) => onChange('location', e.target.value)} 
          placeholder="San Francisco, CA" 
        />
        <Input 
          label="Portfolio URL" 
          type="url"
          value={data.portfolioUrl} 
          onChange={(e) => onChange('portfolioUrl', e.target.value)} 
          placeholder="https://janedoe.com" 
        />
        <Input 
          label="LinkedIn URL" 
          type="url"
          value={data.linkedinUrl} 
          onChange={(e) => onChange('linkedinUrl', e.target.value)} 
          placeholder="https://linkedin.com/in/janedoe" 
        />
        <Input 
          label="GitHub URL" 
          type="url"
          value={data.githubUrl} 
          onChange={(e) => onChange('githubUrl', e.target.value)} 
          placeholder="https://github.com/janedoe" 
        />
      </div>
    </GlassCard>
  );
};
