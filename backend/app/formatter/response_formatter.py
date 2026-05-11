def format_response(
    text: str,
    risk_indicators=None,
    doctor_prep=None
):

    if risk_indicators is None:

        risk_indicators = []

    if doctor_prep is None:

        doctor_prep = {
            "summary": "",
            "questions": []
        }

    return {

        "disclaimer":
        "This system provides educational information only and is not medical advice.",

        "summary":
        text,

        "risk_indicators":
        risk_indicators,

        "insights": [],

        "evidence": [],

        "doctor_prep":
        doctor_prep,

        "confidence":
        0.75
    }