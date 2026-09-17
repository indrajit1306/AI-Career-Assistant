import type {
  AIProvider,
  AIResult,
  CoverLetterInput,
  CoverLetterResult,
  InterviewEvaluationInput,
  InterviewEvaluationResult,
  InterviewQuestionInput,
  InterviewQuestionResult,
  JobAnalysisInput,
  JobAnalysisResult,
  ResumeImprovementInput,
  ResumeImprovementResult,
  ResumeMatchInput,
  ResumeMatchResult,
} from './aiTypes';

const MOCK_PROVIDER_NAME = 'MockAIProvider';
const DEMO_NOTICE = 'Demo AI response — not connected to a real AI model.';

const simulateDelay = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockAIProvider implements AIProvider {
  async improveResume(input: ResumeImprovementInput): Promise<AIResult<ResumeImprovementResult>> {
    await simulateDelay();
    
    let improvedContent: Partial<ResumeImprovementResult['improvedContent']> = {};
    let suggestions: string[] = [];

    if (input.focusArea === 'summary') {
      improvedContent = {
        summary: `[${DEMO_NOTICE}] Enhanced summary: ` + (input.resume.summary || 'A highly motivated professional with a proven track record.'),
      };
      suggestions = [
        `[${DEMO_NOTICE}] Consider adding more quantifiable achievements to your work experience.`,
      ];
    } else if (input.focusArea === 'experience' && input.resume.experience && input.resume.experience.length > 0) {
      const exp = input.resume.experience[0];
      improvedContent = {
        experience: [{
          ...exp,
          description: `[${DEMO_NOTICE}] Improved description for ${exp.jobTitle}: ` + (exp.description || 'Led cross-functional teams to deliver key projects on time and under budget.')
        }]
      };
      suggestions = [
        `[${DEMO_NOTICE}] Use stronger action verbs like "Spearheaded" or "Architected".`,
      ];
    } else if (input.focusArea === 'project' && input.resume.projects && input.resume.projects.length > 0) {
      const proj = input.resume.projects[0];
      improvedContent = {
        projects: [{
          ...proj,
          description: `[${DEMO_NOTICE}] Improved project description: ` + (proj.description || 'Developed a scalable application utilizing modern technologies.')
        }]
      };
      suggestions = [
        `[${DEMO_NOTICE}] Mention the specific technologies you used and the business impact.`,
      ];
    } else if (input.focusArea === 'skills') {
      const currentSkills = input.resume.skills || [];
      improvedContent = {
        skills: [...currentSkills, `[${DEMO_NOTICE}] Cloud Architecture`, `[${DEMO_NOTICE}] CI/CD`]
      };
      suggestions = [
        `[${DEMO_NOTICE}] Grouping skills by category (e.g., Frontend, Backend, Tools) helps readability.`,
      ];
    } else {
      // Fallback
      improvedContent = {
        summary: `[${DEMO_NOTICE}] Enhanced summary: ` + (input.resume.summary || ''),
      };
      suggestions = [`[${DEMO_NOTICE}] Review your resume for consistency.`];
    }

    return {
      success: true,
      provider: MOCK_PROVIDER_NAME,
      data: {
        improvedContent,
        suggestions,
      },
    };
  }

  async analyzeJob(_input: JobAnalysisInput): Promise<AIResult<JobAnalysisResult>> {
    await simulateDelay();
    return {
      success: true,
      provider: MOCK_PROVIDER_NAME,
      data: {
        mainResponsibilities: [
          `[${DEMO_NOTICE}] Develop and maintain web applications.`,
          `[${DEMO_NOTICE}] Collaborate with cross-functional teams.`,
        ],
        requiredSkills: [
          `[${DEMO_NOTICE}] React`,
          `[${DEMO_NOTICE}] TypeScript`,
        ],
        preferredSkills: [
          `[${DEMO_NOTICE}] Node.js`,
          `[${DEMO_NOTICE}] AWS`,
        ],
        educationRequirements: `[${DEMO_NOTICE}] Bachelor's degree in Computer Science or equivalent.`,
        experienceRequirements: `[${DEMO_NOTICE}] 3+ years of relevant experience.`,
        toolsAndTechnologies: [
          `[${DEMO_NOTICE}] Git`,
          `[${DEMO_NOTICE}] VS Code`,
        ],
        importantKeywords: [
          `[${DEMO_NOTICE}] Scalability`,
          `[${DEMO_NOTICE}] Performance`,
        ],
        potentialConcerns: [
          `[${DEMO_NOTICE}] High travel requirements not mentioned.`,
        ]
      },
    };
  }

  async matchResumeToJob(_input: ResumeMatchInput): Promise<AIResult<ResumeMatchResult>> {
    await simulateDelay();
    return {
      success: true,
      provider: MOCK_PROVIDER_NAME,
      data: {
        matchingSkills: [
          `[${DEMO_NOTICE}] JavaScript`,
          `[${DEMO_NOTICE}] React`,
        ],
        relatedExperience: [
          `[${DEMO_NOTICE}] 3 years building web apps.`,
        ],
        missingRequirements: [
          `[${DEMO_NOTICE}] Cloud Architecture`,
          `[${DEMO_NOTICE}] Agile Methodologies`,
        ],
        suggestedAreasToReview: [
          `[${DEMO_NOTICE}] Consider adding metrics to your projects to better align with the job's focus on performance.`,
        ],
        questionsToConsider: [
          `[${DEMO_NOTICE}] How would you design a scalable architecture for this team?`,
        ]
      },
    };
  }

  async generateInterviewQuestions(input: InterviewQuestionInput): Promise<AIResult<InterviewQuestionResult>> {
    await simulateDelay();
    const questions = Array.from({ length: input.count }).map((_, i) => ({
      id: `mock_q_${Date.now()}_${i}`,
      question: `[${DEMO_NOTICE}] Question ${i + 1} for ${input.role} (${input.category}): Can you describe a challenging situation and how you handled it?`,
      category: input.category,
      difficulty: input.difficulty,
      suggestedTopics: ['Problem Solving', 'Communication'],
      evaluationCriteria: ['Addressed the core of the question', 'Provided concrete examples'],
    }));

    return {
      success: true,
      provider: MOCK_PROVIDER_NAME,
      data: {
        questions,
      },
    };
  }

  async evaluateInterviewAnswer(_input: InterviewEvaluationInput): Promise<AIResult<InterviewEvaluationResult>> {
    await simulateDelay();
    return {
      success: true,
      provider: MOCK_PROVIDER_NAME,
      data: {
        score: 7,
        feedback: `[${DEMO_NOTICE}] Good effort, but could use more specific examples from your past experience.`,
        strengths: [
          `[${DEMO_NOTICE}] Clear communication structure.`,
          `[${DEMO_NOTICE}] Addressed the core of the question.`,
        ],
        areasForImprovement: [
          `[${DEMO_NOTICE}] Provide a concrete metric for the result.`,
          `[${DEMO_NOTICE}] Elaborate on your specific role in the team effort.`,
        ],
        missingAreas: [
          `[${DEMO_NOTICE}] Missing technical depth in explaining the technology used.`,
        ],
        concerns: [
          `[${DEMO_NOTICE}] The timeline described seems unrealistic for a single developer.`,
        ],
        suggestedStructure: `[${DEMO_NOTICE}] Consider using the STAR method: Situation, Task, Action, Result.`,
        followUpQuestions: [
          `[${DEMO_NOTICE}] Could you tell me more about the specific technologies you used in the 'Action' phase?`,
        ],
        exampleAnswer: `[${DEMO_NOTICE}] "In my previous role, I encountered X. I took action Y, which resulted in a 20% improvement in Z."`,
      },
    };
  }

  async generateCoverLetter(input: CoverLetterInput): Promise<AIResult<CoverLetterResult>> {
    await simulateDelay();
    return {
      success: true,
      provider: MOCK_PROVIDER_NAME,
      data: {
        content: `[${DEMO_NOTICE}]
Dear Hiring Manager at ${input.companyName},

I am writing to express my strong interest in the open position. Based on my background in the field, I am confident in my ability to contribute to your team. 

My experience aligns well with the requirements mentioned in the job description. I am particularly drawn to your company's innovative approach and commitment to excellence.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences align with your needs.

Sincerely,
[Your Name]`,
      },
    };
  }
}
