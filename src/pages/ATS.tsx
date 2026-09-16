import React, { useRef, useEffect } from 'react';
import { Heading } from '../components/ui/Heading';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { FileSearch } from 'lucide-react';
import { useATS } from '../hooks/useATS';
import { ATSSelectors } from '../components/ats/ATSSelectors';
import { ATSScoreCard } from '../components/ats/ATSScoreCard';
import { ATSBreakdown } from '../components/ats/ATSBreakdown';
import { KeywordComparison } from '../components/ats/KeywordComparison';
import { FormattingChecks } from '../components/ats/FormattingChecks';
import { ATSRecommendations } from '../components/ats/ATSRecommendations';
import { AnalysisHistory } from '../components/ats/AnalysisHistory';
import { animateFadeIn, animateStagger } from '../animations';

export const ATS: React.FC = () => {
  const {
    jobs,
    selectedJobId,
    setSelectedJobId,
    currentResult,
    isAnalyzing,
    analyze,
    history,
    deleteHistory,
    viewHistory,
    resumeData
  } = useATS();

  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animateFadeIn(containerRef.current, { duration: 0.5 });
    }
  }, []);

  useEffect(() => {
    if (currentResult && resultsRef.current) {
      animateStagger(Array.from(resultsRef.current.children) as HTMLElement[], { y: 20, duration: 0.4, stagger: 0.1 });
    }
  }, [currentResult]);

  return (
    <div className="space-y-6 h-full flex flex-col pb-12" ref={containerRef}>
      <header className="mb-2">
        <div className="flex items-center gap-3 mb-2">
          <Heading level={1}>ATS Analyzer</Heading>
          <span className="px-2.5 py-1 text-xs font-semibold bg-brand-500/20 text-brand-300 rounded-full border border-brand-500/30">
            Rule-Based Analysis
          </span>
        </div>
        <p className="text-text-secondary">
          Compare your resume with a target job description. This is an estimated compatibility score, not a guarantee of ATS performance or hiring success.
        </p>
      </header>

      <ATSSelectors 
        jobs={jobs}
        selectedJobId={selectedJobId}
        onJobSelect={setSelectedJobId}
        onAnalyze={analyze}
        isAnalyzing={isAnalyzing}
        resumeData={resumeData}
      />

      {currentResult ? (
        <div ref={resultsRef} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ATSScoreCard score={currentResult.overallScore} />
            </div>
            <div className="lg:col-span-2">
              <ATSBreakdown categories={currentResult.categories} />
            </div>
          </div>

          <KeywordComparison 
            matchedKeywords={currentResult.matchedKeywords}
            missingKeywords={currentResult.missingKeywords}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormattingChecks formattingChecks={currentResult.formattingChecks} />
            <ATSRecommendations recommendations={currentResult.recommendations} />
          </div>
        </div>
      ) : (
        <GlassCard className="flex-1 flex items-center justify-center min-h-[400px]">
          <EmptyState 
            icon={<FileSearch size={48} className="text-brand-400 opacity-80" />}
            title="Ready to Analyze"
            description="Select a target job description above and click Analyze to see how well your resume matches the requirements."
          />
        </GlassCard>
      )}

      <AnalysisHistory 
        history={history}
        onView={viewHistory}
        onDelete={deleteHistory}
      />
    </div>
  );
};
