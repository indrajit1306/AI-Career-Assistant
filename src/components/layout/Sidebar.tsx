import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  CheckCircle, 
  MessageSquare,
  Bot,
  Settings,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { useResume } from '../../hooks/useResume';
import { useAuth } from '../../contexts/AuthContext';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onNavigate, ...props }) => {
  const { data } = useResume();
  const { user, logout } = useAuth();
  const hasResume = data.personalInfo.fullName !== '' || data.experience.length > 0;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'AI Assistant', path: '/assistant', icon: <Bot size={20} /> },
    { name: hasResume ? 'Saved Resume' : 'Create Resume', path: '/resume', icon: <FileText size={20} /> },
    { name: 'Job Analyzer', path: '/jobs', icon: <Briefcase size={20} /> },
    { name: 'ATS Check', path: '/ats', icon: <CheckCircle size={20} /> },
    { name: 'Interview Prep', path: '/interview', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={`w-64 bg-surface h-full flex-col border-r border-border-base flex ${className}`} {...props}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-text-secondary tracking-tight">AI Career<span className="text-text-primary">Assist</span></h1>
      </div>
      
      <nav className="flex-1 px-4 mt-2 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) => 
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary ${
                isActive 
                  ? 'bg-action-primary/20 text-text-primary' 
                  : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border-base space-y-3">
        {user && (
          <div className="flex items-center space-x-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <UserIcon size={16} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-text-primary truncate">{user.name}</span>
              <span className="text-xs text-text-secondary truncate">{user.email}</span>
            </div>
          </div>
        )}
        <button 
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-text-secondary hover:bg-error/10 hover:text-error rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
