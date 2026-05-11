from fastapi import APIRouter

from app.orchestrator.health_orchestrator import (
    analyze_health_text
)

from app.services.analysis_storage_service import (
    save_text_analysis
)

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)


@router.post("/text")
def analyze_text(payload: dict):

    user_input = payload.get("text", "")

    result = analyze_health_text(user_input)

    # SAVE ANALYSIS FOR EXPORT
    save_text_analysis({
        "analysis": result
    })

    return result