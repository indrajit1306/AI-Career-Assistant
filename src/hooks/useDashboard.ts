import { useState, useEffect, useCallback } from 'react';
import { getDashboardData, type DashboardData } from '../utils/dashboardData';

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData>(getDashboardData());

  const refreshDashboard = useCallback(() => {
    setData(getDashboardData());
  }, []);

  useEffect(() => {
    // Refresh on mount
    refreshDashboard();

    // Refresh when returning to the tab
    const handleFocus = () => refreshDashboard();
    window.addEventListener('focus', handleFocus);

    // Some apps use custom events to notify cross-component updates without full context
    const handleStorage = () => refreshDashboard();
    window.addEventListener('storage', handleStorage);
    
    // We can also poll every few seconds just in case it's missed, but focus/storage should be enough.
    // If they navigate via react-router, they won't trigger 'focus'. 
    // We can use a location hook in the dashboard component itself to trigger refresh, 
    // or just trust the component remounting.
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorage);
    };
  }, [refreshDashboard]);

  return { data, refreshDashboard };
};
