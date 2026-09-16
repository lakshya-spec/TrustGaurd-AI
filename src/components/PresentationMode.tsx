import React from 'react';
import { InvestigationResult } from '../types.js';
import { RiskMeter } from './RiskMeter.js';
import { RiskBadge } from './RiskBadge.js';
import { RedFlagCard } from './RedFlagCard.js';
import { EvidenceGraph } from './EvidenceGraph.js';
import { X, Shield, Presentation, Maximize2 } from 'lucide-react';

interface PresentationModeProps {
  result: InvestigationResult;
  onClose: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({ result, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl overflow-y-auto p-4 md:p-8 flex flex-col justify-between">
      {/* Top Presentation Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Presentation className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white">TrustGuard AI</h2>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                Hackathon Live Demo Stage
              </span>
            </div>
            <p className="text-xs text-slate-400">Open Innovation • Digital Safety & Fraud Investigator</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all font-mono text-sm"
        >
          <X className="w-4 h-4" />
          <span>Exit Presentation Mode</span>
        </button>
      </div>

      {/* Main Showcase Grid */}
      <div className="max-w-7xl w-full mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Huge Score & Category */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
            <RiskMeter score={result.risk_score} level={result.risk_level} size="xl" />
            <div className="mt-6 flex flex-col items-center gap-2">
              <RiskBadge level={result.risk_level} size="lg" />
              <h3 className="text-lg font-bold text-white mt-2">{result.category}</h3>
              <p className="text-xs text-slate-400 font-mono">Engine: {result.engineUsed}</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              Investigated Payload
            </h4>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 break-words max-h-40 overflow-y-auto">
              {result.inputData}
            </div>
          </div>
        </div>

        {/* Right Column: Evidence Graph & Top Red Flags */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <EvidenceGraph result={result} />

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400" />
              Primary Threat Signals Detected ({result.red_flags.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.red_flags.slice(0, 4).map(flag => (
                <RedFlagCard key={flag.id} flag={flag} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs font-mono text-slate-500 border-t border-slate-900 pt-4 max-w-7xl w-full mx-auto">
        TrustGuard AI • Detect → Investigate → Explain → Protect • Deterministic Rule Baseline + Gemini 3.8 Flash Neural Panel
      </div>
    </div>
  );
};
