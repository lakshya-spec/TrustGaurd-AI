import React from 'react';
import {
  HelpCircle,
  Cpu,
  Layers,
  ShieldAlert,
  Scale,
  CheckCircle2,
  Lock,
  Zap,
  Bot,
  AlertTriangle
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const scoringTable = [
    { signal: 'Credential Harvesting Request (OTP, PIN, Password)', weight: '+25', severity: 'CRITICAL' },
    { signal: 'Suspicious Domain / Spoofed TLD / Insecure HTTP', weight: '+25', severity: 'CRITICAL' },
    { signal: 'Unsolicited Financial Payment Demand / UPI Redirection', weight: '+20', severity: 'HIGH' },
    { signal: 'Brand or Authority Impersonation (Banks, Courier, Tax)', weight: '+20', severity: 'HIGH' },
    { signal: 'Urgency Language Manipulation (Immediate freeze, 24 hrs)', weight: '+15', severity: 'HIGH' },
    { signal: 'Coercive Threats (Arrest warrants, police cases, penalties)', weight: '+15', severity: 'HIGH' },
    { signal: 'Unsolicited Lottery / Cash Windfall Bait', weight: '+15', severity: 'HIGH' },
    { signal: 'Compound Multi-Vector Attack (≥3 concurrent indicators)', weight: '+10', severity: 'MEDIUM' },
    { signal: 'Benign Conversational Marker (Meeting updates, friendly talk)', weight: '-20', severity: 'SAFE' },
  ];

  return (
    <div className="tg-container py-8 lg:py-12 space-y-12 lg:space-y-14">
      {/* Header */}
      <div className="text-center max-w-3xl lg:max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs lg:text-sm font-mono font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          EXPLAINABLE CYBERSECURITY ARCHITECTURE
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          How TrustGuard AI Works
        </h1>
        <p className="text-sm lg:text-base text-slate-400 mt-2.5 max-w-3xl mx-auto leading-relaxed">
          A hybrid architecture uniting transparent deterministic heuristics with Gemini 3.8 Flash multi-agent contextual intelligence.
        </p>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          {
            step: '01',
            title: 'DETECT',
            desc: 'Multi-agent tokenization spots linguistic pressure, urgent deadlines, and unsolicited requests.',
            color: 'text-cyan-400',
            bg: 'bg-cyan-950/20 border-cyan-800/60'
          },
          {
            step: '02',
            title: 'INVESTIGATE',
            desc: 'URL syntax inspection parses IP hosts, punycode spoofing, suspicious TLDs, and protocol security.',
            color: 'text-blue-400',
            bg: 'bg-blue-950/20 border-blue-800/60'
          },
          {
            step: '03',
            title: 'EXPLAIN',
            desc: 'Synthesizes transparent evidence graphs so everyday users understand the danger without security jargon.',
            color: 'text-purple-400',
            bg: 'bg-purple-950/20 border-purple-800/60'
          },
          {
            step: '04',
            title: 'PROTECT',
            desc: 'Formulates immediate actionable countermeasures, blocking steps, and national 1930 cyber reporting.',
            color: 'text-emerald-400',
            bg: 'bg-emerald-950/20 border-emerald-800/60'
          }
        ].map(pillar => (
          <div key={pillar.step} className={`p-6 lg:p-7 rounded-2xl border ${pillar.bg} backdrop-blur-sm space-y-2.5`}>
            <div className={`font-mono text-xs lg:text-sm font-bold ${pillar.color}`}>{pillar.step} • {pillar.title}</div>
            <h3 className="font-bold text-base lg:text-lg text-white">{pillar.title}</h3>
            <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* The Transparent Risk Formula */}
      <div className="p-8 lg:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-xl lg:text-2xl text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              The Deterministic Scoring Formula
            </h3>
            <p className="text-xs lg:text-sm text-slate-400 mt-1">
              Why AI should not have unchecked control over security scores.
            </p>
          </div>
          <div className="text-xs lg:text-sm font-mono px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
            Final Score = 0.6 × AI Score + 0.4 × Rule Score
          </div>
        </div>

        <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
          Standard LLMs can hallucinate or produce volatile, inconsistent scores for identical security events. TrustGuard employs a dual-stage synthesis: calibrated heuristic weights establish a verifiable baseline, while Gemini 3.8 Flash conducts nuance reasoning.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs lg:text-sm font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Threat Signal Identified</th>
                <th className="py-3.5 px-4">Weighted Impact</th>
                <th className="py-3.5 px-4">Vector Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {scoringTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-950/40">
                  <td className="py-3.5 px-4 font-sans font-medium text-slate-200">{row.signal}</td>
                  <td className={`py-3.5 px-4 font-bold ${row.weight.startsWith('+') ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {row.weight} pts
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded text-[10px] lg:text-xs uppercase font-bold bg-slate-800 text-slate-300">
                      {row.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* The 5 Specialized Agents */}
      <div className="p-8 lg:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
        <h3 className="font-bold text-xl lg:text-2xl text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-400" />
          The Multi-Agent Investigative Panel
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-xs lg:text-sm font-mono uppercase text-purple-300">Agent 1 • Scam Analyst</h4>
            <p className="text-xs lg:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Scrutinizes linguistics, panic-inducement, time traps, and coercion techniques.
            </p>
          </div>
          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-xs lg:text-sm font-mono uppercase text-cyan-300">Agent 2 • URL Investigator</h4>
            <p className="text-xs lg:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Dissects hostname topography, top-level domain reputation, and credential harvesting landing pages.
            </p>
          </div>
          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-xs lg:text-sm font-mono uppercase text-amber-300">Agent 3 • Context Analyst</h4>
            <p className="text-xs lg:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Flags institutional impersonation, fake courier logistics alerts, and unauthorized KYC demands.
            </p>
          </div>
          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-xs lg:text-sm font-mono uppercase text-rose-300">Agent 4 • Risk Analyst</h4>
            <p className="text-xs lg:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Applies mathematical weights to normalize signals into an objective 0–100 threat score.
            </p>
          </div>
          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800 md:col-span-2">
            <h4 className="font-bold text-xs lg:text-sm font-mono uppercase text-emerald-300">Agent 5 • Response Agent</h4>
            <p className="text-xs lg:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Translates technical vectors into crystal-clear consumer advisories and step-by-step counteractions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
