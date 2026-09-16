import React, { useState } from 'react';
import { RiskLevel, ScamCategory } from '../types.js';
import { ShieldCheck, AlertOctagon, CheckSquare, PhoneCall, Copy, Check, ExternalLink } from 'lucide-react';

interface RecommendationCardProps {
  level: RiskLevel;
  category: ScamCategory;
  recommendations: string[];
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  level,
  category,
  recommendations,
}) => {
  const [copied, setCopied] = useState(false);
  const isHighRisk = level === 'CRITICAL' || level === 'HIGH';

  const handleCopy = () => {
    const text = `TrustGuard AI Safety Advisory:\nThreat Level: ${level} (${category})\n\nRecommended Actions:\n${recommendations
      .map((r, i) => `${i + 1}. ${r}`)
      .join('\n')}\n\nCyber Crime Helpline: 1930 / cybercrime.gov.in`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="recommendations-container"
      className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl"
    >
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          {isHighRisk ? (
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
              <AlertOctagon className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="font-bold text-slate-100 text-base">What You Should Do Next</h3>
            <p className="text-xs text-slate-400">
              {isHighRisk ? 'Immediate protective actions required to avoid compromise' : 'Recommended digital security hygiene'}
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-850 text-slate-300 border border-slate-700 transition-colors"
          title="Copy advisory to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Share Advisory'}</span>
        </button>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700/80 transition-colors"
          >
            <div className="mt-0.5 text-xs font-mono font-bold w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 text-cyan-400">
              {i + 1}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">{rec}</p>
          </div>
        ))}
      </div>

      {isHighRisk && (
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-rose-300">National Cyber Crime Helpline</div>
              <div className="text-xs font-mono text-slate-300">Dial 1930 (Immediate 24x7 Support)</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-center gap-3">
            <ExternalLink className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-blue-300">Official Reporting Portal</div>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-blue-400 underline hover:text-blue-300"
              >
                cybercrime.gov.in
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
