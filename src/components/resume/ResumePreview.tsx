import React from 'react';
import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export const ResumePreview: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  const hasPersonalInfo = Object.values(personalInfo).some(val => val.trim() !== '');

  return (
    <div className="bg-white text-gray-900 w-full min-h-[800px] shadow-sm p-8 sm:p-10 font-sans text-sm">
      {/* Personal Info */}
      {hasPersonalInfo && (
        <div className="text-center mb-6 border-b border-gray-300 pb-4">
          {personalInfo.fullName && <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">{personalInfo.fullName}</h1>}
          {personalInfo.professionalTitle && <h2 className="text-lg text-gray-700 mb-2">{personalInfo.professionalTitle}</h2>}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-600 text-xs">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.portfolioUrl && <span>{personalInfo.portfolioUrl}</span>}
            {personalInfo.linkedinUrl && <span>{personalInfo.linkedinUrl}</span>}
            {personalInfo.githubUrl && <span>{personalInfo.githubUrl}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 mb-2 pb-1 text-gray-800">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 mb-3 pb-1 text-gray-800">Experience</h3>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">{exp.jobTitle}</h4>
                  <span className="text-gray-600 text-xs whitespace-nowrap">
                    {exp.startDate} – {exp.currentPosition ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-gray-700 font-medium">{exp.company}</span>
                  <span className="text-gray-600 text-xs">{exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 mb-3 pb-1 text-gray-800">Education</h3>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                  <span className="text-gray-600 text-xs whitespace-nowrap">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-gray-700 font-medium">{edu.institution}</span>
                  <span className="text-gray-600 text-xs">{edu.location}</span>
                </div>
                {edu.description && (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 mb-3 pb-1 text-gray-800">Projects</h3>
          <div className="space-y-4">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">
                    {proj.projectName}
                    {proj.projectUrl && <span className="font-normal text-gray-500 ml-2">({proj.projectUrl})</span>}
                  </h4>
                </div>
                {proj.technologies && (
                  <div className="text-xs text-gray-600 mb-1 font-medium">{proj.technologies}</div>
                )}
                {proj.description && (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider border-b border-gray-300 mb-3 pb-1 text-gray-800">Skills</h3>
          <p className="text-gray-700 leading-relaxed">
            {skills.join(' • ')}
          </p>
        </div>
      )}
    </div>
  );
};
