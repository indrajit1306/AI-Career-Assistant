export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  url?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

// Temporary mock job for testing ATS analyzer before Jobs workspace is built
export const MOCK_JOB: Job = {
  id: 'mock-job-1',
  title: 'Frontend Developer (React)',
  company: 'TechCorp Inc.',
  location: 'Remote',
  description: `We are looking for a skilled Frontend Developer to join our team. 
Responsibilities:
- Build responsive web applications using React and TypeScript.
- Collaborate with designers and backend engineers.
- Optimize applications for maximum speed and scalability.
- Write clean, maintainable code using modern frontend practices.

Requirements:
- 3+ years of experience with React, JavaScript, and TypeScript.
- Strong understanding of HTML5, CSS3, and modern CSS frameworks like Tailwind CSS.
- Experience with state management (Redux, Zustand, or Context API).
- Familiarity with RESTful APIs and Git version control.
- Good communication skills and a team player.
- Bonus: Experience with Node.js, Next.js, or AWS.`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
