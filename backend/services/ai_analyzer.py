import os
import json
from services.risk_engine import calculate_rules, get_risk_level

async def analyze_content(content: str, content_type: str = "text"):
    # 1. Deterministic Multi-Agent Rule Baseline
    rule_score, red_flags, evidence = calculate_rules(content, content_type)
    
    # Categorization heuristic
    content_lower = content.lower()
    if rule_score <= 25:
        category = "Legitimate / Safe"
        summary = "No typical scam markers or fraud patterns detected in this content."
        recommendations = ["Content appears normal. Exercise routine security hygiene."]
    elif "kyc" in content_lower:
        category = "KYC Scam"
        summary = "Message attempts unauthorized credential harvesting under the guise of an urgent KYC update."
        recommendations = [
            "Do not open links or submit documents.",
            "Never provide OTP, PIN, or password.",
            "Report the sender to the official institution."
        ]
    elif "lottery" in content_lower or "won" in content_lower:
        category = "Lottery/Prize Scam"
        summary = "Advance-fee fraud promising unearned lottery funds requiring an upfront processing payment."
        recommendations = [
            "Do not pay any processing fee.",
            "Never share bank details to receive unverified prizes."
        ]
    elif "package" in content_lower or "delivery" in content_lower:
        category = "Delivery Scam"
        summary = "Fake package notification enticing users to pay small fees on a card-harvesting site."
        recommendations = [
            "Check official delivery status within the courier app directly.",
            "Do not enter card details on unverified websites."
        ]
    else:
        category = "Phishing"
        summary = "This content contains multiple red flags typical of digital fraud and phishing."
        recommendations = [
            "Do not click any embedded links.",
            "Never disclose OTP or confidential credentials.",
            "Block and report the sender."
        ]

    return {
        "risk_score": rule_score,
        "risk_level": get_risk_level(rule_score),
        "category": category,
        "confidence": 92 if rule_score > 50 else 98,
        "summary": summary,
        "red_flags": red_flags,
        "evidence": evidence if evidence else ["Content adheres to standard conversational patterns"],
        "recommendations": recommendations,
        "details": {
            "engine": "Rule-Based Multi-Agent Fallback",
            "content_type": content_type
        }
    }
