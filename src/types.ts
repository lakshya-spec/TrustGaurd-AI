export type RiskLevel = 'SAFE' | 'LOW' | 'SUSPICIOUS' | 'HIGH' | 'CRITICAL';

export type ScamCategory =
  | 'Phishing'
  | 'Bank/UPI Fraud'
  | 'KYC Scam'
  | 'Job Scam'
  | 'Investment Scam'
  | 'Delivery Scam'
  | 'Lottery/Prize Scam'
  | 'Government Impersonation'
  | 'Social Media Impersonation'
  | 'Tech Support Scam'
  | 'Romance Scam'
  | 'Unknown/Suspicious'
  | 'Legitimate / Safe';

export interface RedFlag {
  id: string;
  title: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  explanation: string;
  tag?: string;
}

export interface AgentFindings {
  scamAnalyst: {
    urgencyDetected: boolean;
    manipulationTactics: string[];
    sentiment: string;
    summary: string;
  };
  urlInvestigator: {
    hasUrl: boolean;
    domain: string;
    isHttps: boolean;
    domainMismatch: boolean;
    suspiciousTld: boolean;
    summary: string;
  };
  contextAnalyst: {
    impersonationTarget: string | null;
    financialCoercion: boolean;
    credentialHarvesting: boolean;
    summary: string;
  };
  riskAnalyst: {
    baseScore: number;
    ruleSignals: { rule: string; points: number }[];
    totalCalculated: number;
  };
  responseAgent: {
    plainLanguageSummary: string;
    actionAdvice: string;
  };
}

export interface InvestigationResult {
  id: string;
  timestamp: string;
  inputType: 'text' | 'url' | 'screenshot';
  inputData: string;
  risk_score: number; // 0 - 100
  risk_level: RiskLevel;
  category: ScamCategory;
  confidence: number; // 0 - 100
  summary: string;
  red_flags: RedFlag[];
  evidence: string[];
  recommendations: string[];
  agents: AgentFindings;
  timelineMs: number;
  engineUsed: 'Gemini 3.6 Flash (AI Panel)' | 'Rule-Based Engine (Demo / Fallback)';
}

export interface InvestigationStats {
  total_analyzed: number;
  threats_blocked: number;
  phishing_attempts: number;
  avg_risk_score: number;
  categories_distribution: { category: string; count: number; percentage: number }[];
  risk_distribution: { level: string; count: number; color: string }[];
}

export type PageView = 'home' | 'investigate' | 'intel' | 'history' | 'how-it-works' | 'about';

export interface DemoSample {
  id: string;
  label: string;
  type: 'text' | 'url';
  content: string;
  category: string;
  expectedScore: number;
}

export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: 'demo-sbi',
    label: 'Demo 1: Fake Bank KYC SMS',
    type: 'text',
    content: 'URGENT! Your SBI account will be blocked today. Complete KYC immediately at https://sbi-verification-update-kyc.com/login to avoid suspension.',
    category: 'Phishing',
    expectedScore: 96,
  },
  {
    id: 'demo-lottery',
    label: 'Demo 2: Lottery Prize UPI Scam',
    type: 'text',
    content: 'Congratulations! You have won ₹25,00,000 in the KBC lucky draw. Pay ₹4,999 registration fee immediately to claim your prize via UPI to winner@okaxis',
    category: 'Lottery/Prize Scam',
    expectedScore: 88,
  },
  {
    id: 'demo-delivery',
    label: 'Demo 3: Amazon Delivery Failure',
    type: 'text',
    content: 'Your Amazon package delivery could not be completed due to wrong address pin. Pay ₹39 rescheduling charge at: http://amazon-delivery-status.top',
    category: 'Delivery Scam',
    expectedScore: 84,
  },
  {
    id: 'demo-safe',
    label: 'Demo 4: Safe Meeting Invite',
    type: 'text',
    content: 'Hey, are we still meeting tomorrow at 5 PM for the design review? Let me know if you need to reschedule or share any notes beforehand.',
    category: 'Legitimate / Safe',
    expectedScore: 8,
  },
];
