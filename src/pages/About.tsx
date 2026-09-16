import React from 'react';
import {
  Info,
  Shield,
  Award,
  Globe,
  Lock,
  Code2,
  Sparkles,
  Smartphone,
  Cpu,
  CheckCircle2,
  Terminal,
  Compass
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="tg-container py-8 lg:py-12 space-y-12 lg:space-y-14">
      {/* Header */}
      <div className="text-center max-w-3xl lg:max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs lg:text-sm font-mono font-semibold mb-3">
          <Award className="w-3.5 h-3.5" />
          COLLEGE HACKATHON • OPEN INNOVATION
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          About TrustGuard AI
        </h1>
        <p className="text-sm lg:text-base text-slate-400 mt-2.5 max-w-3xl mx-auto leading-relaxed">
          Empowering everyday digital citizens with explainable, multi-agent cyber fraud defense.
        </p>
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="p-6 lg:p-8 rounded-3xl bg-slate-900/80 border border-rose-500/30 backdrop-blur-xl space-y-3.5">
          <div className="text-xs lg:text-sm font-mono font-bold text-rose-400 uppercase tracking-wider">
            THE REAL-WORLD PROBLEM
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            Sophisticated Digital Scams at Mass Scale
          </h2>
          <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
            In 2024 alone, cyber fraud caused tens of thousands of crores in direct consumer losses. Modern scams no longer resemble poorly spelled emails; attackers use authentic bank logos, spoofed SMS sender headers, fake APKs, and high-pressure psychological manipulation (like "Digital Arrests"). Ordinary citizens, students, and seniors have no immediate tool to verify authenticity before falling victim.
          </p>
        </div>

        <div className="p-6 lg:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl space-y-3.5">
          <div className="text-xs lg:text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider">
            THE TRUSTGUARD SOLUTION
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            Instant, Explainable Threat Intelligence
          </h2>
          <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
            TrustGuard AI functions as a personal digital fraud detective. By pairing a deterministic heuristic scoring engine with Gemini 3.8 Flash multi-agent contextual analysis, users get an immediate 0–100 risk score, an evidence graph showing exact manipulation signals, and practical steps to defend themselves.
          </p>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="p-8 lg:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
        <h3 className="font-bold text-xl lg:text-2xl text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          Technical Stack & Engineering Choices
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 text-xs lg:text-sm font-mono">
          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="font-bold text-cyan-300">FRONTEND LAYER</div>
            <p className="text-slate-400 font-sans text-xs lg:text-sm leading-relaxed">
              React 18, Vite, TypeScript, Tailwind CSS, Lucide icons, responsive interactive SVG graph visualizations.
            </p>
          </div>
          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="font-bold text-blue-300">BACKEND & STORAGE</div>
            <p className="text-slate-400 font-sans text-xs lg:text-sm leading-relaxed">
              Express / Node.js runtime + reference FastAPI Python service with SQLite / file persistence and CORS handlers.
            </p>
          </div>
          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="font-bold text-purple-300">AI & SCORING ENGINE</div>
            <p className="text-slate-400 font-sans text-xs lg:text-sm leading-relaxed">
              Gemini 3.8 Flash (@google/genai SDK) with structured JSON schemas, multimodal screenshot OCR, and rule-based fallback.
            </p>
          </div>
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="p-8 lg:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-xl lg:text-2xl text-white">Innovation Roadmap (Post-Hackathon)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs lg:text-sm font-mono">
              <Smartphone className="w-4 h-4" />
              <span>WhatsApp & Telegram Verification Bot</span>
            </div>
            <p className="text-xs lg:text-sm text-slate-400 leading-relaxed">
              Users simply forward suspicious messages directly to a WhatsApp business number for instant risk appraisal.
            </p>
          </div>

          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-xs lg:text-sm font-mono">
              <Globe className="w-4 h-4" />
              <span>Chrome / Brave Browser Extension</span>
            </div>
            <p className="text-xs lg:text-sm text-slate-400 leading-relaxed">
              Real-time background scanning of visited payment gateways, detecting domain spoofing before forms are filled.
            </p>
          </div>

          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs lg:text-sm font-mono">
              <Cpu className="w-4 h-4" />
              <span>Voice Clone / Deepfake Detection</span>
            </div>
            <p className="text-xs lg:text-sm text-slate-400 leading-relaxed">
              Audio frequency anomaly detection to identify synthetic AI voice clones in urgent hostage or bailout calls.
            </p>
          </div>

          <div className="p-5 lg:p-6 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs lg:text-sm font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>Vernacular / Indic Languages</span>
            </div>
            <p className="text-xs lg:text-sm text-slate-400 leading-relaxed">
              Localized explanations and sentiment parsing across Hindi, Tamil, Telugu, Bengali, and Marathi dialects.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="p-6 lg:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs lg:text-sm text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-200 font-bold font-mono">
          <Lock className="w-4 h-4 text-cyan-400" />
          <span>User Privacy & Zero-Knowledge Guarantee</span>
        </div>
        <p className="leading-relaxed">
          TrustGuard AI is built on privacy-by-design. We do not link submitted texts with personal IP identities. Sensitive tokens (like passwords or PAN numbers) are evaluated strictly for threat heuristics and never stored on remote servers.
        </p>
      </div>
    </div>
  );
};
