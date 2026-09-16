import re

def calculate_rules(content: str, content_type: str = "text"):
    text = content.lower()
    score = 0
    red_flags = []
    evidence = []

    # Indicators mapping
    if any(k in text for k in ["urgent", "immediately", "blocked today", "suspended", "limited time", "act fast"]):
        score += 15
        red_flags.append({
            "title": "Urgency manipulation",
            "severity": "HIGH",
            "explanation": "Creates artificial panic to force hasty decisions without verification.",
            "tag": "Psychological"
        })
        evidence.append("Urgency manipulation phrasing detected")

    if any(k in text for k in ["otp", "password", "pin", "cvv", "login credentials", "verify code"]):
        score += 25
        red_flags.append({
            "title": "Credential harvesting request",
            "severity": "CRITICAL",
            "explanation": "Requests confidential access codes, PIN, or OTP. Legitimate entities never ask for this.",
            "tag": "Data Theft"
        })
        evidence.append("Demands confidential verification tokens or password")

    if any(k in text for k in ["pay", "transfer", "upi", "processing fee", "send money", "refundable fee"]):
        score += 20
        red_flags.append({
            "title": "Unsolicited payment demand",
            "severity": "HIGH",
            "explanation": "Demands upfront payment or transfer before granting access or prize delivery.",
            "tag": "Financial"
        })
        evidence.append("Requests monetary transfer or advance fees")

    if any(k in text for k in ["sbi", "hdfc", "icici", "axis", "reserve bank", "rbi", "amazon", "income tax"]):
        score += 20
        red_flags.append({
            "title": "Brand or authority impersonation",
            "severity": "HIGH",
            "explanation": "Claims provenance from a recognized institution to exploit user trust.",
            "tag": "Identity Spoofing"
        })
        evidence.append("Impersonates major banking or corporate entity")

    if any(k in text for k in ["account blocked", "arrest warrant", "legal action", "police case", "penalties"]):
        score += 15
        red_flags.append({
            "title": "Coercive threat language",
            "severity": "HIGH",
            "explanation": "Uses intimidation, legal threats, or disruption threats to coerce compliance.",
            "tag": "Intimidation"
        })
        evidence.append("Contains threats of account freeze or legal penalties")

    if any(k in text for k in ["lottery", "winner", "won", "lucky draw", "congratulations", "cash prize"]):
        score += 15
        red_flags.append({
            "title": "Lottery / Prize bait",
            "severity": "HIGH",
            "explanation": "Promises unearned high-value prize requiring fee or credential disclosure.",
            "tag": "Social Engineering"
        })
        evidence.append("Offers unearned lottery winnings or cash prize")

    # URL inspection
    urls = re.findall(r'https?://[^\s]+', content)
    if urls or content_type == "url":
        url_target = content if content_type == "url" else urls[0]
        if any(ext in url_target.lower() for ext in [".xyz", ".top", ".work", ".cf", ".tk", "http://", "login", "verify", "kyc"]):
            score += 25
            red_flags.append({
                "title": "Deceptive or suspicious link",
                "severity": "CRITICAL",
                "explanation": "Link points to an unverified domain mimicking legitimate institutional portals.",
                "tag": "Phishing Link"
            })
            evidence.append("Contains high-risk link or unencrypted/spoofed domain")

    final_score = min(max(score, 0), 100)
    return final_score, red_flags, evidence

def get_risk_level(score: int) -> str:
    if score <= 25:
        return "SAFE"
    elif score <= 50:
        return "LOW RISK"
    elif score <= 75:
        return "SUSPICIOUS"
    elif score <= 90:
        return "HIGH RISK"
    else:
        return "CRITICAL"
