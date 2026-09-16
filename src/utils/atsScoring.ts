import type { ResumeData } from '../types/resume';
import type { Job } from '../types/job';
import type { ATSAnalysisResult } from '../types/ats';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it',
  'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these',
  'they', 'this', 'to', 'was', 'will', 'with', 'we', 'you', 'your', 'our', 'from', 'have',
  'has', 'had', 'what', 'when', 'where', 'who', 'which', 'why', 'how', 'all', 'any', 'both',
  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
]);

const COMMON_SKILLS = new Set([
  'javascript', 'typescript', 'react', 'node', 'node.js', 'python', 'java', 'c++', 'c#',
  'html', 'css', 'tailwind', 'sass', 'sql', 'mysql', 'postgresql', 'mongodb', 'aws',
  'azure', 'gcp', 'docker', 'kubernetes', 'git', 'github', 'gitlab', 'ci/cd', 'agile',
  'scrum', 'kanban', 'rest', 'graphql', 'api', 'testing', 'jest', 'cypress', 'linux',
  'figma', 'ui', 'ux', 'design', 'leadership', 'communication', 'management', 'project',
  'marketing', 'sales', 'seo', 'analytics', 'data', 'machine', 'learning', 'ai', 'angular', 'vue'
]);

// Helper to extract words, removing punctuation and normalizing to lowercase
const extractWords = (text: string): string[] => {
  return text.toLowerCase().replace(/[^\w\s.#]/g, ' ').split(/\s+/).filter(word => word.length > 1);
};

// Helper to flatten resume text
const flattenResume = (resume: ResumeData): string => {
  const parts = [
    resume.personalInfo.fullName,
    resume.personalInfo.professionalTitle,
    resume.summary,
    ...resume.experience.map(e => `${e.jobTitle} ${e.company} ${e.description}`),
    ...resume.education.map(e => `${e.degree} ${e.institution} ${e.description}`),
    ...resume.projects.map(p => `${p.projectName} ${p.description} ${p.technologies}`),
    ...resume.skills
  ];
  return parts.join(' ').toLowerCase();
};

export const runATSAnalysis = (resume: ResumeData, job: Job): ATSAnalysisResult => {
  const jobWords = extractWords(job.title + ' ' + job.description);
  const resumeText = flattenResume(resume);
  const resumeWords = extractWords(resumeText);
  const resumeWordsSet = new Set(resumeWords);

  // 1. Keywords Match (40 pts)
  // Find meaningful words in job description
  const jobKeywords = new Set<string>();
  jobWords.forEach(word => {
    if (!STOP_WORDS.has(word) && isNaN(Number(word))) {
      jobKeywords.add(word);
    }
  });

  const matchedKeywords = new Set<string>();
  const missingKeywords = new Set<string>();

  jobKeywords.forEach(kw => {
    if (resumeWordsSet.has(kw)) {
      matchedKeywords.add(kw);
    } else {
      missingKeywords.add(kw);
    }
  });

  // Calculate Keyword Score (max 40)
  const keywordMatchRatio = jobKeywords.size > 0 ? matchedKeywords.size / jobKeywords.size : 1;
  // Cap it somewhat forgivingly. If they match 50% of raw keywords, they might deserve a 30/40.
  // Let's use a simple curve: sqrt(ratio) * 40
  const keywordScore = Math.min(40, Math.round(Math.sqrt(keywordMatchRatio) * 40));

  // 2. Skills Match (30 pts)
  // Find standard skills mentioned in the job description
  const jobSkills = new Set<string>();
  jobWords.forEach(word => {
    if (COMMON_SKILLS.has(word)) jobSkills.add(word);
  });
  // Also check explicit resume skills
  const resumeSkillsLower = resume.skills.map(s => s.toLowerCase());
  
  let matchedSkillsCount = 0;
  jobSkills.forEach(skill => {
    // Check if it's in the explicit skills array OR in the text
    if (resumeSkillsLower.some(rs => rs.includes(skill)) || resumeWordsSet.has(skill)) {
      matchedSkillsCount++;
    }
  });

  const skillMatchRatio = jobSkills.size > 0 ? matchedSkillsCount / jobSkills.size : 1;
  const skillScore = Math.min(30, Math.round(skillMatchRatio * 30));

  // 3. Resume Structure (20 pts)
  let structureScore = 0;
  const formattingChecks = {
    hasContactInfo: !!(resume.personalInfo.email || resume.personalInfo.phone),
    hasSummary: !!resume.summary.trim(),
    hasExperience: resume.experience.length > 0,
    hasEducation: resume.education.length > 0,
    hasSkills: resume.skills.length > 0,
    goodLength: resumeWords.length > 100 && resumeWords.length < 1000
  };

  if (formattingChecks.hasContactInfo) structureScore += 4;
  if (formattingChecks.hasSummary) structureScore += 4;
  if (formattingChecks.hasExperience) structureScore += 6;
  if (formattingChecks.hasEducation) structureScore += 3;
  if (formattingChecks.hasSkills) structureScore += 3;

  // 4. Readability / Signals (10 pts)
  let readabilityScore = 10;
  if (!formattingChecks.goodLength) {
    readabilityScore -= 5;
  }
  if (!resume.personalInfo.fullName) {
    readabilityScore -= 5;
  }

  const overallScore = keywordScore + skillScore + structureScore + Math.max(0, readabilityScore);

  // Recommendations
  const recommendations: string[] = [];
  if (!formattingChecks.hasContactInfo) recommendations.push("Add contact information (email or phone) so employers can reach you.");
  if (!formattingChecks.hasSummary) recommendations.push("Add a professional summary to quickly highlight your value proposition.");
  if (!formattingChecks.hasExperience) recommendations.push("Add work experience. If you lack formal experience, include internships or relevant volunteer work.");
  if (missingKeywords.size > 5) recommendations.push("Review missing keywords. Add them to your resume ONLY if they truthfully represent your experience.");
  if (skillMatchRatio < 0.6 && jobSkills.size > 0) recommendations.push(`Consider highlighting these skills if you have them: ${Array.from(jobSkills).slice(0, 5).join(', ')}.`);
  if (resumeWords.length < 100) recommendations.push("Your resume seems very short. Expand on your achievements and responsibilities.");
  if (resumeWords.length >= 1000) recommendations.push("Your resume is quite long. Consider condensing it to highlight the most impactful achievements.");

  return {
    id: crypto.randomUUID(),
    jobId: job.id,
    resumeId: 'local-draft',
    overallScore,
    categories: {
      keywordMatch: {
        score: keywordScore,
        maxScore: 40,
        label: 'Keyword Match',
        description: 'Measures how many key terms from the job description appear in your resume.'
      },
      skillsMatch: {
        score: skillScore,
        maxScore: 30,
        label: 'Skills Match',
        description: 'Checks for overlap in core skills requested by the employer.'
      },
      structure: {
        score: structureScore,
        maxScore: 20,
        label: 'Resume Structure',
        description: 'Evaluates the presence of essential resume sections.'
      },
      readability: {
        score: Math.max(0, readabilityScore),
        maxScore: 10,
        label: 'Readability',
        description: 'Checks length and basic formatting best practices.'
      }
    },
    matchedKeywords: Array.from(matchedKeywords).slice(0, 20),
    missingKeywords: Array.from(missingKeywords).slice(0, 20),
    formattingChecks,
    recommendations,
    createdAt: new Date().toISOString()
  };
};
