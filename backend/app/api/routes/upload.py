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

from app.services.analysis_storage_service import (
    save_report_analysis
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

from app.insight.report_classifier import (
    classify_medical_report
)

from app.formatter.response_builder import (
    build_structured_response
)

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/report")
async def upload_report(
    file: UploadFile = File(...)
):

    # =========================
    # SAFETY CHECK
    # =========================

    if not file.filename:

        return {
            "error": "Filename missing"
        }

    filename = file.filename.lower()

    # =========================
    # FILE VALIDATION
    # =========================

    if not validate_file(filename):

        return {
            "error": "Invalid file type"
        }

    # =========================
    # SAVE FILE
    # =========================

    file_path = save_uploaded_file(file)

    # =========================
    # OCR / PDF EXTRACTION
    # =========================

    if filename.endswith(".pdf"):

        extracted = extract_text_from_pdf(
            file_path
        )

    else:

        extracted = extract_text_from_image(
            file_path
        )

    extracted_text = extracted.get(
        "text",
        ""
    )

    # =========================
    # REPORT CLASSIFICATION
    # =========================

    report_type = classify_medical_report(
        extracted_text
    )

    # =========================
    # STRUCTURED METRICS
    # =========================

    metrics = extract_structured_metrics(
        extracted_text
    )

    # =========================
    # DEMO USER
    # =========================

    user_id = "demo_user"

    # =========================
    # MEMORY STORAGE
    # =========================

    save_health_record(
        user_id,
        metrics
    )

    # =========================
    # USER HISTORY
    # =========================

    history = get_user_history(
        user_id
    )

    # =========================
    # TREND ANALYSIS
    # =========================

    trend_analysis = analyze_trends(
        history
    )

    # =========================
    # RISK ANALYSIS
    # =========================

    risk_indicators = analyze_health_data(
        extracted_text
    )

    # =========================
    # DOCTOR PREP
    # =========================

    doctor_prep = generate_doctor_prep(
        risk_indicators
    )

    doctor_questions = (
        doctor_prep.get(
            "questions",
            []
        )
    )

    # =========================
    # AI ANALYSIS
    # =========================

    ai_result = analyze_health_text(
        extracted_text
    )

    # =========================
    # EVIDENCE
    # =========================

    evidence = ai_result.get(
        "evidence",
        []
    )

    # =========================
    # NEXT STEPS
    # =========================

    next_steps = []

    for risk in risk_indicators:

        risk_type = risk.get(
            "type",
            ""
        )

        # HEART RATE
        if risk_type == "heart_rate":

            next_steps.append(
                "Monitor heart rate regularly"
            )

        # SPO2
        elif risk_type == "spo2":

            next_steps.append(
                "Monitor oxygen levels closely"
            )

        # BLOOD PRESSURE
        elif risk_type == "blood_pressure":

            next_steps.append(
                "Track blood pressure daily"
            )

        # TEMPERATURE
        elif risk_type == "temperature":

            next_steps.append(
                "Monitor temperature changes"
            )

    # =========================
    # REPORT-SPECIFIC STEPS
    # =========================

    if report_type == "diabetes":

        next_steps.extend([

            "Monitor blood sugar regularly",

            "Discuss HbA1c trends with your doctor"
        ])

    elif report_type == "lipid":

        next_steps.extend([

            "Monitor cholesterol levels",

            "Discuss cardiovascular risk factors"
        ])

    elif report_type == "thyroid":

        next_steps.extend([

            "Monitor thyroid hormone levels",

            "Track symptoms like fatigue or weight changes"
        ])

    elif report_type == "kidney":

        next_steps.extend([

            "Stay hydrated",

            "Monitor kidney function tests regularly"
        ])

    elif report_type == "liver":

        next_steps.extend([

            "Avoid alcohol if medically advised",

            "Monitor liver enzyme trends"
        ])

    elif report_type == "cbc":

        next_steps.extend([

            "Review blood count trends with your doctor"
        ])

    # =========================
    # DEFAULT NEXT STEPS
    # =========================

    if not next_steps:

        next_steps = [

            "Monitor symptoms closely",

            "Consult a healthcare professional if symptoms worsen"
        ]

    # REMOVE DUPLICATES
    next_steps = list(
        set(next_steps)
    )

    # =========================
    # STRUCTURED RESPONSE
    # =========================

    analysis = build_structured_response(

        summary=ai_result.get(
            "summary",
            "Health report analyzed successfully."
        ),

        risk_indicators=risk_indicators,

        evidence=evidence,

        doctor_questions=doctor_questions,

        next_steps=next_steps,

        confidence=0.84
    )

    # =========================
    # SAVE FOR EXPORTS
    # =========================

    save_report_analysis({
        "analysis": analysis
    })

    # =========================
    # SAVE DB RECORD
    # =========================

    save_health_record_db(

        user_id=user_id,

        report_text=extracted_text,

        analysis=analysis
    )

    # =========================
    # FINAL RESPONSE
    # =========================

    return {

        "report_type":
            report_type,

        "ocr":
            extracted,

        "analysis":
            analysis,

        "trend_analysis":
            trend_analysis
    }