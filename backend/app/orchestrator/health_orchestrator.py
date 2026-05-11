from app.ai.llm_client import llm_client

from app.insight.engine import (
    analyze_health_data
)

from app.insight.doctor_prep import (
    generate_doctor_prep
)

from app.core.safety_guard import (
    detect_high_risk,
    detect_prompt_injection,
    generate_emergency_response,
    generate_blocked_response
)

from app.formatter.response_builder import (
    build_structured_response
)


def analyze_health_text(user_input: str):

    # =========================
    # PROMPT INJECTION BLOCK
    # =========================

    if detect_prompt_injection(user_input):

        return generate_blocked_response()

    # =========================
    # HIGH-RISK SAFETY CHECK
    # =========================

    detected_risks = detect_high_risk(user_input)

    if detected_risks:

        return generate_emergency_response(
            detected_risks
        )

    # =========================
    # CONCISE HEALTH PROMPT
    # =========================

    prompt = f"""
    You are a healthcare education assistant.

    STRICT RULES:
    - Never diagnose diseases
    - Never prescribe medication
    - Never act as a doctor
    - Use concise language
    - Maximum 2-3 sentences
    - Avoid long explanations
    - Avoid medical essays
    - Focus on patient-friendly guidance

    User input:
    {user_input}

    Provide:
    - Brief educational interpretation
    - Possible health concern level
    - Simple wellness guidance
    """

    result = llm_client.generate(prompt)

    # =========================
    # AI FAILURE HANDLING
    # =========================

    if not result["success"]:

        return {

            "summary":
                "AI analysis temporarily unavailable.",

            "risk_level":
                "low",

            "risk_indicators": [],

            "evidence": [],

            "doctor_prep": {
                "questions_for_doctor": []
            },

            "next_steps": [
                "Please try again later"
            ],

            "disclaimer":
                (
                    "Educational information only. "
                    "Not a medical diagnosis."
                ),

            "confidence": 0.0
        }

    # =========================
    # ML / RULE-BASED ENGINE
    # =========================

    risk_indicators = analyze_health_data(
        user_input
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
    # EVIDENCE EXTRACTION
    # =========================

    evidence = []

    next_steps = []

    lowered = user_input.lower()

    # BREATHING
    if "breath" in lowered:

        evidence.append(
            "User reported breathing difficulty"
        )

        next_steps.extend([

            "Monitor symptoms closely",

            "Avoid smoke or strong irritants",

            "Seek urgent care if symptoms worsen"
        ])

    # CHEST PAIN
    if "chest pain" in lowered:

        evidence.append(
            "User reported chest pain"
        )

        next_steps.append(
            "Seek urgent medical evaluation"
        )

    # FEVER
    if "fever" in lowered:

        evidence.append(
            "User reported fever"
        )

        next_steps.append(
            "Stay hydrated and monitor temperature"
        )

    # DIZZINESS
    if "dizzy" in lowered:

        evidence.append(
            "User reported dizziness"
        )

        next_steps.append(
            "Avoid sudden standing movements"
        )

    # FAINTING
    if "faint" in lowered:

        evidence.append(
            "User reported fainting episodes"
        )

        next_steps.append(
            "Medical evaluation is recommended"
        )

    # =========================
    # BUILD FINAL RESPONSE
    # =========================

    return build_structured_response(

        summary=result["text"],

        risk_indicators=risk_indicators,

        evidence=evidence,

        doctor_questions=doctor_questions,

        next_steps=next_steps,

        confidence=0.80
    )