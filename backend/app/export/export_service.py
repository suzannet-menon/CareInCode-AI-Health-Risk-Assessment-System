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

    # SUMMARY
    elements.append(
        Paragraph(
            "<b>Summary</b>",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            data["analysis"]["summary"],
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(1, 12)
    )

    # RISKS
    elements.append(
        Paragraph(
            "<b>Risk Indicators</b>",
            styles["Heading2"]
        )
    )

    for risk in data["analysis"]["risk_indicators"]:

        risk_text = (
            f"{risk['type']} "
            f"({risk['severity']})"
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

    # DOCTOR PREP
    doctor_prep = (
        data["analysis"]["doctor_prep"]
    )

    elements.append(
        Paragraph(
            "<b>Doctor Prep</b>",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            doctor_prep["summary"],
            styles["BodyText"]
        )
    )

    for q in doctor_prep["questions"]:

        elements.append(
            Paragraph(
                f"• {q}",
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(1, 12)
    )

    # TRENDS
    elements.append(
        Paragraph(
            "<b>Trend Analysis</b>",
            styles["Heading2"]
        )
    )

    trend_analysis = (
        data.get(
            "trend_analysis",
            {}
        )
    )

    for key, value in trend_analysis.items():

        trend_text = (
            f"{key}: "
            f"{value['previous']} → "
            f"{value['current']} "
            f"({value['trend']})"
        )

        elements.append(
            Paragraph(
                trend_text,
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(1, 12)
    )

    # DISCLAIMER
    elements.append(
        Paragraph(
            "<b>Disclaimer</b>",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            data["analysis"]["disclaimer"],
            styles["BodyText"]
        )
    )

    doc.build(elements)

    return filepath