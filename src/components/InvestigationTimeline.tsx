import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ShieldCheck, Terminal, Radio } from 'lucide-react';

interface InvestigationTimelineProps {
  onComplete?: () => void;
}

const ANALYSIS_STEPS = [
  { label: 'Input received & sanitized', detail: 'Tokenizing content vectors and header metadata' },
  { label: 'Extracting indicators & entities', detail: 'Isolating telephone numbers, VPAs, URLs, and institutional names' },
  { label: 'Analyzing language & sentiment', detail: 'Evaluating psychological urgency and fear-inducing triggers' },
  { label: 'Detecting manipulation tactics', detail: 'Correlating with known advance-fee and credential harvesting patterns' },
  { label: 'Checking URL & domain reputation', detail: 'Verifying protocol encryption, suspicious TLDs, and domain spoofing' },
  { label: 'Evaluating multi-agent threat signals', detail: 'Aggregating deductions from Scam, URL, and Context agents' },
  { label: 'Synthesizing deterministic risk score', detail: 'Combining heuristic weights with normalized neural classification' },
  { label: 'Generating explainable evidence matrix', detail: 'Formulating step-by-step actionable recommendations' },
];

export const InvestigationTimeline: React.FC<InvestigationTimelineProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < ANALYSIS_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 400);
          }
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete]);

  const progressPercent = Math.round(((currentStep + 1) / ANALYSIS_STEPS.length) * 100);

  return (
    <div id="investigation-timeline-hud" className="max-w-2xl mx-auto p-8 bg-slate-950/90 border border-cyan-500/30 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Radar scanning sweep visual */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Terminal HUD Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <h3 className="text-sm font-mono font-bold tracking-wider text-cyan-400 flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              INVESTIGATION IN PROGRESS
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              TRUSTGUARD MULTI-AGENT THREAT ENGINE
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-lg font-bold text-slate-200">{progressPercent}%</span>
          <span className="block text-[10px] uppercase font-mono text-slate-400">Completed</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 rounded-full h-1.5 mb-6 overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(6,182,212,0.6)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Active Step Indicator */}
      <div className="mb-6 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold mb-1">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          CURRENT STAGE: STEP 0{currentStep + 1} OF 0{ANALYSIS_STEPS.length}
        </div>
        <div className="text-sm font-semibold text-slate-100">
          {ANALYSIS_STEPS[currentStep].label}
        </div>
        <div className="text-xs text-slate-400 mt-0.5 font-mono">
          {ANALYSIS_STEPS[currentStep].detail}
        </div>
      </div>

      {/* Checkmark List */}
      <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
        {ANALYSIS_STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <div
              key={idx}
              className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg font-mono transition-all duration-200 ${
                isCurrent
                  ? 'bg-cyan-950/40 border border-cyan-500/40 text-cyan-200'
                  : isDone
                  ? 'text-slate-300 bg-slate-900/30'
                  : 'text-slate-600 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span>{step.label}</span>
              </div>
              <span className="text-[10px] text-slate-400">
                {isDone ? 'COMPLETE' : isCurrent ? 'ANALYZING...' : 'QUEUED'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
