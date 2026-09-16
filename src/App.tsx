/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { Landing } from './pages/Landing.js';
import { Investigate } from './pages/Investigate.js';
import { ThreatIntel } from './pages/ThreatIntel.js';
import { History } from './pages/History.js';
import { HowItWorks } from './pages/HowItWorks.js';
import { About } from './pages/About.js';
import { PresentationMode } from './components/PresentationMode.js';
import { InvestigationResult } from './types.js';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [prefillPayload, setPrefillPayload] = useState<string | undefined>(undefined);
  const [prefillType, setPrefillType] = useState<'text' | 'url'>('text');
  const [presentationResult, setPresentationResult] = useState<InvestigationResult | null>(null);

  const handleNavigate = (tab: string, prefillSample?: string, inputType: 'text' | 'url' = 'text') => {
    if (prefillSample) {
      setPrefillPayload(prefillSample);
      setPrefillType(inputType);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSamplePresentation = () => {
    // Open presentation mode with a high-impact demo result
    const sampleDemoResult: InvestigationResult = {
      id: 'demo-pres',
      timestamp: new Date().toISOString(),
      inputType: 'text',
      inputData: 'URGENT! Your SBI account will be blocked today. Complete KYC immediately at https://sbi-verification-update-kyc.com/login',
      risk_score: 96,
      risk_level: 'CRITICAL',
      category: 'Phishing',
      confidence: 96,
      summary: 'High-severity banking impersonation phishing attack. Utilizes artificial account suspension urgency to manipulate user into clicking an unauthorized fake banking portal.',
      red_flags: [
        {
          id: 'pres-1',
          title: 'Urgency Manipulation',
          severity: 'HIGH',
          explanation: 'Threatens immediate same-day account block to induce panic.',
          tag: 'Psychological'
        },
        {
          id: 'pres-2',
          title: 'Brand Impersonation (State Bank of India)',
          severity: 'HIGH',
          explanation: 'Claims provenance from SBI without official domain authentication.',
          tag: 'Identity Spoofing'
        },
        {
          id: 'pres-3',
          title: 'Deceptive Phishing URL',
          severity: 'CRITICAL',
          explanation: 'Domain uses deceptive naming structure (sbi-verification-update-kyc.com) rather than sbi.co.in.',
          tag: 'Phishing Link'
        }
      ],
      evidence: [
        'Threatens immediate account block within 24 hours',
        'Unofficial domain (sbi-verification-update-kyc.com) mimics SBI',
        'Requests urgent KYC update via unverified external URL'
      ],
      recommendations: [
        'Do not click the link or input credentials.',
        'Never share your net-banking password or OTP with anyone.',
        'Report the phishing URL to report.phishing@sbi.co.in and national cyber crime cell.'
      ],
      agents: {
        scamAnalyst: {
          urgencyDetected: true,
          manipulationTactics: ['Urgency Coercion', 'Fear of Asset Freeze'],
          sentiment: 'High Urgency / Coercive',
          summary: 'Detected acute urgency phrasing designed to disable critical verification reflexes.'
        },
        urlInvestigator: {
          hasUrl: true,
          domain: 'sbi-verification-update-kyc.com',
          isHttps: true,
          domainMismatch: true,
          suspiciousTld: false,
          summary: 'Domain registered recently; mismatched against legitimate State Bank of India primary infrastructure.'
        },
        contextAnalyst: {
          impersonationTarget: 'STATE BANK OF INDIA',
          financialCoercion: true,
          credentialHarvesting: true,
          summary: 'Clear attempt to exploit institutional trust to siphon banking credentials.'
        },
        riskAnalyst: {
          baseScore: 95,
          ruleSignals: [
            { rule: 'Urgency Language Manipulation', points: 15 },
            { rule: 'Brand Impersonation', points: 20 },
            { rule: 'Deceptive Phishing Domain', points: 25 },
            { rule: 'KYC Pretext', points: 15 }
          ],
          totalCalculated: 96
        },
        responseAgent: {
          plainLanguageSummary: 'This is a dangerous fake message attempting to steal your SBI bank login and money. Do not open the link.',
          actionAdvice: 'Block sender immediately and report to official cyber crime cell.'
        }
      },
      timelineMs: 380,
      engineUsed: 'Gemini 3.8 Flash (AI Panel)'
    };
    setPresentationResult(sampleDemoResult);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Cybersecurity Top Accent Line */}
      <div className="h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 w-full" />

      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        onOpenPresentation={handleOpenSamplePresentation}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {currentTab === 'landing' && <Landing onNavigate={handleNavigate} />}
        {currentTab === 'investigate' && (
          <Investigate initialPayload={prefillPayload} initialType={prefillType} />
        )}
        {currentTab === 'intel' && (
          <ThreatIntel onInspectItem={item => {
            setPrefillPayload(item.inputData);
            setPrefillType(item.inputType === 'url' ? 'url' : 'text');
            setCurrentTab('investigate');
          }} />
        )}
        {currentTab === 'history' && <History />}
        {currentTab === 'how-it-works' && <HowItWorks />}
        {currentTab === 'about' && <About />}
      </main>

      {/* Presentation Mode Full-screen Overlay */}
      {presentationResult && (
        <PresentationMode
          result={presentationResult}
          onClose={() => setPresentationResult(null)}
        />
      )}

      {/* Footer */}
      <Footer onSelectTab={handleNavigate} />
    </div>
  );
}
