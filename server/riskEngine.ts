import { RedFlag, RiskLevel, ScamCategory, AgentFindings } from '../src/types.js';

export interface ScoredSignal {
  rule: string;
  points: number;
  flag?: RedFlag;
  evidence?: string;
}

export function evaluateContentRules(content: string, inputType: 'text' | 'url' | 'screenshot'): {
  ruleScore: number;
  signals: ScoredSignal[];
  redFlags: RedFlag[];
  evidenceList: string[];
  suggestedCategory: ScamCategory;
  agents: AgentFindings;
} {
  const text = content.toLowerCase();
  const signals: ScoredSignal[] = [];
  const redFlags: RedFlag[] = [];
  const evidenceList: string[] = [];

  // Urgency detection (+15)
  const urgencyKeywords = ['urgent', 'immediately', 'within 24 hours', 'blocked today', 'suspended', 'limited time', 'act fast', 'action required', 'expires today', 'last warning', 'final notice'];
  const matchedUrgency = urgencyKeywords.filter(k => text.includes(k));
  const hasUrgency = matchedUrgency.length > 0;
  if (hasUrgency) {
    signals.push({
      rule: 'Urgency Language Manipulation',
      points: 15,
      flag: {
        id: 'rf-urgency',
        title: 'Urgency Manipulation',
        severity: 'HIGH',
        explanation: `Uses psychological pressure words (${matchedUrgency.slice(0, 3).join(', ')}) to force hasty decisions without verification.`,
        tag: 'Psychological'
      },
      evidence: 'Detected artificial urgency phrasing designed to induce panic'
    });
  }

  // Credential request (+25)
  const credentialKeywords = ['otp', 'password', 'pin', 'cvv', 'card number', 'secret code', 'passcode', 'login credentials', 'mpin', 'net banking password', 'verify login'];
  const matchedCreds = credentialKeywords.filter(k => text.includes(k));
  const hasCreds = matchedCreds.length > 0;
  if (hasCreds) {
    signals.push({
      rule: 'Credential Harvesting Attempt',
      points: 25,
      flag: {
        id: 'rf-creds',
        title: 'Credential Harvesting Request',
        severity: 'CRITICAL',
        explanation: `Demands confidential security tokens or credentials (${matchedCreds.slice(0, 3).join(', ')}). Legitimate organizations never request your OTP or PIN.`,
        tag: 'Data Theft'
      },
      evidence: 'Requests user password, PIN, or one-time verification code'
    });
  }

  // Payment / Money transfer request (+20)
  const paymentKeywords = ['pay', 'transfer', 'upi', 'gpay', 'phonepe', 'processing fee', 'send money', 'refundable fee', 'registration charge', 'wire transfer', 'crypto', 'gift card', 'deposit'];
  const matchedPayment = paymentKeywords.filter(k => text.includes(k));
  const hasPayment = matchedPayment.length > 0;
  if (hasPayment) {
    signals.push({
      rule: 'Unsolicited Financial Demands',
      points: 20,
      flag: {
        id: 'rf-payment',
        title: 'Unverified Payment Demand',
        severity: 'HIGH',
        explanation: `Requests upfront payment or money transfer (${matchedPayment.slice(0, 3).join(', ')}) under a pretext or processing fee.`,
        tag: 'Financial'
      },
      evidence: 'Demands financial transaction or advance processing fee'
    });
  }

  // Impersonation detection (+20)
  const impersonationKeywords = ['sbi', 'hdfc', 'icici', 'axis', 'reserve bank', 'rbi', 'income tax', 'amazon', 'flipkart', 'netflix', 'fedex', 'dhl', 'police', 'customs', 'courier', 'telecom', 'microsoft', 'google support', 'apple support'];
  const matchedImpersonation = impersonationKeywords.filter(k => text.includes(k));
  const hasImpersonation = matchedImpersonation.length > 0;
  if (hasImpersonation) {
    signals.push({
      rule: 'Brand / Authority Impersonation',
      points: 20,
      flag: {
        id: 'rf-impersonation',
        title: 'Brand / Authority Impersonation',
        severity: 'HIGH',
        explanation: `Claims affiliation with recognized brand or institution (${matchedImpersonation.slice(0, 2).map(s => s.toUpperCase()).join(', ')}).`,
        tag: 'Identity Spoofing'
      },
      evidence: `Cites recognized institution (${matchedImpersonation[0].toUpperCase()}) without legitimate provenance`
    });
  }

  // Threatening language (+15)
  const threatKeywords = ['account blocked', 'deactivated', 'arrest warrant', 'legal action', 'police case', 'penalties', 'frozen', 'service terminated', 'sim blocked', 'electricity will be cut'];
  const matchedThreat = threatKeywords.filter(k => text.includes(k));
  const hasThreat = matchedThreat.length > 0;
  if (hasThreat) {
    signals.push({
      rule: 'Threatening or Coercive Language',
      points: 15,
      flag: {
        id: 'rf-threat',
        title: 'Coercive Threat Tone',
        severity: 'HIGH',
        explanation: `Threatens penalties, account suspension, or disruption (${matchedThreat.slice(0, 2).join(', ')}) to intimidate the recipient.`,
        tag: 'Intimidation'
      },
      evidence: 'Uses punitive threats (suspension, penalties, or legal action)'
    });
  }

  // Prize / Reward / Lottery (+15)
  const prizeKeywords = ['lottery', 'winner', 'won', 'lucky draw', 'congratulations', 'cash prize', 'crore', 'lakh', 'reward points', 'free gift', 'claim now'];
  const matchedPrize = prizeKeywords.filter(k => text.includes(k));
  const hasPrize = matchedPrize.length > 0;
  if (hasPrize) {
    signals.push({
      rule: 'Unsolicited Prize / Reward Bait',
      points: 15,
      flag: {
        id: 'rf-prize',
        title: 'Lottery / Prize Bait',
        severity: 'HIGH',
        explanation: 'Promises high rewards, unprompted lottery winnings, or lucrative windfalls requiring upfront fees or data entry.',
        tag: 'Social Engineering'
      },
      evidence: 'Offers unprompted high-value prize or lucky draw reward'
    });
  }

  // KYC specific indicators
  const kycKeywords = ['kyc', 'pan link', 'aadhaar verification', 'update kyc', 'complete kyc', 'document expired'];
  const hasKyc = kycKeywords.some(k => text.includes(k));
  if (hasKyc) {
    signals.push({
      rule: 'KYC Verification Pretext',
      points: 15,
      flag: {
        id: 'rf-kyc',
        title: 'Urgent KYC Verification Pretext',
        severity: 'HIGH',
        explanation: 'Uses KYC / PAN / Aadhaar compliance as a fraudulent pretext to extract confidential identity documents.',
        tag: 'KYC Fraud'
      },
      evidence: 'Exploits regulatory KYC compliance as an urgency trigger'
    });
  }

  // Job Scam indicators
  const jobKeywords = ['part-time job', 'earn from home', 'work from home', 'daily salary', 'telegram task', 'like youtube videos', 'investment return', 'guaranteed profit'];
  const hasJob = jobKeywords.some(k => text.includes(k));
  if (hasJob) {
    signals.push({
      rule: 'High-Yield Task / Job Fraud Pattern',
      points: 15,
      flag: {
        id: 'rf-job',
        title: 'Unrealistic Work-from-Home Bait',
        severity: 'MEDIUM',
        explanation: 'Advertises effortless high earnings for simple tasks (video liking, rating), transitioning into deposit demands.',
        tag: 'Job Scam'
      },
      evidence: 'Contains classic task-based scam patterns with unrealistic return promises'
    });
  }

  // URL extraction and risk (+25)
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const matchedUrls = content.match(urlRegex) || [];
  let hasSuspiciousUrl = false;
  let urlDetails = '';

  if (inputType === 'url' || matchedUrls.length > 0) {
    const urlStr = inputType === 'url' ? content : (matchedUrls[0] || '');
    const isIpAddress = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(urlStr);
    const hasSuspiciousTld = /\.(xyz|top|work|cf|gq|ml|ga|tk|buzz|rest|live|fit|icu)(\/|$)/i.test(urlStr);
    const hasPhishingKeywords = /(login|verify|secure|update|bank|kyc|signin|portal|auth|account|sbi|hdfc|icici|service)/i.test(urlStr);
    const isHttp = urlStr.toLowerCase().startsWith('http://');

    if (isIpAddress || hasSuspiciousTld || (hasPhishingKeywords && !urlStr.includes('google.com') && !urlStr.includes('apple.com')) || isHttp) {
      hasSuspiciousUrl = true;
      urlDetails = isIpAddress ? 'Direct IP address URL' : hasSuspiciousTld ? 'High-risk TLD' : isHttp ? 'Unencrypted HTTP protocol' : 'Deceptive domain structure';
      signals.push({
        rule: 'Suspicious Domain / Link Detected',
        points: 25,
        flag: {
          id: 'rf-url',
          title: 'Deceptive or High-Risk Link',
          severity: 'CRITICAL',
          explanation: `Link exhibits high-risk indicators (${urlDetails}). Likely designed to mimic official portals to harvest credentials.`,
          tag: 'Phishing Link'
        },
        evidence: `URL contains suspicious attributes: ${urlDetails}`
      });
    }
  }

  // Multiple suspicious indicators (+10)
  if (signals.length >= 3) {
    signals.push({
      rule: 'Compound Multi-Vector Attack',
      points: 10,
      evidence: 'Multiple concurrent fraud indicators detected across urgency, credentials, and domain'
    });
  }

  // Safe checks: If content is clearly benign greeting or inquiry
  const benignKeywords = ['meeting tomorrow', 'lunch together', 'see you at', 'happy birthday', 'how are you', 'weather is nice', 'project update', 'thanks for your help', 'homework', 'notes for class'];
  const hasBenign = benignKeywords.some(k => text.includes(k));
  if (hasBenign && signals.length === 0) {
    signals.push({
      rule: 'Benign Conversational Marker',
      points: -20
    });
  }

  // Aggregate signals
  for (const s of signals) {
    if (s.flag) redFlags.push(s.flag);
    if (s.evidence) evidenceList.push(s.evidence);
  }

  const rawScore = signals.reduce((acc, curr) => acc + curr.points, 0);
  const normalizedScore = Math.max(0, Math.min(rawScore, 100));

  // Determine Category
  let category: ScamCategory = 'Unknown/Suspicious';
  if (normalizedScore <= 25) {
    category = 'Legitimate / Safe';
  } else if (hasKyc) {
    category = 'KYC Scam';
  } else if (hasPrize) {
    category = 'Lottery/Prize Scam';
  } else if (hasJob) {
    category = 'Job Scam';
  } else if (text.includes('package') || text.includes('courier') || text.includes('delivery') || text.includes('reschedule')) {
    category = 'Delivery Scam';
  } else if (hasImpersonation && (hasCreds || hasUrgency)) {
    category = 'Phishing';
  } else if (hasPayment || text.includes('upi') || text.includes('refund')) {
    category = 'Bank/UPI Fraud';
  } else if (hasSuspiciousUrl) {
    category = 'Phishing';
  }

  // Structured multi-agent findings
  const agents: AgentFindings = {
    scamAnalyst: {
      urgencyDetected: hasUrgency,
      manipulationTactics: hasUrgency ? ['Time Pressure', 'Panic Inducement'] : ['None identified'],
      sentiment: hasThreat ? 'Threatening / Coercive' : hasUrgency ? 'High Urgency' : 'Neutral',
      summary: hasUrgency ? 'Linguistic analysis detected overt urgency and emotional manipulation tactics.' : 'Tone appears normal with no obvious psychological coercion.'
    },
    urlInvestigator: {
      hasUrl: matchedUrls.length > 0 || inputType === 'url',
      domain: matchedUrls[0] || (inputType === 'url' ? content : 'None detected'),
      isHttps: matchedUrls[0]?.startsWith('https://') || (inputType === 'url' && content.startsWith('https://')),
      domainMismatch: hasSuspiciousUrl,
      suspiciousTld: hasSuspiciousUrl,
      summary: hasSuspiciousUrl ? 'URL points to an unofficial or spoofed domain designed to deceive users.' : 'No hostile domain indicators found.'
    },
    contextAnalyst: {
      impersonationTarget: matchedImpersonation.length > 0 ? matchedImpersonation[0].toUpperCase() : null,
      financialCoercion: hasPayment || hasCreds,
      credentialHarvesting: hasCreds,
      summary: hasImpersonation ? `Sender impersonates ${matchedImpersonation[0].toUpperCase()} to leverage brand trust for unauthorized data acquisition.` : 'No specific corporate brand identity claimed.'
    },
    riskAnalyst: {
      baseScore: rawScore,
      ruleSignals: signals.map(s => ({ rule: s.rule, points: s.points })),
      totalCalculated: normalizedScore
    },
    responseAgent: {
      plainLanguageSummary: normalizedScore >= 75
        ? 'This message is a fraudulent attempt to compromise your accounts or steal funds. Do not respond or click any attached links.'
        : normalizedScore >= 50
        ? 'This content displays questionable indicators. Exercise caution and verify directly through official channels.'
        : 'This communication appears benign, with no typical scam patterns identified.',
      actionAdvice: normalizedScore >= 75
        ? 'Block the sender, avoid sharing verification codes, and report this communication immediately.'
        : 'Verify through official customer support if you suspect any irregularities.'
    }
  };

  return {
    ruleScore: normalizedScore,
    signals,
    redFlags,
    evidenceList,
    suggestedCategory: category,
    agents
  };
}

