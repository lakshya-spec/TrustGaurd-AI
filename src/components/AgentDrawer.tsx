import React, { useState } from 'react';
import { AgentFindings } from '../types.js';
import { Bot, ChevronDown, ChevronUp, Cpu, Globe, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';

interface AgentDrawerProps {
  agents: AgentFindings;
  engineUsed: string;
}

export const AgentDrawer: React.FC<AgentDrawerProps> = ({ agents, engineUsed }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="multi-agent-breakdown-card" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100 text-base">Multi-Agent Investigative Panel</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                5 Specialized Agents
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Engine: <span className="text-cyan-400 font-mono">{engineUsed}</span>
            </p>
          </div>
        </div>

        <button
          className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition-colors"
          aria-label="Toggle agent breakdown"
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
          {/* Agent 1 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                Agent 1 • Scam Analyst
              </h4>
            </div>
            <p className="text-xs text-slate-300 mb-2">{agents.scamAnalyst.summary}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                Sentiment: {agents.scamAnalyst.sentiment}
              </span>
              {agents.scamAnalyst.manipulationTactics.map((t, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Agent 2 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Agent 2 • URL Investigator
              </h4>
            </div>
            <p className="text-xs text-slate-300 mb-2">{agents.urlInvestigator.summary}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                Domain: {agents.urlInvestigator.domain}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${agents.urlInvestigator.isHttps ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40' : 'bg-rose-950/60 text-rose-300 border-rose-800/40'}`}>
                {agents.urlInvestigator.isHttps ? 'HTTPS Secure' : 'Insecure HTTP'}
              </span>
            </div>
          </div>

          {/* Agent 3 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Agent 3 • Context Analyst
              </h4>
            </div>
            <p className="text-xs text-slate-300 mb-2">{agents.contextAnalyst.summary}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {agents.contextAnalyst.impersonationTarget && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                  Target: {agents.contextAnalyst.impersonationTarget}
                </span>
              )}
              {agents.contextAnalyst.financialCoercion && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40">
                  Financial Pressure Detected
                </span>
              )}
            </div>
          </div>

          {/* Agent 4 & 5 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                Agent 4 & 5 • Risk & Response
              </h4>
            </div>
            <p className="text-xs text-slate-300 mb-2">{agents.responseAgent.plainLanguageSummary}</p>
            <div className="text-[11px] font-mono text-slate-400 mt-2">
              Synthesized Signals: {agents.riskAnalyst.ruleSignals?.length || 0} active threat markers evaluated.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
