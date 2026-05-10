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


# =========================
# TEXT ANALYSIS EXPORT
# =========================

@router.post("/text/pdf")
async def export_text_pdf(data: dict):

    filepath = export_pdf(
        data,
        "text_analysis_report.pdf"
    )

    return FileResponse(
        path=filepath,
        filename="text_analysis_report.pdf",
        media_type="application/pdf"
    )


@router.post("/text/json")
async def export_text_json(data: dict):

    filepath = export_json(
        data,
        "text_analysis_report.json"
    )

    return FileResponse(
        path=filepath,
        filename="text_analysis_report.json",
        media_type="application/json"
    )


# =========================
# REPORT OCR EXPORT
# =========================

@router.post("/report/pdf")
async def export_report_pdf(data: dict):

    filepath = export_pdf(
        data,
        "ocr_report.pdf"
    )

    return FileResponse(
        path=filepath,
        filename="ocr_report.pdf",
        media_type="application/pdf"
    )


@router.post("/report/json")
async def export_report_json(data: dict):

    filepath = export_json(
        data,
        "ocr_report.json"
    )

    return FileResponse(
        path=filepath,
        filename="ocr_report.json",
        media_type="application/json"
    )


# =========================
# VITALS EXPORT
# =========================

@router.post("/vitals/pdf")
async def export_vitals_pdf(data: dict):

    filepath = export_pdf(
        data,
        "vitals_report.pdf"
    )

    return FileResponse(
        path=filepath,
        filename="vitals_report.pdf",
        media_type="application/pdf"
    )


@router.post("/vitals/json")
async def export_vitals_json(data: dict):

    filepath = export_json(
        data,
        "vitals_report.json"
    )

    return FileResponse(
        path=filepath,
        filename="vitals_report.json",
        media_type="application/json"
    )