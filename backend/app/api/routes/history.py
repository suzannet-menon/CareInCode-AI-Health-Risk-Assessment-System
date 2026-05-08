from fastapi import APIRouter

from app.services.health_record_service import (
    get_user_records
)


router = APIRouter(

    prefix="/history",

    tags=["History"]
)


@router.get("/{user_id}")
async def get_history(
    user_id: str
):

    records = get_user_records(
        user_id
    )

    return {

        "records":
        records
    }