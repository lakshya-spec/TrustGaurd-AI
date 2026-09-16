from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

class MessageRequest(BaseModel):
    content: str

class UrlRequest(BaseModel):
    url: str

class RedFlagSchema(BaseModel):
    title: str
    severity: str
    explanation: str
    tag: Optional[str] = None

class InvestigationResult(BaseModel):
    risk_score: int
    risk_level: str
    category: str
    confidence: int
    summary: str
    red_flags: List[RedFlagSchema]
    evidence: List[str]
    recommendations: List[str]
    details: Optional[Any] = None

class InvestigationResponse(InvestigationResult):
    id: str
    created_at: datetime
    content_type: str
    input_data: str

    class Config:
        orm_mode = True

class StatsResponse(BaseModel):
    total_analyzed: int
    threats_blocked: int
    avg_risk_score: int
