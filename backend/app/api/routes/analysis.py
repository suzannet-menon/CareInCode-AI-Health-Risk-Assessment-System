from fastapi import APIRouter

from app.orchestrator.health_orchestrator import analyze_health_text


router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)


@router.post("/text")
def analyze_text(payload: dict):

    user_input = payload.get("text", "")

    return analyze_health_text(user_input)