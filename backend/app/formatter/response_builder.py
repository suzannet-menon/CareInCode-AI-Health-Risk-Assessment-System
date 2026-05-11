def build_structured_response(
    summary,
    risk_indicators,
    evidence,
    doctor_questions,
    next_steps,
    confidence=0.75
):

    # SHORTEN SUMMARY
    short_summary = summary.strip()

    if len(short_summary) > 220:
        short_summary = short_summary[:220] + "..."

    # DEFAULT RISK
    if not risk_indicators:

        risk_indicators = [
            {
                "indicator": "General health observation",
                "severity": "low",
                "reason":
                "No major abnormalities detected."
            }
        ]

    # DEFAULT EVIDENCE
    if not evidence:

        evidence = [
            "User-reported symptoms were analyzed."
        ]

    # DEFAULT QUESTIONS
    if not doctor_questions:

        doctor_questions = [
            "Should I monitor these symptoms further?",
            "Are additional tests recommended?"
        ]

    # DEFAULT NEXT STEPS
    if not next_steps:

        next_steps = [
            "Monitor symptoms closely",
            "Seek medical attention if symptoms worsen"
        ]

    # DETERMINE GLOBAL RISK
    highest = "low"

    for risk in risk_indicators:

        severity = risk.get(
            "severity",
            "low"
        )

        if severity == "high":
            highest = "high"
            break

        elif (
            severity == "moderate"
            and highest != "high"
        ):
            highest = "moderate"

    return {

        "summary": short_summary,

        "risk_level": highest,

        "risk_indicators": risk_indicators,

        "evidence": evidence,

        "doctor_prep": {

            "questions_for_doctor":
            doctor_questions
        },

        "next_steps": next_steps,

        "disclaimer":
        (
            "Educational information only. "
            "Not a medical diagnosis."
        ),

        "confidence": confidence
    }