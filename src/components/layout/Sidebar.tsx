import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  CheckCircle, 
  MessageSquare,
  LogOut
} from 'lucide-react';
import type { HTMLAttributes } from 'react';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onNavigate, ...props }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Resume', path: '/resume', icon: <FileText size={20} /> },
    { name: 'Job Analyzer', path: '/jobs', icon: <Briefcase size={20} /> },
    { name: 'ATS Check', path: '/ats', icon: <CheckCircle size={20} /> },
    { name: 'Interview Prep', path: '/interview', icon: <MessageSquare size={20} /> },
  ];

  return (
    <aside className={`w-64 bg-surface h-full flex-col border-r border-border-base ${className}`} {...props}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-text-secondary tracking-tight">AI Career<span className="text-text-primary">Assist</span></h1>
      </div>
      
      <nav className="flex-1 px-4 mt-6 space-y-2">
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

      <div className="p-4 border-t border-border-base">
        <button className="flex items-center space-x-3 px-4 py-3 w-full text-left text-text-secondary hover:bg-surface-elevated hover:text-text-primary rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary">
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
