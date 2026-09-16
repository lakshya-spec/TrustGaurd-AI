from sqlalchemy import Column, String, Integer, DateTime, JSON
from datetime import datetime
from database import Base

class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(String, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    content_type = Column(String, default="text")
    input_data = Column(String)
    risk_score = Column(Integer)
    risk_level = Column(String)
    category = Column(String)
    confidence = Column(Integer, default=90)
    summary = Column(String)
    details = Column(JSON)
