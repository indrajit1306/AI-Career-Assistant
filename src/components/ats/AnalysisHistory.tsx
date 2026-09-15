import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Heading } from '../ui/Heading';
import { Button } from '../ui/Button';
import { Clock, Eye, Trash2 } from 'lucide-react';
import type { AnalysisHistoryRecord } from '../../types/ats';

interface Props {
  history: AnalysisHistoryRecord[];
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AnalysisHistory: React.FC<Props> = ({ history, onView, onDelete }) => {
  if (history.length === 0) return null;

  return (
    <GlassCard padding="lg" className="mt-8">
      <Heading level={3} className="mb-6 flex items-center gap-2">
        <Clock size={20} className="text-brand-400" /> Analysis History
      </Heading>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border-base text-text-muted">
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Job Title</th>
              <th className="pb-3 font-medium">Company</th>
              <th className="pb-3 font-medium text-center">Score</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-base">
            {history.map((record) => (
              <tr key={record.id} className="group hover:bg-surface/50 transition-colors">
                <td className="py-4 text-text-secondary">
                  {new Date(record.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 font-medium text-text-primary">
                  {record.jobTitle}
                </td>
                <td className="py-4 text-text-secondary">
                  {record.company}
                </td>
                <td className="py-4 text-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs
                    ${record.overallScore >= 80 ? 'bg-brand-400/20 text-brand-400' : 
                      record.overallScore >= 60 ? 'bg-green-400/20 text-green-400' : 
                      'bg-yellow-400/20 text-yellow-400'}`}
                  >
                    {record.overallScore}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => onView(record.id)} title="View Analysis">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(record.id)} className="text-red-400 hover:text-red-300" title="Delete">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
