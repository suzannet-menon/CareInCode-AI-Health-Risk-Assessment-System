HIGH_RISK_TERMS = [

    "chest pain",
    "difficulty breathing",
    "shortness of breath",
    "stroke",
    "loss of consciousness",
    "severe bleeding",
    "heart attack",
    "suicidal",
    "fainting"
]

PROMPT_INJECTION_TERMS = [

    "ignore instructions",
    "override safety",
    "act as doctor",
    "diagnose disease",
    "prescribe medicine"
]


def detect_high_risk(text: str):

    detected_terms = []

    text = text.lower()

    for term in HIGH_RISK_TERMS:

        if term in text:

            detected_terms.append(term)

    return detected_terms


def detect_prompt_injection(text: str):

    text = text.lower()

    for term in PROMPT_INJECTION_TERMS:

        if term in text:

            return True

    return False


def generate_emergency_response(detected_terms):

    return {

        "disclaimer":
        "This system cannot provide emergency or diagnostic medical assistance.",

        "summary":
        "Potential urgent symptoms detected. Please seek immediate medical attention or contact emergency services.",

        "risk_indicators": detected_terms,

        "insights": [],

        "evidence": [],

        "doctor_prep": {
            "summary":
            "Immediate professional medical evaluation is recommended.",
            "questions": []
        },

        "confidence": 0.98
    }


def generate_blocked_response():

    return {

        "disclaimer":
        "Unsafe request detected.",

        "summary":
        "This system cannot override medical safety rules or provide diagnosis/prescriptions.",

        "risk_indicators": [],

        "insights": [],

        "evidence": [],

        "doctor_prep": {
            "summary": "",
            "questions": []
        },

        "confidence": 1.0
    }