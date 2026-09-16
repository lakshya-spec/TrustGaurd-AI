import React, { useState, useEffect } from 'react';
import {
  Search,
  MessageSquare,
  Globe,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  RotateCcw,
  Presentation,
  Download,
  Share2,
  Clock,
  Zap,
  Upload,
  CheckCircle2,
  HelpCircle,
  FileWarning
} from 'lucide-react';
import { InvestigationResult, DEMO_SAMPLES } from '../types.js';
import { analyzeMessageApi, analyzeUrlApi, analyzeScreenshotApi } from '../services/api.js';
import { RiskMeter } from '../components/RiskMeter.js';
import { RiskBadge } from '../components/RiskBadge.js';
import { RedFlagCard } from '../components/RedFlagCard.js';
import { RecommendationCard } from '../components/RecommendationCard.js';
import { EvidenceGraph } from '../components/EvidenceGraph.js';
import { AgentDrawer } from '../components/AgentDrawer.js';
import { InvestigationTimeline } from '../components/InvestigationTimeline.js';
import { PresentationMode } from '../components/PresentationMode.js';

interface InvestigateProps {
  initialPayload?: string;
  initialType?: 'text' | 'url';
}

export const Investigate: React.FC<InvestigateProps> = ({ initialPayload, initialType = 'text' }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'url' | 'screenshot'>(initialType);
  const [textContent, setTextContent] = useState<string>(initialPayload || '');
  const [urlContent, setUrlContent] = useState<string>(initialType === 'url' ? initialPayload || '' : '');
  const [screenshotBase64, setScreenshotBase64] = useState<string>('');
  const [screenshotNote, setScreenshotNote] = useState<string>('');
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');

  const [isInvestigating, setIsInvestigating] = useState(false);
  const [analysisFinished, setAnalysisFinished] = useState(false);
  const [timelineFinished, setTimelineFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestigationResult | null>(null);
  const [showPresentation, setShowPresentation] = useState(false);

  useEffect(() => {
    if (initialPayload) {
      if (initialType === 'url') {
        setUrlContent(initialPayload);
        setActiveTab('url');
      } else {
        setTextContent(initialPayload);
        setActiveTab('text');
      }
    }
  }, [initialPayload, initialType]);

  const handleStartAnalysis = async () => {
    setError(null);
    setAnalysisFinished(false);
    setTimelineFinished(false);
    setResult(null);

    // Validation
    if (activeTab === 'text' && !textContent.trim()) {
      setError('Please enter or paste the message text you wish to investigate.');
      return;
    }
    if (activeTab === 'url' && !urlContent.trim()) {
      setError('Please provide a URL to investigate.');
      return;
    }
    if (activeTab === 'screenshot' && !screenshotBase64) {
      setError('Please upload or drag-and-drop a screenshot image.');
      return;
    }

    setIsInvestigating(true);
    setResult(null);

    try {
      let analysisRes: InvestigationResult;
      if (activeTab === 'text') {
        analysisRes = await analyzeMessageApi(textContent);
      } else if (activeTab === 'url') {
        analysisRes = await analyzeUrlApi(urlContent);
      } else {
        analysisRes = await analyzeScreenshotApi(screenshotBase64, 'image/jpeg', screenshotNote);
      }
      setResult(analysisRes);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err?.message || 'Investigation failed. Please check connection and retry.');
    } finally {
      setAnalysisFinished(true);
    }
  };

  const loadDemo = (sample: typeof DEMO_SAMPLES[0]) => {
    setError(null);
    if (sample.type === 'url') {
      setActiveTab('url');
      setUrlContent(sample.content);
    } else {
      setActiveTab('text');
      setTextContent(sample.content);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only image files (PNG, JPG, WebP) are supported for screenshot analysis.');
      return;
    }

    setScreenshotFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setScreenshotBase64(reader.result);
        setError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setTextContent('');
    setUrlContent('');
    setScreenshotBase64('');
    setScreenshotNote('');
    setScreenshotFileName('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="tg-container py-8 lg:py-12 space-y-10 lg:space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl lg:max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs lg:text-sm font-mono font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          MULTI-AGENT INVESTIGATION STUDIO
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Investigate Suspicious Digital Content
        </h1>
        <p className="text-sm lg:text-base text-slate-400 mt-2.5 max-w-3xl mx-auto leading-relaxed">
          Submit suspicious SMS alerts, WhatsApp forwards, phishing domains, or message screenshots. TrustGuard parses manipulation cues, URL anomalies, and fraud indicators in real-time.
        </p>
      </div>

      {/* Investigation Input Form or Active Scanner */}
      {isInvestigating ? (
        <InvestigationTimeline onComplete={() => {
          setTimelineFinished(true);
          setIsInvestigating(false);
        }} />
      ) : result ? (
        /* Results View */
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Top Result Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 lg:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <RiskBadge level={result.risk_level} size="lg" />
              <div>
                <span className="text-xs font-mono text-slate-400">Category Detected</span>
                <div className="text-lg lg:text-xl font-bold text-white">{result.category}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 lg:gap-3">
              <button
                onClick={() => setShowPresentation(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 lg:px-4 lg:py-2.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 text-xs lg:text-sm font-mono font-bold transition-all"
              >
                <Presentation className="w-4 h-4" />
                <span>Presentation Mode</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3.5 py-2 lg:px-4 lg:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs lg:text-sm font-mono font-medium transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Investigation</span>
              </button>
            </div>
          </div>

          {/* Primary Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Risk Meter & Summary */}
            <div className="lg:col-span-4 xl:col-span-4 space-y-6 lg:space-y-8">
              <RiskMeter score={result.risk_score} level={result.risk_level} size="lg" />

              {/* Plain English Summary */}
              <div className="p-6 lg:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Plain-English Summary
                </h3>
                <p className="text-sm lg:text-base text-slate-200 leading-relaxed font-medium">
                  {result.summary}
                </p>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] lg:text-xs font-mono text-slate-400">
                  <span>Confidence: {result.confidence}%</span>
                  <span>Analyzed in {result.timelineMs}ms</span>
                </div>
              </div>

              {/* Extracted Evidence Points */}
              <div className="p-6 lg:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Extracted Threat Evidence ({result.evidence.length})
                </h3>
                <ul className="space-y-2 text-xs lg:text-sm text-slate-300">
                  {result.evidence.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Red Flags, Evidence Graph & Guidance */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-6 lg:space-y-8">
              {/* Detected Red Flags Section */}
              <div className="p-6 lg:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm lg:text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <FileWarning className="w-4 h-4 text-rose-400" />
                    Detected Threat Red Flags ({result.red_flags.length})
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Weighted Heuristic Flags</span>
                </div>

                {result.red_flags.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 lg:gap-4">
                    {result.red_flags.map(flag => (
                      <RedFlagCard key={flag.id} flag={flag} />
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>No critical fraud red flags identified in this submission.</span>
                  </div>
                )}
              </div>

              {/* Evidence Relationship Graph */}
              <EvidenceGraph result={result} />

              {/* Specialized Multi-Agent Drawer */}
              <AgentDrawer agents={result.agents} engineUsed={result.engineUsed} />

              {/* Protective Recommendations */}
              <RecommendationCard
                level={result.risk_level}
                category={result.category}
                recommendations={result.recommendations}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Input Form View */
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl space-y-6 lg:space-y-8">
          {/* Tab Selector */}
          <div className="flex border-b border-slate-800 pb-2 gap-2">
            {[
              { id: 'text', label: 'Message Text / SMS', icon: MessageSquare },
              { id: 'url', label: 'Suspicious URL', icon: Globe },
              { id: 'screenshot', label: 'Upload Screenshot', icon: ImageIcon },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setError(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content 1: Message Text */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Paste suspicious SMS, WhatsApp message, Telegram task offer, or email content:</span>
                <span className="font-mono">{textContent.length} / 5000 chars</span>
              </div>
              <textarea
                value={textContent}
                onChange={e => setTextContent(e.target.value)}
                rows={6}
                placeholder="Example: 'URGENT! Your SBI account will be blocked today. Complete KYC immediately at https://sbi-verification-update-kyc.com/login'..."
                className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 font-mono text-sm leading-relaxed"
              />
            </div>
          )}

          {/* Tab Content 2: URL */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Enter the full web address to inspect domain spoofing, suspicious TLD, and phishing tokens:
              </div>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={urlContent}
                  onChange={e => setUrlContent(e.target.value)}
                  placeholder="https://sbi-verification-update-kyc.com/login"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 font-mono text-sm"
                />
              </div>
            </div>
          )}

          {/* Tab Content 3: Screenshot */}
          {activeTab === 'screenshot' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Upload a screenshot of an SMS, suspicious payment request, or WhatsApp chat:
              </div>

              <label className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-800 hover:border-cyan-500/40 bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer transition-all">
                <Upload className="w-8 h-8 text-cyan-400 mb-2" />
                <span className="text-sm font-semibold text-slate-200">
                  {screenshotFileName ? screenshotFileName : 'Click to select or drag and drop image'}
                </span>
                <span className="text-xs text-slate-500 mt-1 font-mono">PNG, JPG, JPEG up to 10MB</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>

              {screenshotBase64 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Screenshot loaded successfully
                  </div>
                  <input
                    type="text"
                    value={screenshotNote}
                    onChange={e => setScreenshotNote(e.target.value)}
                    placeholder="Optional: Provide context (e.g., 'Received from unknown number claiming to be FedEx')..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* Error notice */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Row & Analyze Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors"
              >
                Clear Input
              </button>
            </div>

            <button
              onClick={handleStartAnalysis}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all font-mono active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Analyze Threat Signals</span>
            </button>
          </div>

          {/* Pre-Loaded Demo Samples Strip */}
          <div className="pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Quick 1-Click Demo Scenarios (For Evaluators)
              </span>
              <span className="text-[11px] text-cyan-400 font-mono">Click to autofill</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {DEMO_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => loadDemo(sample)}
                  className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {sample.label}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                    {sample.category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Presentation Mode Full Screen Overlay */}
      {showPresentation && result && (
        <PresentationMode result={result} onClose={() => setShowPresentation(false)} />
      )}
    </div>
  );
};
