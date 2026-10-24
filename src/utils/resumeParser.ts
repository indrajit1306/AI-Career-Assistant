import { INITIAL_RESUME_DATA, type ResumeData, type Experience, type Education, type Project } from '../types/resume';

/**
 * Extracts printable ASCII/text content from a binary buffer (PDF/DOCX fallback)
 */
function extractPrintableText(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let result = '';
  let currentWord = '';

  for (let i = 0; i < bytes.length; i++) {
    const charCode = bytes[i];
    // Printable ASCII or newline/tab
    if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13 || charCode === 9) {
      currentWord += String.fromCharCode(charCode);
    } else {
      if (currentWord.length > 3) {
        result += currentWord + ' ';
      }
      currentWord = '';
    }
  }
  if (currentWord.length > 3) {
    result += currentWord;
  }

  // Clean up repetitive binary garbage or PDF formatting markers
  return result
    .replace(/[^\x20-\x7E\n]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parses raw text or markdown into structured ResumeData
 */
export function parseResumeText(rawText: string, fallbackName?: string): ResumeData {
  const resume: ResumeData = JSON.parse(JSON.stringify(INITIAL_RESUME_DATA));
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // Extract Email
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    resume.personalInfo.email = emailMatch[0];
  }

  // Extract Phone
  const phoneMatch = rawText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    resume.personalInfo.phone = phoneMatch[0];
  }

  // Extract LinkedIn
  const linkedinMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  if (linkedinMatch) {
    resume.personalInfo.linkedinUrl = linkedinMatch[0];
  }

  // Extract GitHub
  const githubMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+/i);
  if (githubMatch) {
    resume.personalInfo.githubUrl = githubMatch[0];
  }

  // Extract Name & Title (First 1-3 lines usually contain the candidate's name)
  let nameFound = false;
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const line = lines[i];
    if (
      !nameFound &&
      line.length > 2 &&
      line.length < 50 &&
      !line.includes('@') &&
      !line.includes('http') &&
      !/resume|curriculum|cv|contact|page/i.test(line)
    ) {
      resume.personalInfo.fullName = line.replace(/^[#*-\s]+/, '');
      nameFound = true;
      
      // Check next line for professional title
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (
          nextLine.length > 2 &&
          nextLine.length < 60 &&
          !nextLine.includes('@') &&
          !nextLine.includes('http') &&
          !/phone|email|location|summary/i.test(nextLine)
        ) {
          resume.personalInfo.professionalTitle = nextLine.replace(/^[#*-\s]+/, '');
        }
      }
      break;
    }
  }

  // Fallback to filename if name not cleanly extracted
  if (!resume.personalInfo.fullName && fallbackName) {
    const cleanFileName = fallbackName
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/resume|cv|curriculum vitae|final|draft/gi, '')
      .trim();
    if (cleanFileName.length > 2) {
      resume.personalInfo.fullName = cleanFileName
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
    }
  }

  // Detect Sections
  const sectionKeywords = [
    { key: 'summary', regex: /^(?:summary|professional summary|about me|profile|overview)\b/i },
    { key: 'experience', regex: /^(?:experience|work experience|employment history|work history)\b/i },
    { key: 'education', regex: /^(?:education|academic background|qualifications|degrees)\b/i },
    { key: 'skills', regex: /^(?:skills|technical skills|core competencies|expertise|technologies)\b/i },
    { key: 'projects', regex: /^(?:projects|key projects|personal projects)\b/i },
  ];

  let currentSection: string | null = null;
  const sectionsContent: Record<string, string[]> = {
    summary: [],
    experience: [],
    education: [],
    skills: [],
    projects: [],
  };

  for (const line of lines) {
    const matchedSection = sectionKeywords.find(s => s.regex.test(line.replace(/^[#*-\s]+/, '')));
    if (matchedSection) {
      currentSection = matchedSection.key;
      continue;
    }

    if (currentSection && sectionsContent[currentSection]) {
      sectionsContent[currentSection].push(line);
    }
  }

  // Parse Summary
  if (sectionsContent.summary.length > 0) {
    resume.summary = sectionsContent.summary.join(' ').slice(0, 1000);
  } else if (!resume.summary && rawText.length > 0) {
    // If no explicit summary section, take a concise preview paragraph
    const preview = lines.slice(2, 6).join(' ').slice(0, 500);
    if (preview) resume.summary = preview;
  }

  // Parse Skills
  if (sectionsContent.skills.length > 0) {
    const rawSkillsText = sectionsContent.skills.join(', ');
    const extractedSkills = rawSkillsText
      .split(/[,•|/;\n\t]+/)
      .map(s => s.trim().replace(/^[-*•]\s*/, ''))
      .filter(s => s.length > 1 && s.length < 35 && !/skills|proficient|experienced/i.test(s));

    resume.skills = Array.from(new Set(extractedSkills)).slice(0, 30);
  }

  // Parse Experience
  if (sectionsContent.experience.length > 0) {
    const expLines = sectionsContent.experience;
    const experiences: Experience[] = [];
    let currentExp: Partial<Experience> | null = null;

    for (const expLine of expLines) {
      // Look for job titles or company markers
      const isHeader = /^[-*•#]/.test(expLine) || /^(senior|lead|junior|staff|software|engineer|developer|manager|director|analyst|specialist|intern)\b/i.test(expLine);
      if (isHeader || !currentExp) {
        if (currentExp && currentExp.jobTitle) {
          experiences.push({
            id: `exp-${Date.now()}-${experiences.length}`,
            jobTitle: currentExp.jobTitle || 'Role',
            company: currentExp.company || 'Company',
            location: currentExp.location || 'Remote',
            startDate: currentExp.startDate || '2022',
            endDate: currentExp.endDate || 'Present',
            currentPosition: currentExp.currentPosition ?? true,
            description: currentExp.description || '',
          });
        }
        currentExp = {
          jobTitle: expLine.replace(/^[-*•#\s]+/, '').slice(0, 60),
          company: 'Company',
          description: '',
        };
      } else {
        currentExp.description = (currentExp.description ? currentExp.description + '\n' : '') + expLine;
      }
    }

    if (currentExp && currentExp.jobTitle) {
      experiences.push({
        id: `exp-${Date.now()}-${experiences.length}`,
        jobTitle: currentExp.jobTitle,
        company: currentExp.company || 'Company',
        location: 'Remote',
        startDate: '2022',
        endDate: 'Present',
        currentPosition: true,
        description: currentExp.description || '',
      });
    }

    if (experiences.length > 0) {
      resume.experience = experiences.slice(0, 8);
    }
  }

  // Parse Education
  if (sectionsContent.education.length > 0) {
    const eduLines = sectionsContent.education;
    const educations: Education[] = [];
    for (const eduLine of eduLines) {
      if (/degree|bachelor|master|phd|b\.s|m\.s|university|college|institute/i.test(eduLine)) {
        educations.push({
          id: `edu-${Date.now()}-${educations.length}`,
          degree: eduLine.replace(/^[-*•#\s]+/, '').slice(0, 80),
          institution: 'University / Institute',
          location: 'Location',
          startDate: '2018',
          endDate: '2022',
          description: '',
        });
      }
    }
    if (educations.length > 0) {
      resume.education = educations.slice(0, 4);
    }
  }

  // Parse Projects
  if (sectionsContent.projects.length > 0) {
    const projLines = sectionsContent.projects;
    const projects: Project[] = [];
    let currentProj: Partial<Project> | null = null;

    for (const pLine of projLines) {
      if (/^[-*•#]/.test(pLine) || !currentProj) {
        if (currentProj && currentProj.projectName) {
          projects.push({
            id: `proj-${Date.now()}-${projects.length}`,
            projectName: currentProj.projectName,
            description: currentProj.description || '',
            technologies: currentProj.technologies || '',
            projectUrl: '',
          });
        }
        currentProj = {
          projectName: pLine.replace(/^[-*•#\s]+/, '').slice(0, 60),
          description: '',
        };
      } else {
        currentProj.description = (currentProj.description ? currentProj.description + ' ' : '') + pLine;
      }
    }

    if (currentProj && currentProj.projectName) {
      projects.push({
        id: `proj-${Date.now()}-${projects.length}`,
        projectName: currentProj.projectName,
        description: currentProj.description || '',
        technologies: '',
        projectUrl: '',
      });
    }

    if (projects.length > 0) {
      resume.projects = projects.slice(0, 6);
    }
  }

  resume.updatedAt = new Date().toISOString();
  return resume;
}

/**
 * Main parser entrypoint that handles any uploaded resume file (.json, .txt, .md, .pdf, .docx)
 */
export async function parseResumeFile(file: File): Promise<ResumeData> {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';

  // 1. JSON handling
  if (ext === 'json') {
    const text = await file.text();
    const parsed = JSON.parse(text);

    // If it's an ACA backup
    if (parsed.resume && parsed.resume.personalInfo) {
      return {
        ...INITIAL_RESUME_DATA,
        ...parsed.resume,
        updatedAt: new Date().toISOString(),
      };
    }

    // If it's direct ResumeData
    if (parsed.personalInfo) {
      return {
        ...INITIAL_RESUME_DATA,
        ...parsed,
        updatedAt: new Date().toISOString(),
      };
    }

    // If JSON Resume Schema (basics, work, education, skills, etc.)
    if (parsed.basics) {
      const b = parsed.basics;
      return {
        ...INITIAL_RESUME_DATA,
        name: parsed.name || b.name || file.name,
        updatedAt: new Date().toISOString(),
        personalInfo: {
          fullName: b.name || '',
          professionalTitle: b.label || '',
          email: b.email || '',
          phone: b.phone || '',
          location: b.location?.city || b.location?.address || '',
          portfolioUrl: b.url || '',
          linkedinUrl: b.profiles?.find((p: any) => p.network?.toLowerCase().includes('linkedin'))?.url || '',
          githubUrl: b.profiles?.find((p: any) => p.network?.toLowerCase().includes('github'))?.url || '',
        },
        summary: b.summary || '',
        experience: Array.isArray(parsed.work)
          ? parsed.work.map((w: any, idx: number) => ({
              id: `exp-${idx}`,
              jobTitle: w.position || 'Role',
              company: w.name || w.company || 'Company',
              location: w.location || 'Remote',
              startDate: w.startDate || '',
              endDate: w.endDate || 'Present',
              currentPosition: !w.endDate,
              description: w.summary || (Array.isArray(w.highlights) ? w.highlights.join('\n') : ''),
            }))
          : [],
        education: Array.isArray(parsed.education)
          ? parsed.education.map((e: any, idx: number) => ({
              id: `edu-${idx}`,
              degree: e.studyType ? `${e.studyType} in ${e.area || ''}` : e.area || 'Degree',
              institution: e.institution || 'University',
              location: e.location || '',
              startDate: e.startDate || '',
              endDate: e.endDate || '',
              description: Array.isArray(e.courses) ? e.courses.join(', ') : '',
            }))
          : [],
        skills: Array.isArray(parsed.skills)
          ? parsed.skills.flatMap((s: any) => (Array.isArray(s.keywords) ? s.keywords : [s.name])).filter(Boolean)
          : [],
        projects: Array.isArray(parsed.projects)
          ? parsed.projects.map((p: any, idx: number) => ({
              id: `proj-${idx}`,
              projectName: p.name || 'Project',
              description: p.description || '',
              technologies: Array.isArray(p.keywords) ? p.keywords.join(', ') : '',
              projectUrl: p.url || '',
            }))
          : [],
      };
    }
  }

  // 2. Plain Text / Markdown handling
  if (ext === 'txt' || ext === 'md') {
    const rawText = await file.text();
    return parseResumeText(rawText, file.name);
  }

  // 3. Binary / Document handling (PDF / DOCX / DOC)
  const buffer = await file.arrayBuffer();
  const extractedText = extractPrintableText(buffer);

  if (extractedText && extractedText.length > 50) {
    const parsedFromText = parseResumeText(extractedText, file.name);
    // If we extracted a name or email, use it
    if (parsedFromText.personalInfo.fullName || parsedFromText.personalInfo.email) {
      return parsedFromText;
    }
  }

  // Fallback for PDF/DOCX if text stream is encoded/compressed
  const fallback = parseResumeText('', file.name);
  fallback.summary = `Resume uploaded from document: ${file.name} (${(file.size / 1024).toFixed(1)} KB). Please review and edit your details in the Resume Builder.`;
  return fallback;
}
