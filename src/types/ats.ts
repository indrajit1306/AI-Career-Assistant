export interface ATSCategoryScore {
  score: number;
  maxScore: number;
  label: string;
  description: string;
}

export interface ATSAnalysisResult {
  id: string;
  jobId: string;
  resumeId: string; // or 'local-draft'
  overallScore: number;
  categories: {
    keywordMatch: ATSCategoryScore;
    skillsMatch: ATSCategoryScore;
    structure: ATSCategoryScore;
    readability: ATSCategoryScore;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingChecks: {
    hasContactInfo: boolean;
    hasSummary: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    hasSkills: boolean;
    goodLength: boolean;
  };
  recommendations: string[];
  createdAt: string;
}

export interface AnalysisHistoryRecord extends ATSAnalysisResult {
  jobTitle: string;
  company: string;
}
