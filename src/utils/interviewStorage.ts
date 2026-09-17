import type { PracticeSession } from '../types/interview';

const STORAGE_KEY = 'aca_interviews';

export const getInterviewSessions = (): PracticeSession[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse interview sessions from localStorage', error);
    return [];
  }
};

export const saveInterviewSession = (session: PracticeSession): void => {
  try {
    const sessions = getInterviewSessions();
    const existingIndex = sessions.findIndex((s) => s.id === session.id);
    
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Failed to save interview session to localStorage', error);
  }
};

export const deleteInterviewSession = (id: string): void => {
  try {
    const sessions = getInterviewSessions();
    const updatedSessions = sessions.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
  } catch (error) {
    console.error('Failed to delete interview session from localStorage', error);
  }
};
