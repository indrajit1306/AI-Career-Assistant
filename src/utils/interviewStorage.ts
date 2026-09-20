import type { PracticeSession } from '../types/interview';
import { safeGet, safeSet, STORAGE_KEYS } from './storage';

export const getInterviewSessions = (): PracticeSession[] => {
  return safeGet<PracticeSession[]>(STORAGE_KEYS.INTERVIEWS) || [];
};

export const saveInterviewSession = (session: PracticeSession): void => {
  const sessions = getInterviewSessions();
  const existingIndex = sessions.findIndex((s) => s.id === session.id);
  
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }
  
  safeSet(STORAGE_KEYS.INTERVIEWS, sessions);
};

export const deleteInterviewSession = (id: string): void => {
  const sessions = getInterviewSessions();
  const updatedSessions = sessions.filter((s) => s.id !== id);
  safeSet(STORAGE_KEYS.INTERVIEWS, updatedSessions);
};
