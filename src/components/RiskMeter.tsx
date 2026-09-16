import React from 'react';
import { RiskLevel } from '../types.js';

interface RiskMeterProps {
  score: number;
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score, level, size = 'md' }) => {
  // SVG circular properties
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColorConfig = () => {
    if (score <= 25) {
      return {
        text: 'text-emerald-400',
        stroke: '#10b981',
        glow: 'rgba(16, 185, 129, 0.25)',
        bgBorder: 'border-emerald-500/30'
      };
    }
    if (score <= 50) {
      return {
        text: 'text-cyan-400',
        stroke: '#06b6d4',
        glow: 'rgba(6, 182, 212, 0.25)',
        bgBorder: 'border-cyan-500/30'
      };
    }
    if (score <= 75) {
      return {
        text: 'text-amber-400',
        stroke: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.25)',
        bgBorder: 'border-amber-500/30'
      };
    }
    if (score <= 90) {
      return {
        text: 'text-orange-400',
        stroke: '#f97316',
        glow: 'rgba(249, 115, 22, 0.25)',
        bgBorder: 'border-orange-500/30'
      };
    }
    return {
      text: 'text-rose-400',
      stroke: '#f43f5e',
      glow: 'rgba(244, 63, 94, 0.35)',
      bgBorder: 'border-rose-500/40'
    };
  };

  const config = getColorConfig();

  const dimensions = {
    sm: { width: 130, height: 130, strokeWidth: 9, fontScore: 'text-3xl', fontLevel: 'text-xs' },
    md: { width: 170, height: 170, strokeWidth: 12, fontScore: 'text-4xl', fontLevel: 'text-sm' },
    lg: { width: 210, height: 210, strokeWidth: 14, fontScore: 'text-5xl', fontLevel: 'text-base' },
    xl: { width: 260, height: 260, strokeWidth: 16, fontScore: 'text-6xl', fontLevel: 'text-lg' }
  }[size];

  return (
    <div
      id="risk-meter-container"
      className="flex flex-col items-center justify-center p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-xl shadow-xl relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute -inset-1 opacity-20 blur-xl pointer-events-none rounded-2xl transition-all duration-700"
        style={{ background: config.glow }}
      />

      <div className="relative flex items-center justify-center" style={{ width: dimensions.width, height: dimensions.height }}>
        <svg
          className="w-full h-full -rotate-90 transform"
          viewBox="0 0 160 160"
        >
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth={dimensions.strokeWidth}
            className="opacity-60"
          />
          {/* Active Risk Score Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke={config.stroke}
            strokeWidth={dimensions.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 6px ${config.glow})` }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
          <span className={`font-black tracking-tight ${config.text} ${dimensions.fontScore}`}>
            {score}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            / 100
          </span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <span className={`font-mono font-bold tracking-wider uppercase ${config.text} ${dimensions.fontLevel}`}>
          {level} RISK
        </span>
        <p className="text-xs text-slate-400 mt-1">Automated Threat Score</p>
      </div>
    </div>
  );
};
