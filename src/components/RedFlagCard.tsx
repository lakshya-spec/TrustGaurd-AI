import React from 'react';
import { RedFlag } from '../types.js';
import { AlertCircle, AlertTriangle, ShieldAlert, KeyRound, Banknote, Clock, Globe, ShieldX } from 'lucide-react';

interface RedFlagCardProps {
  flag: RedFlag;
}

export const RedFlagCard: React.FC<RedFlagCardProps> = ({ flag }) => {
  const getSeverityStyle = () => {
    switch (flag.severity) {
      case 'CRITICAL':
        return {
          border: 'border-rose-500/40 hover:border-rose-500/70',
          bg: 'bg-rose-950/20',
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          iconColor: 'text-rose-400',
        };
      case 'HIGH':
        return {
          border: 'border-orange-500/40 hover:border-orange-500/70',
          bg: 'bg-orange-950/20',
          badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
          iconColor: 'text-orange-400',
        };
      case 'MEDIUM':
        return {
          border: 'border-amber-500/40 hover:border-amber-500/70',
          bg: 'bg-amber-950/20',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          iconColor: 'text-amber-400',
        };
      case 'LOW':
      default:
        return {
          border: 'border-cyan-500/30 hover:border-cyan-500/50',
          bg: 'bg-cyan-950/20',
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          iconColor: 'text-cyan-400',
        };
    }
  };

  const style = getSeverityStyle();

  const getIcon = () => {
    const t = flag.title.toLowerCase();
    if (t.includes('urgency') || t.includes('time')) return Clock;
    if (t.includes('credential') || t.includes('harvest') || t.includes('password') || t.includes('otp')) return KeyRound;
    if (t.includes('payment') || t.includes('financial') || t.includes('upi') || t.includes('fee')) return Banknote;
    if (t.includes('url') || t.includes('link') || t.includes('domain')) return Globe;
    if (t.includes('impersonation') || t.includes('spoof')) return ShieldAlert;
    return AlertTriangle;
  };

  const Icon = getIcon();

  return (
    <div
      className={`p-4 rounded-xl border ${style.border} ${style.bg} transition-all duration-200 backdrop-blur-sm shadow-sm flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 ${style.iconColor}`}>
              <Icon className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-100 leading-snug">{flag.title}</h4>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider shrink-0 ${style.badge}`}>
            {flag.severity}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mt-1">{flag.explanation}</p>
      </div>

      {flag.tag && (
        <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Vector: {flag.tag}
          </span>
        </div>
      )}
    </div>
  );
};
