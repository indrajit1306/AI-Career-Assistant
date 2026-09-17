import type { InterviewQuestion } from '../types/interview';

export const questionBank: InterviewQuestion[] = [
  // JavaScript
  {
    id: 'js-1',
    category: 'JavaScript',
    difficulty: 'Beginner',
    question: 'Explain the difference between let, const, and var.',
    guidance: 'Mention scope (block vs function) and hoisting behavior.'
  },
  {
    id: 'js-2',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    question: 'What are closures in JavaScript? Provide a use case.',
    guidance: 'Discuss lexical scoping, data privacy, or function factories.'
  },
  {
    id: 'js-3',
    category: 'JavaScript',
    difficulty: 'Advanced',
    question: 'Explain the event loop and how promises are handled differently than setTimeout.',
    guidance: 'Differentiate between the macro-task queue and micro-task queue.'
  },
  // React
  {
    id: 'react-1',
    category: 'React',
    difficulty: 'Beginner',
    question: 'What is the Virtual DOM and how does it work?',
    guidance: 'Explain reconciliation and why it improves performance.'
  },
  {
    id: 'react-2',
    category: 'React',
    difficulty: 'Intermediate',
    question: 'Explain the rules of React Hooks.',
    guidance: 'Call at the top level, only from React functions.'
  },
  {
    id: 'react-3',
    category: 'React',
    difficulty: 'Advanced',
    question: 'How would you optimize a large React application to prevent unnecessary re-renders?',
    guidance: 'Mention React.memo, useMemo, useCallback, and context splitting.'
  },
  // Node.js
  {
    id: 'node-1',
    category: 'Node.js',
    difficulty: 'Beginner',
    question: 'What is the purpose of package.json?',
    guidance: 'Dependencies, scripts, metadata.'
  },
  {
    id: 'node-2',
    category: 'Node.js',
    difficulty: 'Intermediate',
    question: 'Explain how Node.js handles asynchronous operations despite being single-threaded.',
    guidance: 'Event loop, libuv, non-blocking I/O.'
  },
  {
    id: 'node-3',
    category: 'Node.js',
    difficulty: 'Advanced',
    question: 'How do you handle memory leaks in a Node.js application?',
    guidance: 'Heap snapshots, profiling tools, garbage collection behavior.'
  },
  // Python
  {
    id: 'py-1',
    category: 'Python',
    difficulty: 'Beginner',
    question: 'What is the difference between a list and a tuple?',
    guidance: 'Mutability vs immutability.'
  },
  {
    id: 'py-2',
    category: 'Python',
    difficulty: 'Intermediate',
    question: 'What are decorators in Python and how do you use them?',
    guidance: 'Functions wrapping other functions to extend behavior.'
  },
  {
    id: 'py-3',
    category: 'Python',
    difficulty: 'Advanced',
    question: 'Explain the Global Interpreter Lock (GIL) and its impact on multithreading.',
    guidance: 'Only one thread executes Python bytecode at a time; multiprocessing as an alternative.'
  },
  // SQL
  {
    id: 'sql-1',
    category: 'SQL',
    difficulty: 'Beginner',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    guidance: 'Matching rows vs all rows from left table.'
  },
  {
    id: 'sql-2',
    category: 'SQL',
    difficulty: 'Intermediate',
    question: 'How do you use the GROUP BY clause? What is HAVING?',
    guidance: 'Aggregating records and filtering aggregated results.'
  },
  {
    id: 'sql-3',
    category: 'SQL',
    difficulty: 'Advanced',
    question: 'Explain the concept of database normalization and its normal forms (1NF, 2NF, 3NF).',
    guidance: 'Reducing redundancy, ensuring data integrity.'
  },
  // Behavioral
  {
    id: 'beh-1',
    category: 'Behavioral',
    difficulty: 'Beginner',
    question: 'Tell me about a time you had to learn a new technology quickly.',
    guidance: 'Use the STAR method (Situation, Task, Action, Result).'
  },
  {
    id: 'beh-2',
    category: 'Behavioral',
    difficulty: 'Intermediate',
    question: 'Describe a situation where you disagreed with a team member on a technical decision.',
    guidance: 'Focus on communication, compromise, and professionalism.'
  },
  {
    id: 'beh-3',
    category: 'Behavioral',
    difficulty: 'Advanced',
    question: 'Tell me about a time a project you led was failing. How did you handle it?',
    guidance: 'Show accountability, problem-solving, and lessons learned.'
  },
  // HR
  {
    id: 'hr-1',
    category: 'HR',
    difficulty: 'Beginner',
    question: 'Why do you want to work for our company?',
    guidance: 'Align your goals with the company mission and values.'
  },
  // Java
  {
    id: 'java-1',
    category: 'Java',
    difficulty: 'Beginner',
    question: 'What is the difference between JDK, JRE, and JVM?',
    guidance: 'Development Kit, Runtime Environment, Virtual Machine.'
  },
  {
    id: 'java-2',
    category: 'Java',
    difficulty: 'Intermediate',
    question: 'Explain the concept of OOP and how it is implemented in Java.',
    guidance: 'Encapsulation, Inheritance, Polymorphism, Abstraction.'
  },
  {
    id: 'java-3',
    category: 'Java',
    difficulty: 'Advanced',
    question: 'How does garbage collection work in Java?',
    guidance: 'Mark and sweep, generational hypothesis.'
  },
  // Frontend Development
  {
    id: 'fe-1',
    category: 'Frontend Development',
    difficulty: 'Beginner',
    question: 'What is semantic HTML and why is it important?',
    guidance: 'Accessibility, SEO, readability.'
  },
  {
    id: 'fe-2',
    category: 'Frontend Development',
    difficulty: 'Intermediate',
    question: 'Explain CSS Specificity.',
    guidance: 'Inline, ID, Class, Element weights.'
  },
  {
    id: 'fe-3',
    category: 'Frontend Development',
    difficulty: 'Advanced',
    question: 'How do you measure and improve web performance (Core Web Vitals)?',
    guidance: 'LCP, FID/INP, CLS. Lazy loading, critical CSS, asset optimization.'
  },
  // Full Stack Development
  {
    id: 'fs-1',
    category: 'Full Stack Development',
    difficulty: 'Beginner',
    question: 'Explain the MVC pattern.',
    guidance: 'Model, View, Controller separation of concerns.'
  },
  {
    id: 'fs-2',
    category: 'Full Stack Development',
    difficulty: 'Intermediate',
    question: 'How do you secure a REST API?',
    guidance: 'Authentication (JWT, OAuth), HTTPS, rate limiting, input validation.'
  },
  {
    id: 'fs-3',
    category: 'Full Stack Development',
    difficulty: 'Advanced',
    question: 'Describe how you would design a scalable system for a high-traffic application.',
    guidance: 'Load balancing, caching, database sharding, microservices.'
  }
];