export function getRiskLevel(score: number): RiskLevel {
  if (score <= 25) return 'SAFE';
  if (score <= 50) return 'LOW';
  if (score <= 75) return 'SUSPICIOUS';
  if (score <= 90) return 'HIGH';
  return 'CRITICAL';
}

export function generateRecommendations(level: RiskLevel, category: ScamCategory): string[] {
  if (level === 'CRITICAL' || level === 'HIGH') {
    return [
      'Do not click any embedded links or download attachments from this sender.',
      'Never disclose your OTP, PIN, password, or UPI MPIN to anyone under any circumstance.',
      'Do not transfer money or pay "processing fees" to unlock accounts or claim deliveries.',
      'Block the sender on your messaging platform or phone dialer.',
      'Report the message to national cyber crime authorities (e.g., cybercrime.gov.in / 1930 in India).',
      'Contact the official customer support directly via their verified website or app.'
    ];
  } else if (level === 'SUSPICIOUS') {
    return [
      'Pause before responding — verify the identity of the sender through a known, independent phone number.',
      'Avoid sharing any personal identifiable information (PAN, Aadhaar, DOB, address).',
      'If this is about an alleged order or service issue, check your official account portal separately.',
      'Inspect the sending email address or phone number for subtle spelling alterations.'
    ];
  } else {
    return [
      'No critical threat markers detected. The content matches normal communication patterns.',
      'As a routine security hygiene practice, always verify sensitive financial requests directly.',
      'Keep your device security software and mobile operating system updated.'
    ];
  }
}
