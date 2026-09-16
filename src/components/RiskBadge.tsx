import React from 'react';
import { RiskLevel } from '../types.js';
import { ShieldAlert, ShieldCheck, AlertTriangle, ShieldX } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const getStyle = () => {
    switch (level) {
      case 'SAFE':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
          icon: ShieldCheck,
          label: 'SAFE'
        };
      case 'LOW':
        return {
          bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          dot: 'bg-cyan-400',
          icon: ShieldCheck,
          label: 'LOW RISK'
        };
      case 'SUSPICIOUS':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
          icon: AlertTriangle,
          label: 'SUSPICIOUS'
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
          dot: 'bg-orange-400',
          icon: ShieldAlert,
          label: 'HIGH RISK'
        };
      case 'CRITICAL':
      default:
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-400 animate-pulse',
          icon: ShieldX,
          label: 'CRITICAL RISK'
        };
    }
  };

  const style = getStyle();
  const Icon = style.icon;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-2 font-semibold',
    lg: 'text-sm px-4 py-1.5 gap-2.5 font-bold tracking-wider'
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border ${style.bg} ${sizeClasses} backdrop-blur-sm shadow-sm transition-all duration-300`}
    >
      <span className={`w-2 h-2 rounded-full ${style.dot}`} />
      {showIcon && <Icon className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{style.label}</span>
    </span>
  );
};
