from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.export.export_service import (
    export_json,
    export_pdf
)

router = APIRouter(
    prefix="/export",
    tags=["Export"]
)


@router.post("/json")
async def export_as_json():

    sample_data = {

        "analysis": {

            "summary":
            "Sample export",

            "risk_indicators": [],

            "doctor_prep": {

                "summary": "",

                "questions": []
            },

            "disclaimer":
            "Educational only"
        },

        "trend_analysis": {}
    }

    filepath = export_json(
        sample_data,
        "health_report.json"
    )

    return FileResponse(
        path=filepath,
        filename="health_report.json",
        media_type="application/json"
    )


@router.post("/pdf")
async def export_as_pdf():

    sample_data = {

        "analysis": {

            "summary":
            "Sample export",

            "risk_indicators": [],

            "doctor_prep": {

                "summary": "",

                "questions": []
            },

            "disclaimer":
            "Educational only"
        },

        "trend_analysis": {}
    }

    filepath = export_pdf(
        sample_data,
        "health_report.pdf"
    )

    return FileResponse(
        path=filepath,
        filename="health_report.pdf",
        media_type="application/pdf"
    )