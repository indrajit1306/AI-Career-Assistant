import type { ResumeData } from '../types/resume';
import type { Job } from '../types/job';
import type { AnalysisHistoryRecord } from '../types/ats';
import type { PracticeSession } from '../types/interview';
import { safeGet, STORAGE_KEYS } from './storage';

export type ActivityType = 'resume_updated' | 'job_added' | 'ats_analyzed' | 'interview_completed';

export interface DashboardActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  link: string;
}

export interface DashboardData {
  resume: {
    exists: boolean;
    hasContent: boolean;
    lastUpdated: string | null;
  };
  jobs: {
    totalSaved: number;
    saved: number;
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
  };
  ats: {
    totalAnalyses: number;
    latestScore: number | null;
    lastAnalyzedJob: string | null;
    lastAnalysisDate: string | null;
  };
  interviews: {
    totalSessions: number;
    completedSessions: number;
    questionsPracticed: number;
    questionsAnswered: number;
    latestCategory: string | null;
  };
  readiness: {
    resumeCompleted: boolean;
    jobsCompleted: boolean;
    atsCompleted: boolean;
    interviewCompleted: boolean;
  };
  recentActivity: DashboardActivity[];
}

export const getDashboardData = (): DashboardData => {
  let resumeData: ResumeData | null = null;
  let jobs: Job[] = [];
  let atsAnalyses: AnalysisHistoryRecord[] = [];
  let interviews: PracticeSession[] = [];

  // Safe parsing
  resumeData = safeGet<ResumeData>(STORAGE_KEYS.RESUME);
  jobs = safeGet<Job[]>(STORAGE_KEYS.JOBS) || [];
  atsAnalyses = safeGet<AnalysisHistoryRecord[]>(STORAGE_KEYS.ANALYSES) || [];
  interviews = safeGet<PracticeSession[]>(STORAGE_KEYS.INTERVIEWS) || [];

  // Resume status
  const resumeHasContent = !!resumeData && (
    !!resumeData.personalInfo.fullName ||
    !!resumeData.summary ||
    resumeData.experience.length > 0 ||
    resumeData.education.length > 0 ||
    resumeData.skills.length > 0
  );

  // Jobs stats
  const jobStats = {
    totalSaved: jobs.length,
    saved: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  };
  jobs.forEach(job => {
    const status = job.status || 'saved';
    if (status === 'saved') jobStats.saved++;
    if (status === 'applied') jobStats.applied++;
    if (status === 'interview') jobStats.interview++;
    if (status === 'offer') jobStats.offer++;
    if (status === 'rejected') jobStats.rejected++;
  });

  // ATS stats
  // Sort analyses by date descending
  const sortedAnalyses = [...atsAnalyses].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const latestAnalysis = sortedAnalyses.length > 0 ? sortedAnalyses[0] : null;

  // Interview stats
  let questionsPracticed = 0;
  let questionsAnswered = 0;
  const completedSessions = interviews.filter(s => s.status === 'completed');
  
  interviews.forEach(session => {
    questionsPracticed += session.completedQuestionIds.length;
    questionsAnswered += Object.keys(session.answers).length;
  });

  // Sort interviews by date descending
  const sortedInterviews = [...interviews].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const latestInterview = sortedInterviews.length > 0 ? sortedInterviews[0] : null;

  // Compile Activities
  const activities: DashboardActivity[] = [];
  
  jobs.forEach(j => {
    activities.push({
      id: `job-${j.id}`,
      type: 'job_added',
      title: 'Saved a new job',
      description: `${j.title} at ${j.company}`,
      timestamp: j.createdAt,
      link: '/jobs'
    });
  });

  atsAnalyses.forEach(a => {
    activities.push({
      id: `ats-${a.id}`,
      type: 'ats_analyzed',
      title: 'Analyzed ATS Compatibility',
      description: `For ${a.jobTitle} at ${a.company}`,
      timestamp: a.createdAt,
      link: '/ats'
    });
  });

  interviews.forEach(i => {
    activities.push({
      id: `int-${i.id}`,
      type: 'interview_completed',
      title: i.status === 'completed' ? 'Completed Interview Practice' : 'Started Interview Practice',
      description: `${i.category} - ${i.difficulty}`,
      timestamp: i.completedAt || i.createdAt,
      link: '/interview'
    });
  });

  // Sort all activities by timestamp descending
  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return {
    resume: {
      exists: !!resumeData,
      hasContent: resumeHasContent,
      lastUpdated: null,
    },
    jobs: jobStats,
    ats: {
      totalAnalyses: atsAnalyses.length,
      latestScore: latestAnalysis ? latestAnalysis.overallScore : null,
      lastAnalyzedJob: latestAnalysis ? `${latestAnalysis.jobTitle} at ${latestAnalysis.company}` : null,
      lastAnalysisDate: latestAnalysis ? latestAnalysis.createdAt : null,
    },
    interviews: {
      totalSessions: interviews.length,
      completedSessions: completedSessions.length,
      questionsPracticed,
      questionsAnswered,
      latestCategory: latestInterview ? latestInterview.category : null,
    },
    readiness: {
      resumeCompleted: resumeHasContent,
      jobsCompleted: jobs.length > 0,
      atsCompleted: atsAnalyses.length > 0,
      interviewCompleted: interviews.length > 0,
    },
    recentActivity: activities.slice(0, 5), // Top 5 recent activities
  };
};
