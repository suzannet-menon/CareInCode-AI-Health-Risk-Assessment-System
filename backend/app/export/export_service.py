import json

from datetime import datetime

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)


def export_json(
    data,
    filepath: str
):

    with open(
        filepath,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            data,
            f,
            indent=2
        )

    return filepath


def export_pdf(
    data,
    filepath: str
):

    doc = SimpleDocTemplate(
        filepath
    )

    styles = getSampleStyleSheet()

    elements = []

    analysis = data.get(
        "analysis",
        {}
    )

    # =========================
    # TITLE
    # =========================

    elements.append(
        Paragraph(
            "CareInCode+ Health Report",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(1, 12)
    )

    timestamp = str(
        datetime.utcnow()
    )

    elements.append(
        Paragraph(
            f"Generated: {timestamp}",
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(1, 12)
    )

    # =========================
    # SUMMARY
    # =========================

    elements.append(
        Paragraph(
            "<b>Summary</b>",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            analysis.get(
                "summary",
                "No summary available."
            ),
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(1, 12)
    )

    # =========================
    # RISK LEVEL
    # =========================

    risk_level = analysis.get(
        "risk_level",
        "unknown"
    )

    elements.append(
        Paragraph(
            "<b>Risk Level</b>",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            risk_level.upper(),
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(1, 12)
    )

    # =========================
    # RISKS
    # =========================

    elements.append(
        Paragraph(
            "<b>Risk Indicators</b>",
            styles["Heading2"]
        )
    )

    risks = analysis.get(
        "risk_indicators",
        []
    )

    for risk in risks:

        risk_text = (
            f"{risk.get('indicator', risk.get('type', 'Unknown'))} "
            f"({risk.get('severity', 'unknown')})"
        )

        elements.append(
            Paragraph(
                risk_text,
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(1, 12)
    )

    # =========================
    # EVIDENCE
    # =========================

    elements.append(
        Paragraph(
            "<b>Evidence</b>",
            styles["Heading2"]
        )
    )

    evidence = analysis.get(
        "evidence",
        []
    )

    for item in evidence:

        elements.append(
            Paragraph(
                f"• {item}",
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(1, 12)
    )

    # =========================
    # NEXT STEPS
    # =========================

    elements.append(
        Paragraph(
            "<b>Next Steps</b>",
            styles["Heading2"]
        )
    )

    next_steps = analysis.get(
        "next_steps",
        []
    )

    for step in next_steps:

        elements.append(
            Paragraph(
                f"• {step}",
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(1, 12)
    )

    # =========================
    # DOCTOR QUESTIONS
    # =========================

    elements.append(
        Paragraph(
            "<b>Questions For Doctor</b>",
            styles["Heading2"]
        )
    )

    doctor_prep = analysis.get(
        "doctor_prep",
        {}
    )

    questions = doctor_prep.get(
        "questions_for_doctor",
        []
    )

    for q in questions:

        elements.append(
            Paragraph(
                f"• {q}",
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(1, 12)
    )

    # =========================
    # DISCLAIMER
    # =========================

    elements.append(
        Paragraph(
            "<b>Disclaimer</b>",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            analysis.get(
                "disclaimer",
                "Educational information only."
            ),
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(1, 12)
    )

    # =========================
    # CONFIDENCE
    # =========================

    confidence = analysis.get(
        "confidence",
        0.0
    )

    elements.append(
        Paragraph(
            "<b>Confidence</b>",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            str(confidence),
            styles["BodyText"]
        )
    )

    # =========================
    # BUILD PDF
    # =========================

    doc.build(elements)

    return filepath