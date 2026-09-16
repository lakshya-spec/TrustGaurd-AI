import React, { useState } from 'react';
import { InvestigationResult } from '../types.js';
import { Network, FileText, Globe, UserCheck, Cpu, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface EvidenceGraphProps {
  result: InvestigationResult;
}

export const EvidenceGraph: React.FC<EvidenceGraphProps> = ({ result }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const isCritical = result.risk_score >= 75;
  const isSuspicious = result.risk_score >= 50 && result.risk_score < 75;

  const activeColor = isCritical ? '#f43f5e' : isSuspicious ? '#f59e0b' : '#10b981';
  const activeBg = isCritical ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' : isSuspicious ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300';

  // Signals derived from result
  const languageSignal = result.agents.scamAnalyst.urgencyDetected ? 'Urgency & Pressure' : 'Conversational';
  const urlSignal = result.agents.urlInvestigator.domainMismatch ? 'Deceptive Link' : result.agents.urlInvestigator.hasUrl ? 'Link Checked' : 'No Direct Link';
  const contextSignal = result.agents.contextAnalyst.impersonationTarget ? `${result.agents.contextAnalyst.impersonationTarget} Claim` : result.agents.contextAnalyst.financialCoercion ? 'Financial Coercion' : 'Standard Context';

  return (
    <div id="evidence-graph-container" className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 lg:p-7 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-lg lg:text-xl tracking-tight">Evidence Relationship Graph</h3>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
          Multi-Agent Directed Graph
        </span>
      </div>

      <p className="text-xs lg:text-sm text-slate-400 mb-6">
        Visual trace of how input data was processed across specialized analyzer nodes before synthesis by the deterministic Risk Engine.
      </p>

      {/* SVG Canvas for Relationship Graph */}
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
        <svg viewBox="0 0 600 360" className="w-full h-auto select-none">
          <defs>
            <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor={activeColor} stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Level 0 to Level 1 Connection Lines */}
          {/* Center to Left */}
          <path d="M 300 45 L 110 110" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
          {/* Center to Center */}
          <path d="M 300 45 L 300 110" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
          {/* Center to Right */}
          <path d="M 300 45 L 490 110" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />

          {/* Level 1 to Level 2 Connection Lines */}
          <path d="M 110 145 L 110 200" stroke="#0ea5e9" strokeWidth="2" />
          <path d="M 300 145 L 300 200" stroke="#0ea5e9" strokeWidth="2" />
          <path d="M 490 145 L 490 200" stroke="#0ea5e9" strokeWidth="2" />

          {/* Level 2 to Risk Engine (Convergence) */}
          <path d="M 110 235 Q 200 270, 300 285" stroke="url(#edgeGradient)" strokeWidth="2.5" />
          <path d="M 300 235 L 300 285" stroke="url(#edgeGradient)" strokeWidth="2.5" />
          <path d="M 490 235 Q 400 270, 300 285" stroke="url(#edgeGradient)" strokeWidth="2.5" />

          {/* Level 0: User Input Node */}
          <g transform="translate(300, 30)" className="cursor-pointer" onClick={() => setActiveNode('input')}>
            <rect x="-80" y="-18" width="160" height="36" rx="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="0" y="5" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
              SUBMITTED CONTENT
            </text>
          </g>

          {/* Level 1: Three Analysis Branches */}
          {/* Node 1: Language Analysis */}
          <g transform="translate(110, 125)" className="cursor-pointer" onClick={() => setActiveNode('language')}>
            <rect x="-75" y="-18" width="150" height="36" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="1.2" />
            <text x="0" y="5" fill="#bae6fd" fontSize="11" fontWeight="600" textAnchor="middle">
              Language Analysis
            </text>
          </g>

          {/* Node 2: URL Analysis */}
          <g transform="translate(300, 125)" className="cursor-pointer" onClick={() => setActiveNode('url')}>
            <rect x="-75" y="-18" width="150" height="36" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="1.2" />
            <text x="0" y="5" fill="#bae6fd" fontSize="11" fontWeight="600" textAnchor="middle">
              URL & Link Analysis
            </text>
          </g>

          {/* Node 3: Context Analysis */}
          <g transform="translate(490, 125)" className="cursor-pointer" onClick={() => setActiveNode('context')}>
            <rect x="-75" y="-18" width="150" height="36" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="1.2" />
            <text x="0" y="5" fill="#bae6fd" fontSize="11" fontWeight="600" textAnchor="middle">
              Context & Identity
            </text>
          </g>

          {/* Level 2: Extracted Signals */}
          {/* Signal 1 */}
          <g transform="translate(110, 215)" className="cursor-pointer" onClick={() => setActiveNode('signal-lang')}>
            <rect
              x="-75"
              y="-18"
              width="150"
              height="36"
              rx="6"
              fill={result.agents.scamAnalyst.urgencyDetected ? '#450a0a' : '#064e3b'}
              stroke={result.agents.scamAnalyst.urgencyDetected ? '#f43f5e' : '#10b981'}
              strokeWidth="1.2"
            />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="600" textAnchor="middle">
              {languageSignal}
            </text>
          </g>

          {/* Signal 2 */}
          <g transform="translate(300, 215)" className="cursor-pointer" onClick={() => setActiveNode('signal-url')}>
            <rect
              x="-75"
              y="-18"
              width="150"
              height="36"
              rx="6"
              fill={result.agents.urlInvestigator.domainMismatch ? '#450a0a' : '#064e3b'}
              stroke={result.agents.urlInvestigator.domainMismatch ? '#f43f5e' : '#10b981'}
              strokeWidth="1.2"
            />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="600" textAnchor="middle">
              {urlSignal}
            </text>
          </g>

          {/* Signal 3 */}
          <g transform="translate(490, 215)" className="cursor-pointer" onClick={() => setActiveNode('signal-context')}>
            <rect
              x="-75"
              y="-18"
              width="150"
              height="36"
              rx="6"
              fill={result.agents.contextAnalyst.impersonationTarget ? '#450a0a' : '#064e3b'}
              stroke={result.agents.contextAnalyst.impersonationTarget ? '#f43f5e' : '#10b981'}
              strokeWidth="1.2"
            />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="600" textAnchor="middle">
              {contextSignal}
            </text>
          </g>

          {/* Level 3: Risk Engine Node */}
          <g transform="translate(300, 310)" className="cursor-pointer" onClick={() => setActiveNode('engine')}>
            <rect
              x="-90"
              y="-22"
              width="180"
              height="44"
              rx="12"
              fill="#090d16"
              stroke={activeColor}
              strokeWidth="2"
              filter="url(#glow)"
            />
            <text x="0" y="-3" fill="#f8fafc" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="1">
              RISK ENGINE SYNTHESIS
            </text>
            <text x="0" y="14" fill={activeColor} fontSize="14" fontWeight="900" textAnchor="middle">
              {result.risk_score} / 100 • {result.risk_level}
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Tooltip Drawer */}
      <div className="mt-4 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300">
            {activeNode === 'language' && `Agent 1 Scam Analyst: ${result.agents.scamAnalyst.summary}`}
            {activeNode === 'url' && `Agent 2 URL Investigator: ${result.agents.urlInvestigator.summary}`}
            {activeNode === 'context' && `Agent 3 Context Analyst: ${result.agents.contextAnalyst.summary}`}
            {activeNode === 'engine' && `Risk Engine evaluated ${result.red_flags.length} red flags with rule weights into score ${result.risk_score}/100.`}
            {!activeNode && `Click or inspect any node in the graph above to view specialized agent deductions.`}
          </span>
        </div>
        {activeNode && (
          <button
            onClick={() => setActiveNode(null)}
            className="text-slate-400 hover:text-slate-200 text-[11px] underline ml-2"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
