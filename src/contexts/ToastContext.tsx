import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { gsap } from 'gsap';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const elRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (elRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          elRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );
      }, elRef);
      return () => ctx.revert();
    }
  }, []);

  const handleClose = () => {
    if (elRef.current) {
      gsap.to(elRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        onComplete: () => onRemove(toast.id),
      });
    } else {
      onRemove(toast.id);
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case 'success': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      case 'error': return 'bg-error/10 border-error/20 text-error';
      default: return 'bg-brand-500/10 border-brand-500/20 text-brand-600 dark:text-brand-400';
    }
  };

  const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'error' ? AlertCircle : Info;

  return (
    <div
      ref={elRef}
      className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md ${getStyles()}`}
      role="alert"
    >
      <Icon size={18} className="shrink-0" />
      <p className="text-sm font-medium flex-1 mr-2">{toast.message}</p>
      <button 
        onClick={handleClose}
        className="opacity-60 hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 shrink-0"
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};
