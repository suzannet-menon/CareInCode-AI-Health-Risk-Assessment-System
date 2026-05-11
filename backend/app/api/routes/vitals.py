from fastapi import APIRouter

from app.models.vitals_model import (
    VitalsInput
)

from app.orchestrator.vitals_orchestrator import (
    process_vitals
)

router = APIRouter(
    prefix="/analysis",
    tags=["Vitals Analysis"]
)


@router.post("/vitals")
async def analyze_vitals_route(
    data: VitalsInput
):

    return process_vitals(
        data.model_dump()
    )