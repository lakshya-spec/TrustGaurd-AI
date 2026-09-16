import React, { useState } from 'react';
import {
  Shield,
  Search,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Globe,
  Lock,
  Zap,
  TrendingUp,
  FileText,
  Activity,
  UserCheck,
  ChevronRight,
  Play,
  Layers
} from 'lucide-react';
import { RiskBadge } from '../components/RiskBadge.js';
import { DEMO_SAMPLES } from '../types.js';

interface LandingProps {
  onNavigate: (tab: string, prefillSample?: string, inputType?: 'text' | 'url') => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const activeDemo = DEMO_SAMPLES[selectedDemoIndex];

  return (
    <div className="space-y-20 lg:space-y-28 py-6">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 lg:pt-14 lg:pb-20">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[960px] h-[350px] lg:h-[500px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="tg-container text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs lg:text-sm font-mono font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            OPEN INNOVATION HACKATHON PROJECT
          </div>

          <h1 className="tg-hero-title font-black text-white tracking-tight mb-6 max-w-5xl mx-auto">
            Don't Trust It.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              Verify It.
            </span>
          </h1>

          <p className="tg-hero-subtitle text-slate-300 max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-relaxed mb-8 lg:mb-12 font-normal">
            <strong className="text-white font-semibold">TrustGuard AI</strong> is your multi-agent digital fraud investigator. Detect phishing traps, fake bank KYC texts, fraudulent UPI payment demands, and malicious URLs in seconds with explainable AI.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 mb-12 lg:mb-16">
            <button
              onClick={() => onNavigate('investigate')}
              className="flex items-center gap-2.5 px-7 py-3.5 lg:px-9 lg:py-4.5 rounded-xl font-bold text-sm lg:text-base bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Search className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>Investigate Suspicious Message</span>
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>

            <button
              onClick={() => onNavigate('intel')}
              className="flex items-center gap-2.5 px-6 py-3.5 lg:px-8 lg:py-4.5 rounded-xl font-mono text-sm lg:text-base font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all hover:border-slate-600"
            >
              <Activity className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-400" />
              <span>Live Threat Intelligence</span>
            </button>
          </div>

          {/* Core Pipeline Pillars - full desktop span */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 lg:gap-5 w-full text-left">
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700/80 transition-all">
              <div className="text-xs lg:text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1.5">01 • DETECT</div>
              <div className="text-sm lg:text-base font-bold text-white">Identify Threats</div>
              <p className="text-xs lg:text-sm text-slate-400 mt-1 leading-relaxed">Multi-agent heuristics spot urgent coercion & spoofed headers.</p>
            </div>
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700/80 transition-all">
              <div className="text-xs lg:text-sm font-mono font-bold text-blue-400 uppercase tracking-wider mb-1.5">02 • INVESTIGATE</div>
              <div className="text-sm lg:text-base font-bold text-white">Deep Inspection</div>
              <p className="text-xs lg:text-sm text-slate-400 mt-1 leading-relaxed">URL domain breakdown, SSL protocols, and entity matching.</p>
            </div>
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700/80 transition-all">
              <div className="text-xs lg:text-sm font-mono font-bold text-purple-400 uppercase tracking-wider mb-1.5">03 • EXPLAIN</div>
              <div className="text-sm lg:text-base font-bold text-white">No Jargon Proof</div>
              <p className="text-xs lg:text-sm text-slate-400 mt-1 leading-relaxed">Plain-English evidence matrix showing exactly why it's unsafe.</p>
            </div>
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700/80 transition-all">
              <div className="text-xs lg:text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1.5">04 • PROTECT</div>
              <div className="text-sm lg:text-base font-bold text-white">Actionable Steps</div>
              <p className="text-xs lg:text-sm text-slate-400 mt-1 leading-relaxed">Immediate guidance, block procedures & emergency 1930 reporting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Quick-Scanner Showcase */}
      <section className="tg-container">
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div>
              <span className="text-xs lg:text-sm font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Interactive Threat Simulator
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mt-1">
                Test Real-World Scam Patterns
              </h2>
              <p className="text-xs lg:text-sm text-slate-400 mt-1">
                Select a sample payload below to inspect TrustGuard's instant risk score and evidence extraction.
              </p>
            </div>

            <button
              onClick={() => onNavigate('investigate', activeDemo.content, activeDemo.type)}
              className="flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs lg:text-sm font-mono font-bold transition-all shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Analyze This In Full Hub</span>
            </button>
          </div>

          {/* Sample Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:gap-4 mb-6 lg:mb-8">
            {DEMO_SAMPLES.map((sample, idx) => {
              const isSelected = selectedDemoIndex === idx;
              return (
                <button
                  key={sample.id}
                  onClick={() => setSelectedDemoIndex(idx)}
                  className={`p-3.5 lg:p-4 rounded-xl text-left border text-xs lg:text-sm transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-500/80 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <div className="font-bold truncate">{sample.label}</div>
                  <div className="text-[11px] lg:text-xs font-mono text-cyan-400 mt-0.5">{sample.category}</div>
                </button>
              );
            })}
          </div>

          {/* Live Mock Inspection Card */}
          <div className="p-5 lg:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
            <div className="flex-1 w-full">
              <div className="text-[11px] lg:text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Investigated Text Payload</span>
                <span className="text-cyan-400 font-bold">{activeDemo.type.toUpperCase()}</span>
              </div>
              <div className="p-4 lg:p-5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs lg:text-sm text-slate-200 leading-relaxed break-words">
                "{activeDemo.content}"
              </div>
            </div>

            <div className="w-full lg:w-72 xl:w-80 p-5 lg:p-6 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center shrink-0">
              <span className="text-[10px] lg:text-xs font-mono text-slate-400 uppercase">Simulated Assessment</span>
              <div className="text-4xl lg:text-5xl font-black font-mono text-rose-400 my-2 lg:my-3">
                {activeDemo.label.includes('Safe') ? '08' : activeDemo.label.includes('SBI') ? '96' : '88'}
                <span className="text-xs lg:text-sm text-slate-500 font-normal"> / 100</span>
              </div>
              <RiskBadge
                level={activeDemo.label.includes('Safe') ? 'SAFE' : activeDemo.label.includes('SBI') ? 'CRITICAL' : 'HIGH'}
                size="md"
              />
              <p className="text-[11px] lg:text-xs text-slate-400 mt-3 leading-snug">
                {activeDemo.label.includes('Safe')
                  ? 'Benign communication pattern'
                  : 'Multiple high-risk phishing & coercion signals identified'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. System Architecture & Flowchart (Section 32) */}
      <section className="tg-container">
        <div className="text-center max-w-2xl lg:max-w-3xl mx-auto mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs lg:text-sm font-mono text-cyan-400 uppercase font-semibold">
            <Layers className="w-4 h-4" /> Comprehensive Workflow
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mt-1">
            The TrustGuard AI Architecture Pipeline
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-400 mt-2">
            Every investigation passes through a strict 9-stage sequence, ensuring transparency and eliminating opaque hallucinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {[
            { step: '01', title: 'User Input', desc: 'Accepts SMS, WhatsApp text, phishing links, or mobile screenshots.' },
            { step: '02', title: 'Data Preprocessing', desc: 'Cleans, tokenizes, and extracts embedded phone numbers, domains, and VPAs.' },
            { step: '03', title: 'Multi-Agent Analysis', desc: '5 specialized agents concurrently evaluate urgency, impersonation, and tactics.' },
            { step: '04', title: 'Rule-Based Signals', desc: 'Deterministic heuristic weights assign calibrated threat scores to signals.' },
            { step: '05', title: 'URL & Domain Check', desc: 'Deep syntax inspection of TLDs, IP hosts, protocols, and deceptive brands.' },
            { step: '06', title: 'Risk Engine Synthesis', desc: 'Mathematically blends heuristic weights with neural classification (0–100).' },
            { step: '07', title: 'Evidence Generation', desc: 'Generates transparent node relationships and non-technical explanations.' },
            { step: '08', title: 'User Dashboard Output', desc: 'Renders circular risk gauge, red flag tags, and interactive network graph.' },
            { step: '09', title: 'Protective Guidance', desc: 'Delivers actionable checklists, block steps, and emergency 1930 helplines.' },
          ].map((card, i) => (
            <div
              key={i}
              className="p-5 lg:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                  STAGE {card.step}
                </span>
                <span className="text-slate-600 font-mono text-xs">PIPELINE</span>
              </div>
              <h3 className="font-bold text-sm lg:text-base text-white mt-1">{card.title}</h3>
              <p className="text-xs lg:text-sm text-slate-400 mt-1 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Hackathon Open Innovation Pitch Banner */}
      <section className="tg-container">
        <div className="p-8 sm:p-10 lg:p-12 xl:p-14 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          <div className="space-y-2 lg:space-y-3">
            <span className="text-xs lg:text-sm font-mono text-cyan-400 uppercase tracking-wider font-bold">
              Ready to verify content?
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Test TrustGuard AI Right Now
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-lg lg:max-w-2xl">
              No registration or software download required. Paste any suspicious message or URL to run an immediate multi-agent threat audit.
            </p>
          </div>

          <button
            onClick={() => onNavigate('investigate')}
            className="px-8 py-4 lg:px-9 lg:py-4.5 rounded-xl font-bold text-sm lg:text-base bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/30 transition-all shrink-0 font-mono"
          >
            Launch Investigation Studio →
          </button>
        </div>
      </section>
    </div>
  );
};
