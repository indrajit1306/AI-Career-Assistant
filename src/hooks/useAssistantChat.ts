import { useState, useEffect, useCallback } from 'react';
import type { ChatMessage, ChatInputPayload, ChatResultPayload } from '../types/assistant';
import { aiClient } from '../services/ai/aiClient';
import { getDashboardData } from '../utils/dashboardData';
import { safeGet, safeSet, safeRemove, STORAGE_KEYS } from '../utils/storage';

export const useAssistantChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const stored = safeGet<ChatMessage[]>(STORAGE_KEYS.ASSISTANT_CHAT);
    if (stored) {
      setMessages(stored);
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      safeSet(STORAGE_KEYS.ASSISTANT_CHAT, messages);
    }
  }, [messages]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    setError(null);

    try {
      // Gather context
      const dashboardData = getDashboardData();
      
      const payload: ChatInputPayload = {
        message: content,
        history: messages,
        context: {
          hasResume: dashboardData.readiness.resumeCompleted,
          savedJobsCount: dashboardData.jobs.saved,
          latestAtsScore: dashboardData.ats.latestScore || 0,
          interviewSessionsCount: dashboardData.interviews.totalSessions,
        }
      };

      const result = await aiClient.chat(payload);

      if (result.success && result.data) {
        const assistantMessage: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: result.data.message,
          timestamp: new Date().toISOString(),
          action: result.data.action
        };
        
        // Add suggestions as a subsequent message if they exist, or maybe bundle them.
        // We'll bundle them into the single message for now, let UI handle it, 
        // or just let them be part of the chat context
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(result.error || 'Failed to get a response from the AI Assistant.');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setIsProcessing(false);
    }
  }, [messages]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    safeRemove(STORAGE_KEYS.ASSISTANT_CHAT);
    setError(null);
  }, []);

  return {
    messages,
    isProcessing,
    error,
    sendMessage,
    clearConversation
  };
};
