import React, { useState, useRef } from 'react';
import { SettingsSection } from './SettingsSection';
import { Database, Download, Upload, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { exportAllData, clearAllProjectStorage, safeSet, STORAGE_KEYS, ACA_DATA_VERSION } from '../../utils/storage';
import { useToast } from '../../contexts/ToastContext';

export const DataManagement: React.FC = () => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const handleExport = () => {
    try {
      setIsProcessing(true);
      const dataStr = exportAllData();
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `aca_data_export_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      addToast('Data exported successfully!', 'success');
    } catch (e) {
      addToast('Failed to export data.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);

        // Basic validation
        if (!parsedData || parsedData.version !== ACA_DATA_VERSION) {
          throw new Error("Invalid or incompatible backup file version.");
        }

        if (parsedData.resume) safeSet(STORAGE_KEYS.RESUME, parsedData.resume);
        if (parsedData.jobs) safeSet(STORAGE_KEYS.JOBS, parsedData.jobs);
        if (parsedData.atsAnalyses) safeSet(STORAGE_KEYS.ANALYSES, parsedData.atsAnalyses);
        if (parsedData.interviews) safeSet(STORAGE_KEYS.INTERVIEWS, parsedData.interviews);
        if (parsedData.assistantChat) safeSet(STORAGE_KEYS.ASSISTANT_CHAT, parsedData.assistantChat);
        if (parsedData.settings) safeSet(STORAGE_KEYS.SETTINGS, parsedData.settings);

        addToast('Data imported successfully. Reloading...', 'success');
        
        setTimeout(() => {
          window.location.reload();
        }, 1500);

      } catch (error: any) {
        addToast(error.message || 'Failed to parse backup file.', 'error');
        setIsProcessing(false);
      }
    };
    reader.onerror = () => {
      addToast('Error reading file.', 'error');
      setIsProcessing(false);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClearAll = () => {
    clearAllProjectStorage();
    addToast('All data cleared.', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <SettingsSection 
      title="Data Management" 
      description="Manage your locally stored application data."
      icon={<Database size={24} />}
    >
      <div className="space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-surface-elevated rounded-xl border border-border-base">
          <div>
            <h3 className="text-sm font-medium text-text-primary">Export Data</h3>
            <p className="text-xs text-text-secondary mt-1">
              Download all your local career data as a JSON backup file.
            </p>
          </div>
          <Button variant="secondary" onClick={handleExport} className="shrink-0">
            <Download size={16} className="mr-2" /> Export JSON
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-surface-elevated rounded-xl border border-border-base">
          <div>
            <h3 className="text-sm font-medium text-text-primary">Import Data</h3>
            <p className="text-xs text-text-secondary mt-1">
              Restore your career data from a previous JSON backup.
            </p>
          </div>
          <div className="shrink-0">
            <input 
              type="file" 
              accept=".json"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImport}
            />
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
              <Upload size={16} className="mr-2" /> Import JSON
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-error/5 rounded-xl border border-error/20">
          <div>
            <h3 className="text-sm font-medium text-error">Danger Zone</h3>
            <p className="text-xs text-error/80 mt-1">
              Permanently delete all local data associated with this application. This action cannot be undone unless you have a backup.
            </p>
          </div>
          
          {showClearConfirm ? (
            <div className="flex space-x-2 shrink-0">
              <Button variant="secondary" onClick={() => setShowClearConfirm(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="bg-error hover:bg-error/90 text-white border-transparent" onClick={handleClearAll}>
                Confirm Delete
              </Button>
            </div>
          ) : (
            <Button 
              variant="secondary" 
              className="shrink-0 text-error border-error/30 hover:bg-error/10 hover:border-error/50"
              onClick={() => setShowClearConfirm(true)}
            >
              <Trash2 size={16} className="mr-2" /> Clear All Data
            </Button>
          )}
        </div>
      </div>
    </SettingsSection>
  );
};
