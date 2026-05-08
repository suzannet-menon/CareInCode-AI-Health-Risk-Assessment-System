from pydantic import BaseModel, Field


class VitalsInput(BaseModel):

    heart_rate: float = Field(..., ge=20, le=250)

    spo2: float = Field(..., ge=50, le=100)

    temperature: float = Field(..., ge=30, le=45)

    systolic_bp: float = Field(..., ge=50, le=250)

    diastolic_bp: float = Field(..., ge=30, le=200)

    weight: float = Field(..., ge=1, le=500)

    steps: int = Field(..., ge=0, le=100000)

    sleep_hours: float = Field(..., ge=0, le=24)