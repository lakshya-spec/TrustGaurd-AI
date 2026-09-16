export interface UrlAnalysisResult {
  url: string;
  protocol: string;
  hostname: string;
  domain: string;
  tld: string;
  isHttps: boolean;
  isIpAddress: boolean;
  subdomainCount: number;
  suspiciousKeywordsFound: string[];
  isPunycode: boolean;
  threatAssessment: string;
  riskPoints: number;
  recommendation: string;
}

export function analyzeUrlStructure(rawUrl: string): UrlAnalysisResult {
  let formatted = rawUrl.trim();
  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = 'https://' + formatted;
  }

  let parsed: URL;
  try {
    parsed = new URL(formatted);
  } catch {
    return {
      url: rawUrl,
      protocol: 'invalid',
      hostname: 'invalid',
      domain: 'invalid',
      tld: 'unknown',
      isHttps: false,
      isIpAddress: false,
      subdomainCount: 0,
      suspiciousKeywordsFound: ['malformed_url'],
      isPunycode: false,
      threatAssessment: 'Invalid or malformed URL structure.',
      riskPoints: 30,
      recommendation: 'Do not attempt to open malformed web addresses.'
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const protocol = parsed.protocol.replace(':', '');
  const isHttps = protocol === 'https';
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

  const parts = hostname.split('.');
  const tld = parts.length > 1 ? parts[parts.length - 1] : '';
  const domain = parts.length >= 2 ? parts.slice(-2).join('.') : hostname;
  const subdomainCount = Math.max(0, parts.length - 2);
  const isPunycode = hostname.includes('xn--');

  const suspiciousTlds = ['xyz', 'top', 'work', 'cf', 'gq', 'ml', 'ga', 'tk', 'buzz', 'rest', 'live', 'fit', 'icu', 'click', 'link', 'club', 'online', 'site'];
  const isSuspiciousTld = suspiciousTlds.includes(tld);

  const phishingTokens = ['login', 'verify', 'update', 'secure', 'bank', 'kyc', 'signin', 'portal', 'auth', 'account', 'sbi', 'hdfc', 'icici', 'axis', 'paypal', 'support', 'claim', 'gift', 'free', 'win', 'prize', 'pay', 'confirm'];
  const fullPath = (hostname + parsed.pathname).toLowerCase();
  const foundKeywords = phishingTokens.filter(tok => fullPath.includes(tok));

  let riskPoints = 0;
  if (!isHttps) riskPoints += 15;
  if (isIpAddress) riskPoints += 30;
  if (isSuspiciousTld) riskPoints += 20;
  if (foundKeywords.length > 0) riskPoints += Math.min(foundKeywords.length * 10, 30);
  if (subdomainCount >= 3) riskPoints += 15;
  if (isPunycode) riskPoints += 25;

  let assessment = 'URL appears syntactically standard.';
  if (riskPoints >= 45) {
    assessment = `High risk phishing indicators detected: ${foundKeywords.length > 0 ? 'Phishing keywords in domain/path (' + foundKeywords.join(', ') + '); ' : ''}${isIpAddress ? 'Uses raw IP host; ' : ''}${!isHttps ? 'Unencrypted HTTP; ' : ''}${isSuspiciousTld ? 'Known high-abuse TLD (.' + tld + '); ' : ''}`;
  } else if (riskPoints >= 20) {
    assessment = `Suspicious domain patterns detected. Exercise caution before submitting sensitive data.`;
  }

  return {
    url: formatted,
    protocol,
    hostname,
    domain,
    tld,
    isHttps,
    isIpAddress,
    subdomainCount,
    suspiciousKeywordsFound: foundKeywords,
    isPunycode,
    threatAssessment: assessment,
    riskPoints: Math.min(riskPoints, 100),
    recommendation: riskPoints >= 40
      ? 'Do NOT visit this link or input credentials, passwords, or personal details.'
      : 'Verify destination authenticity by checking the official domain certificate.'
  };
}
