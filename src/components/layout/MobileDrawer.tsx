import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import gsap from 'gsap';
import type { HTMLAttributes } from 'react';

export interface MobileDrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, ...props }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!overlayRef.current || !drawerRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out', display: 'block' });
        gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: 'power3.out' });
      } else {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', display: 'none' });
        gsap.to(drawerRef.current, { x: '-100%', duration: 0.3, ease: 'power3.in' });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div className="md:hidden" {...props}>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-40 hidden opacity-0"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div 
        id="mobile-drawer"
        ref={drawerRef}
        className="fixed inset-y-0 left-0 w-72 bg-surface shadow-2xl z-50 transform -translate-x-full border-r border-border-base"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary z-50 transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        <Sidebar className="w-full border-none h-full flex" onNavigate={onClose} />
      </div>
    </div>
  );
};
