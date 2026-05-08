from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from app.services.validation_service import validate_file

from app.services.upload_service import save_uploaded_file

from app.services.memory_service import (
    save_health_record,
    get_user_history
)

from app.services.health_record_service import (
    save_health_record_db
)

from app.ocr.easyocr_engine import (
    extract_text_from_image
)

from app.ocr.pdf_parser import (
    extract_text_from_pdf
)

from app.orchestrator.health_orchestrator import (
    analyze_health_text
)

from app.insight.engine import (
    analyze_health_data,
    extract_structured_metrics
)

from app.insight.doctor_prep import (
    generate_doctor_prep
)

from app.insight.trend_engine import (
    analyze_trends
)

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/report")
async def upload_report(
    file: UploadFile = File(...)
):

    # Safety check
    if not file.filename:

        return {
            "error": "Filename missing"
        }

    filename = file.filename.lower()

    # File validation
    if not validate_file(filename):

        return {
            "error": "Invalid file type"
        }

    # Save uploaded file
    file_path = save_uploaded_file(file)

    # OCR / text extraction
    if filename.endswith(".pdf"):

        extracted = extract_text_from_pdf(
            file_path
        )

    else:

        extracted = extract_text_from_image(
            file_path
        )

    # Structured metrics extraction
    metrics = extract_structured_metrics(
        extracted["text"]
    )

    # Temporary demo user ID
    user_id = "demo_user"

    # Save memory record
    save_health_record(
        user_id,
        metrics
    )

    # Fetch historical records
    history = get_user_history(
        user_id
    )

    # Trend analysis
    trend_analysis = analyze_trends(
        history
    )

    # Structured insight engine
    risk_indicators = analyze_health_data(
        extracted["text"]
    )

    # Doctor preparation engine
    doctor_prep = generate_doctor_prep(
        risk_indicators
    )

    # AI analysis
    analysis = analyze_health_text(
        extracted["text"]
    )

    # Inject structured risks
    analysis["risk_indicators"] = (
        risk_indicators
    )

    # Inject doctor prep
    analysis["doctor_prep"] = (
        doctor_prep
    )

    # Save persistent DB record
    save_health_record_db(

        user_id=user_id,

        report_text=extracted["text"],

        analysis=analysis
    )

    return {

        "ocr": extracted,

        "analysis": analysis,

        "trend_analysis":
            trend_analysis
    }