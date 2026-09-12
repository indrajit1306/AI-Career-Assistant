import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { animatePageEntrance } from '../../animations';
import { Menu } from 'lucide-react';

export const AppShell: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animatePageEntrance(containerRef.current);
    }
  }, []);

  return (
    <div className="flex h-screen bg-bg-base font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header placeholder */}
        <header className="md:hidden h-16 border-b border-border-base bg-surface flex items-center px-4 justify-between">
          <h1 className="text-xl font-bold text-text-primary">AI CareerAssist</h1>
          <button className="p-2 text-text-secondary hover:bg-surface-elevated rounded-md">
            <Menu size={24} />
          </button>
        </header>
        
        {/* Main Content Area */}
        <main ref={containerRef} className="flex-1 overflow-y-auto p-6 md:p-8 bg-bg-base">
          <div className="max-w-6xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
