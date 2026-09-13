import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { MobileDrawer } from './MobileDrawer';
import { animatePageEntrance } from '../../animations';

export const AppShell: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      animatePageEntrance(containerRef.current);
    }
  }, []);

  return (
    <div className="flex h-screen bg-bg-base font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" />
      
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        <TopHeader 
          isMenuOpen={isMobileMenuOpen} 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
        />
        
        <MobileDrawer 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
        
        {/* Main Content Area */}
        <main ref={containerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-bg-base relative z-0" id="main-content">
          <div className="max-w-6xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
