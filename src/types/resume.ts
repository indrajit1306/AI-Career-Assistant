export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentPosition: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  projectName: string;
  description: string;
  technologies: string;
  projectUrl: string;
}

export interface ResumeData {
  id?: string;
  name?: string;
  updatedAt?: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

export const INITIAL_RESUME_DATA: ResumeData = {
  id: '',
  name: 'My Resume',
  updatedAt: '',
  personalInfo: {
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    location: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

