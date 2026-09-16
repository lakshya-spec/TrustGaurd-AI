import { GoogleGenAI, Type } from '@google/genai';
import { InvestigationResult, RedFlag, ScamCategory, AgentFindings } from '../src/types.js';
import { evaluateContentRules, getRiskLevel, generateRecommendations } from './riskEngine.js';
import { analyzeUrlStructure } from './urlAnalyzer.js';

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

export async function analyzeContentWithAgents(
  content: string,
  inputType: 'text' | 'url' | 'screenshot',
  imageBase64?: string,
  imageMimeType: string = 'image/jpeg'
): Promise<InvestigationResult> {
  const startTime = Date.now();

  // 1. First run deterministic rule-based evaluation
  const ruleResult = evaluateContentRules(content, inputType);
  const urlInsight = inputType === 'url' || content.includes('http') ? analyzeUrlStructure(content) : null;

  const client = getGeminiClient();

  // If no Gemini client or API key, return rule-based result instantly with full multi-agent structure
  if (!client) {
    return buildInvestigationResult(
      content,
      inputType,
      ruleResult.ruleScore,
      ruleResult.suggestedCategory,
      88, // confidence
      `TrustGuard evaluated this ${inputType} via multi-agent heuristic inspection. Detected ${ruleResult.redFlags.length} significant fraud indicators.`,
      ruleResult.redFlags,
      ruleResult.evidenceList,
      ruleResult.agents,
      startTime,
      'Rule-Based Engine (Demo / Fallback)'
    );
  }

  // 2. We have Gemini API! Query Gemini 3.8 Flash with structured prompt
  try {
    const systemPrompt = `You are TrustGuard AI, an elite cybersecurity multi-agent investigative panel.
Your panel consists of:
1. Scam Analyst: analyzes linguistic pressure, psychological manipulation, panic tactics.
2. URL Investigator: inspects domain provenance, deceptive naming, and spoofing.
3. Context Analyst: identifies impersonation targets, financial coercion, and credential harvesting.
4. Risk Analyst: synthesizes threat indicators into a 0-100 risk score and level.
5. Response Agent: articulates plain-English evidence and protective actions.

Analyze the provided input thoroughly.
Classify category strictly as one of:
["Phishing", "Bank/UPI Fraud", "KYC Scam", "Job Scam", "Investment Scam", "Delivery Scam", "Lottery/Prize Scam", "Government Impersonation", "Social Media Impersonation", "Tech Support Scam", "Romance Scam", "Unknown/Suspicious", "Legitimate / Safe"].

Provide structured JSON output matching this schema:
{
  "ai_risk_score": number (0-100),
  "category": string,
  "confidence": number (0-100),
  "summary": string,
  "red_flags": [
    {
      "title": string,
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      "explanation": string,
      "tag": string
    }
  ],
  "evidence": [string],
  "recommendations": [string],
  "agent_insights": {
    "scamAnalyst": {
      "urgencyDetected": boolean,
      "manipulationTactics": [string],
      "sentiment": string,
      "summary": string
    },
    "urlInvestigator": {
      "hasUrl": boolean,
      "domain": string,
      "isHttps": boolean,
      "domainMismatch": boolean,
      "suspiciousTld": boolean,
      "summary": string
    },
    "contextAnalyst": {
      "impersonationTarget": string or null,
      "financialCoercion": boolean,
      "credentialHarvesting": boolean,
      "summary": string
    },
    "responseAgent": {
      "plainLanguageSummary": string,
      "actionAdvice": string
    }
  }
}`;

    let contentsPayload: any;

    if (inputType === 'screenshot' && imageBase64) {
      // Strip potential data URL prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
      contentsPayload = {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: imageMimeType,
            },
          },
          {
            text: `Analyze this screenshot of a message/app/email. Extract all visible text, analyze spoofing, fake logos, pressure tactics, and URLs.\nAdditional text context provided: ${content || 'None'}`,
          },
        ],
      };
    } else {
      contentsPayload = `Content Type: ${inputType}\nContent to investigate:\n"""\n${content}\n"""`;
    }

    const response = await (async () => {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          return await client.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: contentsPayload,
            config: {
              systemInstruction: systemPrompt,
              responseMimeType: 'application/json',
            },
          });
        } catch (err: any) {
          const status = err?.status ?? err?.code;

          console.error(`Gemini attempt ${attempt} failed. Status: ${status}`);

          // 429 = quota exhausted for the day; retrying immediately won't help,
          // so fail fast out of the retry loop and let the outer catch fall back.
          if (status === 429) {
            throw err;
          }

          if (status !== 503 || attempt === 3) {
            throw err;
          }

          const delay = attempt * 3000;
          console.log(`Retrying Gemini in ${delay / 1000}s...`);

          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      throw new Error('Gemini request failed after 3 attempts');
    })();

    const rawText = response.text || '{}';
    const aiData = JSON.parse(rawText);

    // Combine AI Score with Rule-Based Score as mandated:
    // "Combine: AI analysis + rule-based signals. The AI should not have complete control over the risk score."
    const aiScore = typeof aiData.ai_risk_score === 'number' ? aiData.ai_risk_score : ruleResult.ruleScore;
    const blendedScore = Math.round(aiScore * 0.6 + ruleResult.ruleScore * 0.4);
    const finalScore = Math.max(0, Math.min(blendedScore, 100));

    // Combine red flags (deduplicate)
    const combinedRedFlags: RedFlag[] = [...ruleResult.redFlags];
    if (Array.isArray(aiData.red_flags)) {
      for (const rf of aiData.red_flags) {
        if (!combinedRedFlags.some(existing => existing.title.toLowerCase() === rf.title?.toLowerCase())) {
          combinedRedFlags.push({
            id: 'ai-' + Math.random().toString(36).substring(2, 9),
            title: rf.title || 'Suspicious Pattern',
            severity: rf.severity || 'HIGH',
            explanation: rf.explanation || '',
            tag: rf.tag || 'AI Insight',
          });
        }
      }
    }

    // Combine evidence points
    const combinedEvidence: string[] = Array.from(
      new Set([...(aiData.evidence || []), ...ruleResult.evidenceList])
    );

    const mergedAgents: AgentFindings = {
      scamAnalyst: aiData.agent_insights?.scamAnalyst || ruleResult.agents.scamAnalyst,
      urlInvestigator: aiData.agent_insights?.urlInvestigator || ruleResult.agents.urlInvestigator,
      contextAnalyst: aiData.agent_insights?.contextAnalyst || ruleResult.agents.contextAnalyst,
      riskAnalyst: {
        baseScore: ruleResult.ruleScore,
        ruleSignals: ruleResult.signals.map(s => ({ rule: s.rule, points: s.points })),
        totalCalculated: finalScore,
      },
      responseAgent: aiData.agent_insights?.responseAgent || ruleResult.agents.responseAgent,
    };

    const category = (aiData.category as ScamCategory) || ruleResult.suggestedCategory;
    const summary = aiData.summary || ruleResult.agents.responseAgent.plainLanguageSummary;

    return buildInvestigationResult(
      content,
      inputType,
      finalScore,
      category,
      aiData.confidence || 92,
      summary,
      combinedRedFlags,
      combinedEvidence,
      mergedAgents,
      startTime,
      'Gemini 3.6 Flash (AI Panel)'
    );
  } catch (err: any) {
    console.error('================ GEMINI FINAL ERROR ================');
    console.error(err);
    console.error('====================================================');

    // Gemini failed (quota exceeded, 503, network error, etc).
    // Fall back to the rule-based engine instead of surfacing a raw error to the user.
    const status = err?.status ?? err?.code;
    const reason =
      status === 429
        ? 'AI panel quota exceeded for today'
        : 'AI panel temporarily unavailable';

    return buildInvestigationResult(
      content,
      inputType,
      ruleResult.ruleScore,
      ruleResult.suggestedCategory,
      75, // lower confidence since the AI panel didn't run
      `TrustGuard evaluated this ${inputType} via multi-agent heuristic inspection (${reason}). Detected ${ruleResult.redFlags.length} significant fraud indicators.`,
      ruleResult.redFlags,
      ruleResult.evidenceList,
      ruleResult.agents,
      startTime,
      'Rule-Based Engine (Demo / Fallback)'
    );
  }
}

function buildInvestigationResult(
  inputData: string,
  inputType: 'text' | 'url' | 'screenshot',
  score: number,
  category: ScamCategory,
  confidence: number,
  summary: string,
  redFlags: RedFlag[],
  evidence: string[],
  agents: AgentFindings,
  startTime: number,
  engineUsed: 'Gemini 3.6 Flash (AI Panel)' | 'Rule-Based Engine (Demo / Fallback)'
): InvestigationResult {
  const risk_level = getRiskLevel(score);
  const recommendations = generateRecommendations(risk_level, category);

  return {
    id: 'tg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    timestamp: new Date().toISOString(),
    inputType,
    inputData: inputData.length > 500 ? inputData.substring(0, 500) + '...' : inputData,
    risk_score: score,
    risk_level,
    category,
    confidence,
    summary,
    red_flags: redFlags,
    evidence,
    recommendations,
    agents,
    timelineMs: Math.max(Date.now() - startTime, 320),
    engineUsed,
  };
}