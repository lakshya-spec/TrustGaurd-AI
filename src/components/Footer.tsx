import React from 'react';
import { Shield, PhoneCall, ExternalLink, Heart, Lock, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-20 border-t border-slate-900 bg-slate-950/90 text-slate-400 text-xs">
      <div className="tg-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base lg:text-lg text-white">TrustGuard AI</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                v1.0
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs lg:text-sm max-w-xl">
              Your AI-Powered Digital Fraud Investigator. Protecting everyday citizens and students from phishing attacks, UPI payment traps, spoofed institutional portals, and psychological manipulation.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] lg:text-xs font-mono text-cyan-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Deterministic Rule Scoring Engine + Gemini 3.8 Flash Neural Panel</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-1 lg:col-span-3 space-y-2">
            <h4 className="font-mono text-xs lg:text-sm font-bold text-slate-200 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs lg:text-sm">
              <li>
                <button onClick={() => onSelectTab('investigate')} className="hover:text-cyan-400 transition-colors">
                  Investigate Message / URL
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('intel')} className="hover:text-cyan-400 transition-colors">
                  Threat Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('history')} className="hover:text-cyan-400 transition-colors">
                  Investigation History
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('how-it-works')} className="hover:text-cyan-400 transition-colors">
                  How the Engine Works
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-cyan-400 transition-colors">
                  Hackathon Pitch & Team
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Helpline */}
          <div className="md:col-span-1 lg:col-span-3 space-y-2.5">
            <h4 className="font-mono text-xs lg:text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" /> Emergency Support
            </h4>
            <p className="text-[11px] lg:text-xs text-slate-400">
              If you have been defrauded or sent money under duress, report within 2 hours:
            </p>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-xs lg:text-sm font-bold text-white">National Cyber Helpline: 1930</div>
              <div className="text-[11px] lg:text-xs font-mono text-cyan-400">
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                  cybercrime.gov.in <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Hackathon Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              Disclaimer: TrustGuard AI provides assistive risk analysis. Never share passwords, MPINs, or OTPs.
            </span>
          </div>
          <div>Built for College Hackathon • Open Innovation</div>
        </div>
      </div>
    </footer>
  );
};
