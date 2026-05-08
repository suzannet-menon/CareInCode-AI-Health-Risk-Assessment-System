from fastapi import APIRouter

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

    return {
        "file": filepath
    }


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

    return {
        "file": filepath
    }