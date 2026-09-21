# AI Career Assistant

An AI-powered career companion designed to help job seekers manage their career preparation in one place.

The platform combines **resume building, ATS compatibility analysis, job tracking, job matching, and interview preparation** into a single modern workspace.

> **AI-powered career companion for resume building, ATS analysis, job matching, and interview preparation.**

## Core Features

* Resume Builder & Editor
* AI Resume Improvement (Currently uses a mock/demo provider)
* Estimated ATS Compatibility Analysis
* Job Description Analysis
* Resume-to-Job Matching
* Job Application Tracking
* Interview Practice
* AI Interview Question Generation (Currently uses a mock/demo provider)
* AI Interview Answer Feedback (Currently uses a mock/demo provider)
* Career Preparation Dashboard
* Local Data Persistence (All data is securely saved in your browser's local storage)
* Settings & Data Management
* AI Career Assistant (Currently uses a mock/demo provider)

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* GSAP
* Lucide React
* LocalStorage

## Project Structure

```text
src/
├── animations/
├── assets/
├── components/
├── contexts/
├── data/
├── hooks/
├── pages/
├── services/
├── styles/
├── types/
└── utils/
```

## Getting Started

To install dependencies and start the development server:

```bash
npm install
npm run dev
```

To build the project for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables

Check the `.env.example` file for available environment variables. To configure API keys for AI services (when migrating from the mock provider), create a `.env` or `.env.local` file and add your credentials.

**Security Warning**: Real AI provider credentials must remain server-side in a production environment. Do not expose live secret keys to the client via Vite environment variables.

## Security Notice

* Never commit API keys.
* Never expose AI provider secrets in frontend code.
* Keep `.env` and `.env.local` files out of Git.
* User-provided resume and job content should be treated as untrusted input.

## Project Status

**Status: V1 MVP / Active Development**

The project is currently in active development. Please note that some AI functionalities (resume improvement, interview generation, AI chat) currently use a development/demo (mock) provider for testing and demonstration purposes.

## License

License: Not yet specified.
