import fs from 'fs';
import path from 'path';
import { InvestigationResult, InvestigationStats } from '../src/types.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'investigations.json');

const SEED_INVESTIGATIONS: InvestigationResult[] = [
  {
    id: 'seed-01',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    inputType: 'text',
    inputData: 'URGENT! Your SBI account will be blocked today. Complete KYC immediately at https://sbi-verification-update-kyc.com/login',
    risk_score: 96,
    risk_level: 'CRITICAL',
    category: 'Phishing',
    confidence: 96,
    summary: 'High-severity banking impersonation phishing attack. Utilizes artificial account suspension urgency to manipulate user into clicking an unauthorized fake banking portal.',
    red_flags: [
      {
        id: 'rf-sbi-1',
        title: 'Urgency Manipulation',
        severity: 'HIGH',
        explanation: 'Threatens immediate same-day account block to induce panic.',
        tag: 'Psychological'
      },
      {
        id: 'rf-sbi-2',
        title: 'Brand Impersonation (State Bank of India)',
        severity: 'HIGH',
        explanation: 'Claims provenance from SBI without official domain authentication.',
        tag: 'Identity Spoofing'
      },
      {
        id: 'rf-sbi-3',
        title: 'Deceptive Phishing URL',
        severity: 'CRITICAL',
        explanation: 'Domain uses deceptive naming structure (sbi-verification-update-kyc.com) rather than sbi.co.in.',
        tag: 'Phishing Link'
      },
      {
        id: 'rf-sbi-4',
        title: 'Credential Harvesting Risk',
        severity: 'CRITICAL',
        explanation: 'Points to an unverified external login portal targeting net-banking passwords and OTPs.',
        tag: 'Data Theft'
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
      'Report the phishing URL to report.phishing@sbi.co.in and national cyber crime reporting portal.',
      'Block the sender number or email address immediately.'
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
          { rule: 'KYC Pretext', points: 15 },
          { rule: 'Compound Threat Vector', points: 20 }
        ],
        totalCalculated: 96
      },
      responseAgent: {
        plainLanguageSummary: 'This is a dangerous fake message attempting to steal your SBI bank login and money. Do not open the link.',
        actionAdvice: 'Block sender immediately and report to official cyber crime cell.'
      }
    },
    timelineMs: 412,
    engineUsed: 'Gemini 3.8 Flash (AI Panel)'
  },
  {
    id: 'seed-02',
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    inputType: 'text',
    inputData: 'Congratulations! You have won ₹25,00,000 in the lucky draw. Pay ₹4,999 processing fee to claim your prize to UPI ID: win@okaxis',
    risk_score: 88,
    risk_level: 'HIGH',
    category: 'Lottery/Prize Scam',
    confidence: 94,
    summary: 'Classic advance-fee lottery fraud. Promises huge unprompted windfall while demanding an upfront non-refundable fee.',
    red_flags: [
      {
        id: 'rf-lottery-1',
        title: 'Unsolicited Prize / Lottery Bait',
        severity: 'HIGH',
        explanation: 'Offers 25 Lakh Rupees without prior participation in any verified lottery.',
        tag: 'Social Engineering'
      },
      {
        id: 'rf-lottery-2',
        title: 'Advance Fee Demanded',
        severity: 'HIGH',
        explanation: 'Requests ₹4,999 processing fee before funds release — legitimate lotteries never demand advance processing fees.',
        tag: 'Financial Fraud'
      },
      {
        id: 'rf-lottery-3',
        title: 'Personal UPI ID Channel',
        severity: 'MEDIUM',
        explanation: 'Directs payments to an informal UPI VPA rather than corporate escrow.',
        tag: 'UPI Fraud'
      }
    ],
    evidence: [
      'Promises unearned high-value monetary windfall (₹25,00,000)',
      'Demands advance processing payment of ₹4,999',
      'Directs funds to personal UPI identifier'
    ],
    recommendations: [
      'Do not transfer any money or processing fees.',
      'Never send money to claim prizes or lottery winnings.',
      'Block the UPI ID and sender on Google Pay / PhonePe / Paytm.',
      'Report the UPI VPA to the National Payments Corporation of India (NPCI).'
    ],
    agents: {
      scamAnalyst: {
        urgencyDetected: false,
        manipulationTactics: ['Greed Bait', 'Artificial Windfall'],
        sentiment: 'Overly Enthusiastic Bait',
        summary: 'Exploits lottery excitement to disguise an advance-fee fraud scheme.'
      },
      urlInvestigator: {
        hasUrl: false,
        domain: 'None',
        isHttps: false,
        domainMismatch: false,
        suspiciousTld: false,
        summary: 'No external web address provided; transactions routed via UPI.'
      },
      contextAnalyst: {
        impersonationTarget: null,
        financialCoercion: true,
        credentialHarvesting: false,
        summary: 'Classic 419 advance-fee fraud adapted for domestic UPI payment rails.'
      },
      riskAnalyst: {
        baseScore: 85,
        ruleSignals: [
          { rule: 'Unsolicited Prize Bait', points: 25 },
          { rule: 'Advance Payment Request', points: 25 },
          { rule: 'UPI Diversion', points: 20 },
          { rule: 'Compound Signals', points: 18 }
        ],
        totalCalculated: 88
      },
      responseAgent: {
        plainLanguageSummary: 'This is a scam. Nobody gives away 25 lakh rupees in a lucky draw, and any request for a processing fee is pure theft.',
        actionAdvice: 'Ignore the message and do not pay any money.'
      }
    },
    timelineMs: 340,
    engineUsed: 'Gemini 3.8 Flash (AI Panel)'
  },
  {
    id: 'seed-03',
    timestamp: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
    inputType: 'text',
    inputData: 'Your Amazon package could not be delivered due to incorrect address. Pay ₹39 to reschedule delivery at: http://amazon-delivery-status.top',
    risk_score: 84,
    risk_level: 'HIGH',
    category: 'Delivery Scam',
    confidence: 91,
    summary: 'Smishing scam impersonating Amazon logistics to capture credit card and banking details via a micro-transaction lure (₹39).',
    red_flags: [
      {
        id: 'rf-del-1',
        title: 'Brand Impersonation (Amazon)',
        severity: 'HIGH',
        explanation: 'Falsely claims to be Amazon customer delivery operations.',
        tag: 'Identity Spoofing'
      },
      {
        id: 'rf-del-2',
        title: 'Micro-Fee Payment Trap',
        severity: 'HIGH',
        explanation: 'Demands small ₹39 fee to entice user into entering payment card details on a credential harvester.',
        tag: 'Financial Trap'
      },
      {
        id: 'rf-del-3',
        title: 'Suspicious TLD & Insecure Protocol',
        severity: 'CRITICAL',
        explanation: 'Uses unencrypted HTTP with high-risk .top extension (amazon-delivery-status.top).',
        tag: 'Phishing Link'
      }
    ],
    evidence: [
      'Unsolicited package delivery failure alert',
      'Unencrypted HTTP protocol used',
      'High-risk .top top-level domain spoofing Amazon'
    ],
    recommendations: [
      'Do not click the link or attempt the ₹39 payment.',
      'Check your actual orders directly within the official Amazon app.',
      'Block the sender number.',
      'Report the malicious link to stop-spoofing@amazon.com.'
    ],
    agents: {
      scamAnalyst: {
        urgencyDetected: true,
        manipulationTactics: ['Loss Aversion', 'Delivery Disruption'],
        sentiment: 'Urgent Alert',
        summary: 'Uses common parcel delivery context to create an urgent need for action.'
      },
      urlInvestigator: {
        hasUrl: true,
        domain: 'amazon-delivery-status.top',
        isHttps: false,
        domainMismatch: true,
        suspiciousTld: true,
        summary: 'Clear fake domain using .top extension and unencrypted HTTP connection.'
      },
      contextAnalyst: {
        impersonationTarget: 'AMAZON',
        financialCoercion: true,
        credentialHarvesting: true,
        summary: 'Targeted smishing campaign targeting consumer shopping expectations.'
      },
      riskAnalyst: {
        baseScore: 82,
        ruleSignals: [
          { rule: 'Brand Impersonation', points: 20 },
          { rule: 'Payment Request', points: 15 },
          { rule: 'Suspicious Domain / TLD', points: 25 },
          { rule: 'Unencrypted HTTP', points: 15 },
          { rule: 'Compound Risk', points: 9 }
        ],
        totalCalculated: 84
      },
      responseAgent: {
        plainLanguageSummary: 'Fake Amazon parcel notice trying to trick you into entering card details under the guise of a ₹39 redelivery charge.',
        actionAdvice: 'Verify your shipments inside your real Amazon app instead.'
      }
    },
    timelineMs: 385,
    engineUsed: 'Gemini 3.8 Flash (AI Panel)'
  },
  {
    id: 'seed-04',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    inputType: 'text',
    inputData: 'Your friend Rahul is stuck in hospital and needs money urgently. Please send ₹5,000 to this UPI ID: rahul.aid@upi immediately.',
    risk_score: 68,
    risk_level: 'SUSPICIOUS',
    category: 'Bank/UPI Fraud',
    confidence: 85,
    summary: 'Potential social engineering impersonation scam. Uses an alleged medical emergency to bypass cognitive scrutiny.',
    red_flags: [
      {
        id: 'rf-soc-1',
        title: 'Emergency Social Engineering',
        severity: 'HIGH',
        explanation: 'Invokes hospital and medical crisis to bypass rational verification.',
        tag: 'Social Engineering'
      },
      {
        id: 'rf-soc-2',
        title: 'Unverified Personal UPI Request',
        severity: 'MEDIUM',
        explanation: 'Requests immediate direct fund transfer without verifiable audio/video identity.',
        tag: 'Financial'
      }
    ],
    evidence: [
      'Emotional emergency manipulation',
      'Direct pressure for immediate money transfer',
      'Unverified communication channel'
    ],
    recommendations: [
      'Call your friend directly on their known phone number before transferring any funds.',
      'Do not rely solely on text or messaging platform identity.',
      'Confirm with family members or common acquaintances.'
    ],
    agents: {
      scamAnalyst: {
        urgencyDetected: true,
        manipulationTactics: ['Emergency Pressure', 'Emotional Coercion'],
        sentiment: 'High Urgency / Panic',
        summary: 'Message mimics genuine friend in distress to provoke instant sympathetic action.'
      },
      urlInvestigator: {
        hasUrl: false,
        domain: 'None',
        isHttps: false,
        domainMismatch: false,
        suspiciousTld: false,
        summary: 'No links attached.'
      },
      contextAnalyst: {
        impersonationTarget: 'PERSONAL ACQUAINTANCE',
        financialCoercion: true,
        credentialHarvesting: false,
        summary: 'Friend-in-distress fraud pattern frequently seen on hacked social media or WhatsApp accounts.'
      },
      riskAnalyst: {
        baseScore: 65,
        ruleSignals: [
          { rule: 'Emotional Coercion', points: 25 },
          { rule: 'Immediate Payment Request', points: 20 },
          { rule: 'Unverified Identity', points: 23 }
        ],
        totalCalculated: 68
      },
      responseAgent: {
        plainLanguageSummary: 'Always verify emergencies by voice calling your friend directly before sending funds.',
        actionAdvice: 'Call your friend on their real phone number to verify.'
      }
    },
    timelineMs: 295,
    engineUsed: 'Gemini 3.8 Flash (AI Panel)'
  },
  {
    id: 'seed-05',
    timestamp: new Date(Date.now() - 1000 * 60 * 540).toISOString(),
    inputType: 'text',
    inputData: 'Hey, are we still meeting tomorrow at 5 PM for the design review? Let me know if you need to reschedule.',
    risk_score: 8,
    risk_level: 'SAFE',
    category: 'Legitimate / Safe',
    confidence: 99,
    summary: 'Standard conversational communication. No phishing, credential harvesting, urgent financial coercion, or suspicious links detected.',
    red_flags: [],
    evidence: [
      'Natural, non-coercive conversational tone',
      'No requests for credentials, money, or sensitive info',
      'No suspicious URLs or attachments'
    ],
    recommendations: [
      'Content exhibits no scam indicators.',
      'Safe to respond according to your schedule.'
    ],
    agents: {
      scamAnalyst: {
        urgencyDetected: false,
        manipulationTactics: [],
        sentiment: 'Friendly / Normal',
        summary: 'Benign interpersonal communication.'
      },
      urlInvestigator: {
        hasUrl: false,
        domain: 'None',
        isHttps: false,
        domainMismatch: false,
        suspiciousTld: false,
        summary: 'No links provided.'
      },
      contextAnalyst: {
        impersonationTarget: null,
        financialCoercion: false,
        credentialHarvesting: false,
        summary: 'Meeting scheduling context with mutual respect for time.'
      },
      riskAnalyst: {
        baseScore: 0,
        ruleSignals: [
          { rule: 'Benign Conversational Marker', points: -10 }
        ],
        totalCalculated: 8
      },
      responseAgent: {
        plainLanguageSummary: 'This message is completely safe. It contains no threat markers or fraud indicators.',
        actionAdvice: 'Safe to reply.'
      }
    },
    timelineMs: 240,
    engineUsed: 'Gemini 3.8 Flash (AI Panel)'
  }
];

