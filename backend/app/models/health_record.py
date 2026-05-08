from pydantic import BaseModel

from typing import Dict
from typing import Any

from datetime import datetime


class HealthRecord(BaseModel):

    user_id: str

    metrics: Dict[str, Any]

    created_at: datetime = datetime.utcnow()