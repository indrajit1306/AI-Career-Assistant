export const getResumeImprovementPrompt = (resumeData: string, focusArea?: string) => `
You are an expert career coach and resume writer. Review the provided resume data and suggest improvements.
${focusArea ? `Focus your improvements on this specific area: ${focusArea}` : ''}

CRITICAL RULES:
1. DO NOT invent, hallucinate, or fabricate any employment history, achievements, certifications, or qualifications.
2. Only rephrase or enhance existing information to make it more impactful and ATS-friendly.
3. Identify any uncertainty or missing information rather than guessing.
4. Provide the response as a JSON object matching the following structure exactly:
{
  "improvedContent": { /* Partial ResumeData structure with your improvements */ },
  "suggestions": [ /* Array of string suggestions for the user */ ]
}

Resume Data:
${resumeData}
`;

export const getJobAnalysisPrompt = (jobDescription: string, roleTitle?: string) => `
You are an expert technical recruiter and ATS system. Analyze the following job description.
${roleTitle ? `The role title is: ${roleTitle}` : ''}

CRITICAL RULES:
1. Identify uncertainty if the job description is vague.
2. Provide the response as a JSON object matching the following structure exactly:
{
  "keyRequirements": [ /* Array of strings */ ],
  "recommendedSkills": [ /* Array of strings */ ],
  "seniorityLevel": "string (e.g. Junior, Mid, Senior, Lead)",
  "analysis": {
    "score": number (0-100),
    "missingKeywords": [ /* Array of strings */ ],
    "matchingKeywords": [ /* Array of strings */ ],
    "recommendations": [ /* Array of strings */ ]
  }
}

Job Description:
${jobDescription}
`;

export const getResumeMatchPrompt = (resumeData: string, jobDescription: string) => `
You are an expert technical recruiter and ATS system. Compare the following resume to the job description and evaluate the match.

CRITICAL RULES:
1. DO NOT invent qualifications for the resume. Base the match strictly on what is written.
2. Provide the response as a JSON object matching the following structure exactly:
{
  "matchScore": number (0-100),
  "missingSkills": [ /* Array of strings */ ],
  "matchingSkills": [ /* Array of strings */ ],
  "recommendations": [ /* Array of strings */ ]
}

Job Description:
${jobDescription}

Resume Data:
${resumeData}
`;

export const getInterviewQuestionPrompt = (role: string, difficulty: string, category: string, count: number) => `
You are an expert technical interviewer. Generate ${count} interview questions for a ${difficulty} level ${category} position, specifically for a ${role} role.

CRITICAL RULES:
1. Provide the response as a JSON object matching the following structure exactly:
{
  "questions": [
    {
      "id": "unique string id",
      "question": "The question text",
      "category": "The category",
      "difficulty": "easy | medium | hard",
      "suggestedTopics": [ "Topic 1", "Topic 2" ]
    }
  ]
}
`;

export const getInterviewEvaluationPrompt = (question: string, answer: string, role?: string) => `
You are an expert technical interviewer. Evaluate the candidate's answer to the following interview question.
${role ? `The candidate is interviewing for a ${role} position.` : ''}

CRITICAL RULES:
1. Evaluate the answer objectively.
2. Provide the response as a JSON object matching the following structure exactly:
{
  "score": number (1-10),
  "feedback": "Detailed constructive feedback",
  "strengths": [ /* Array of strings */ ],
  "areasForImprovement": [ /* Array of strings */ ],
  "exampleAnswer": "An ideal example answer (optional, can be null)"
}

Question:
${question}

Candidate Answer:
${answer}
`;

export const getCoverLetterPrompt = (resumeData: string, jobDescription: string, companyName: string, tone: string) => `
You are an expert career coach and professional writer. Generate a cover letter for the candidate based on their resume and the target job description.

Target Company: ${companyName}
Requested Tone: ${tone}

CRITICAL RULES:
1. DO NOT invent any experiences, skills, or qualifications not found in the resume.
2. Match the requested tone (e.g., professional, enthusiastic, direct).
3. Provide the response as a JSON object matching the following structure exactly:
{
  "content": "The full text of the cover letter with newlines"
}

Job Description:
${jobDescription}

Resume Data:
${resumeData}
`;
