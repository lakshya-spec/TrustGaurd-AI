import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Flame,
  Activity,
  ArrowUpRight,
  RefreshCw,
  ExternalLink,
  Lock,
  Globe,
  Radio
} from 'lucide-react';
import { InvestigationStats, InvestigationResult } from '../types.js';
import { fetchStatsApi, fetchInvestigations } from '../services/api.js';
import { RiskBadge } from '../components/RiskBadge.js';

interface ThreatIntelProps {
  onInspectItem?: (item: InvestigationResult) => void;
}

export const ThreatIntel: React.FC<ThreatIntelProps> = ({ onInspectItem }) => {
  const [stats, setStats] = useState<InvestigationStats | null>(null);
  const [recentFeed, setRecentFeed] = useState<InvestigationResult[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, feedData] = await Promise.all([fetchStatsApi(), fetchInvestigations()]);
      setStats(statsData);
      setRecentFeed(feedData.slice(0, 5));
    } catch (err) {
      console.error('Error fetching threat intelligence data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const advisories = [
    {
      title: 'Digital Arrest / Fake Police Coercion',
      severity: 'CRITICAL',
      tag: 'Coercive Fraud',
      desc: 'Criminals impersonating police, CBI, or customs via video calls claiming drugs/passports were seized. Victims are kept on video for hours and coerced into transferring funds for "bail verification".'
    },
    {
      title: 'Electricity Bill Disconnection SMS',
      severity: 'HIGH',
      tag: 'Utility Phishing',
      desc: 'Mass SMS alerts warning that power supply will be cut off tonight due to unpaid dues. Contains unverified mobile numbers or APK download links for credential harvesting.'
    },
    {
      title: 'Work-from-Home Telegram Review Tasks',
      severity: 'HIGH',
      tag: 'Task Fraud',
      desc: 'Victims are paid small initial rewards (₹150–₹500) for liking YouTube videos or writing reviews, then pressured into investing large sums in fictitious crypto/merchant tasks.'
    },
    {
      title: 'e-Challan Fake Traffic Fine Links',
      severity: 'HIGH',
      tag: 'Spoofing',
      desc: 'SMS messages claiming pending vehicle violation fines with spoofed links mimicking the Parivahan portal to steal debit card credentials and net-banking OTPs.'
    }
  ];

  return (
    <div className="tg-container py-8 lg:py-12 space-y-10 lg:space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs lg:text-sm font-mono font-semibold mb-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            GLOBAL THREAT INTELLIGENCE & TELEMETRY
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Threat Radar & Scam Analytics
          </h1>
          <p className="text-sm lg:text-base text-slate-400 mt-1">
            Aggregated patterns, distribution metrics, and emergent attack vectors recorded by the TrustGuard engine.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 lg:px-5 lg:py-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 text-xs lg:text-sm font-mono transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="p-5 lg:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs lg:text-sm font-mono mb-2">
            <span>TOTAL ANALYZED</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl lg:text-4xl font-black font-mono text-white">
            {stats ? stats.total_analyzed : '--'}
          </div>
          <p className="text-[11px] lg:text-xs text-slate-400 mt-2">Processed submissions across all modalities</p>
        </div>

        <div className="p-5 lg:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs lg:text-sm font-mono mb-2">
            <span>HIGH-RISK THREATS</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl lg:text-4xl font-black font-mono text-rose-400">
            {stats ? stats.threats_blocked : '--'}
          </div>
          <p className="text-[11px] lg:text-xs text-slate-400 mt-2">Incidents flagged ≥70 risk threshold</p>
        </div>

        <div className="p-5 lg:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs lg:text-sm font-mono mb-2">
            <span>PHISHING ATTEMPTS</span>
            <Globe className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl lg:text-4xl font-black font-mono text-orange-400">
            {stats ? stats.phishing_attempts : '--'}
          </div>
          <p className="text-[11px] lg:text-xs text-slate-400 mt-2">Banking impersonation & deceptive links</p>
        </div>

        <div className="p-5 lg:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs lg:text-sm font-mono mb-2">
            <span>AVG THREAT SCORE</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl lg:text-4xl font-black font-mono text-amber-400">
            {stats ? `${stats.avg_risk_score}/100` : '--'}
          </div>
          <p className="text-[11px] lg:text-xs text-slate-400 mt-2">Synthesized risk mean index</p>
        </div>
      </div>

      {/* Main Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Category Distribution */}
        <div className="lg:col-span-6 p-6 lg:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base lg:text-lg text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-400" />
              Scam Category Distribution
            </h3>
            <span className="text-xs font-mono text-slate-400">Active Incidents</span>
          </div>

          <div className="space-y-4">
            {stats?.categories_distribution?.map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs lg:text-sm font-mono">
                  <span className="text-slate-200 font-semibold">{cat.category}</span>
                  <span className="text-cyan-400 font-bold">{cat.count} cases ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(cat.percentage, 5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Threat Severity Levels */}
        <div className="lg:col-span-6 p-6 lg:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base lg:text-lg text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400" />
              Risk Severity Breakdown
            </h3>
            <span className="text-xs font-mono text-slate-400">Score Range Filter</span>
          </div>

          <div className="space-y-3.5">
            {stats?.risk_distribution?.map((dist, i) => (
              <div
                key={i}
                className="p-3.5 lg:p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: dist.color }}
                  />
                  <span className="text-xs lg:text-sm font-mono font-bold text-slate-200">
                    {dist.level}
                  </span>
                </div>
                <div className="font-mono text-xs lg:text-sm font-bold text-slate-300">
                  {dist.count} flagged
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergent Scam Trends & Advisories */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-lg lg:text-xl">
          <Flame className="w-5 h-5 text-rose-400" />
          <span>Active Cyber Threat Advisories</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {advisories.map((adv, idx) => (
            <div
              key={idx}
              className="p-5 lg:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all backdrop-blur-sm space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] lg:text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                  {adv.severity} ALERT
                </span>
                <span className="text-[11px] lg:text-xs font-mono text-slate-400">{adv.tag}</span>
              </div>
              <h4 className="font-bold text-sm lg:text-base text-slate-100 mt-1">{adv.title}</h4>
              <p className="text-xs lg:text-sm text-slate-400 leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Telemetry Stream */}
      <div className="p-6 lg:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
        <h3 className="font-bold text-base lg:text-lg text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          Recent Real-Time Investigations Stream
        </h3>
        <div className="space-y-2.5">
          {recentFeed.map(item => (
            <div
              key={item.id}
              className="p-3.5 lg:p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <RiskBadge level={item.risk_level} size="sm" />
                  <span className="text-xs lg:text-sm font-bold text-slate-200">{item.category}</span>
                  <span className="text-[10px] lg:text-xs font-mono text-slate-500">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-slate-400 font-mono line-clamp-1">
                  "{item.inputData}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs lg:text-sm font-bold text-cyan-400">
                  {item.risk_score}/100
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
