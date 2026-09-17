import React from 'react';
import { Button } from '../ui/Button';
import { Sparkles, Loader2 } from 'lucide-react';

interface Props {
  onClick: () => void;
  isProcessing: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const AIAssistButton: React.FC<Props> = ({ 
  onClick, 
  isProcessing, 
  disabled = false, 
  label = 'Improve',
  className = ''
}) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onClick} 
      disabled={disabled || isProcessing}
      className={`flex items-center gap-2 border-brand-400/30 text-brand-400 hover:bg-brand-400/10 ${className}`}
    >
      {isProcessing ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Sparkles size={16} />
      )}
      <span>{isProcessing ? 'Thinking...' : label}</span>
    </Button>
  );
};
