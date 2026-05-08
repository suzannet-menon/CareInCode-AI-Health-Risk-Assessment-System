from app.insight.vitals_engine import (
    analyze_vitals
)

from app.rag.vitals_rag_service import (
    get_vitals_evidence
)

from app.insight.vitals_doctor_prep import (
    generate_vitals_questions
)


def process_vitals(
    vitals_data: dict
):

    analysis = analyze_vitals(
        vitals_data
    )

    risks = analysis["risks"]

    insights = analysis["insights"]

    evidence = get_vitals_evidence(
        risks
    )

    doctor_prep = generate_vitals_questions(
        vitals_data,
        risks
    )

    return {

        "disclaimer":
            "This system provides educational health insights and is not a medical diagnosis. Please consult a qualified healthcare professional.",

        "summary":
            "Health vitals analyzed successfully.",

        "risk_indicators":
            risks,

        "insights":
            insights,

        "evidence":
            evidence,

        "doctor_prep":
            doctor_prep,

        "confidence":
            0.82
    }