function ensureDataFile(): InvestigationResult[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_INVESTIGATIONS, null, 2), 'utf-8');
      return SEED_INVESTIGATIONS;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_INVESTIGATIONS, null, 2), 'utf-8');
      return SEED_INVESTIGATIONS;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading storage file, resetting to seed data:', err);
    return SEED_INVESTIGATIONS;
  }
}

function saveDataFile(records: InvestigationResult[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving investigations data:', err);
  }
}

export function getAllInvestigations(): InvestigationResult[] {
  const records = ensureDataFile();
  // Sort descending by timestamp
  return records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getInvestigationById(id: string): InvestigationResult | null {
  const records = ensureDataFile();
  return records.find(r => r.id === id) || null;
}

export function saveInvestigation(result: InvestigationResult): InvestigationResult {
  const records = ensureDataFile();
  // Insert at front
  records.unshift(result);
  saveDataFile(records);
  return result;
}

export function deleteInvestigation(id: string): boolean {
  const records = ensureDataFile();
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records.splice(index, 1);
    saveDataFile(records);
    return true;
  }
  return false;
}

export function resetToSeedData(): InvestigationResult[] {
  saveDataFile(SEED_INVESTIGATIONS);
  return SEED_INVESTIGATIONS;
}

export function computeStats(): InvestigationStats {
  const records = ensureDataFile();
  const total = records.length;
  const threats = records.filter(r => r.risk_score >= 70).length;
  const phishing = records.filter(r => r.category === 'Phishing' || r.category === 'KYC Scam').length;
  const avg = total > 0 ? Math.round(records.reduce((acc, r) => acc + r.risk_score, 0) / total) : 0;

  // Category counts
  const catMap: Record<string, number> = {};
  for (const r of records) {
    catMap[r.category] = (catMap[r.category] || 0) + 1;
  }
  const categories_distribution = Object.entries(catMap).map(([category, count]) => ({
    category,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));

  // Risk levels distribution
  const levelCounts: Record<string, number> = {
    CRITICAL: 0,
    HIGH: 0,
    SUSPICIOUS: 0,
    LOW: 0,
    SAFE: 0,
  };
  for (const r of records) {
    if (levelCounts[r.risk_level] !== undefined) {
      levelCounts[r.risk_level]++;
    }
  }

  const risk_distribution = [
    { level: 'CRITICAL', count: levelCounts.CRITICAL, color: '#ef4444' },
    { level: 'HIGH', count: levelCounts.HIGH, color: '#f97316' },
    { level: 'SUSPICIOUS', count: levelCounts.SUSPICIOUS, color: '#eab308' },
    { level: 'LOW', count: levelCounts.LOW, color: '#06b6d4' },
    { level: 'SAFE', count: levelCounts.SAFE, color: '#10b981' },
  ];

  return {
    total_analyzed: total,
    threats_blocked: threats,
    phishing_attempts: phishing,
    avg_risk_score: avg,
    categories_distribution,
    risk_distribution,
  };
}
