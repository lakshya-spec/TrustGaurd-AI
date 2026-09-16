from urllib.parse import urlparse

def analyze_url(url_string: str):
    if not url_string.startswith("http://") and not url_string.startswith("https://"):
        url_string = "https://" + url_string
    parsed = urlparse(url_string)
    netloc = parsed.netloc.lower()
    is_https = parsed.scheme == "https"
    
    suspicious_tlds = [".xyz", ".top", ".work", ".cf", ".tk", ".ml", ".gq"]
    has_suspicious_tld = any(netloc.endswith(tld) for tld in suspicious_tlds)
    
    phishing_keywords = ["sbi", "bank", "login", "verify", "secure", "update", "account", "kyc"]
    found_keywords = [kw for kw in phishing_keywords if kw in url_string.lower()]

    is_risky = has_suspicious_tld or not is_https or (len(found_keywords) >= 2)
    return {
        "url": url_string,
        "is_https": is_https,
        "hostname": netloc,
        "has_suspicious_tld": has_suspicious_tld,
        "phishing_keywords": found_keywords,
        "is_risky": is_risky
    }
