from app.ai.llm_client import llm_client

from app.formatter.response_formatter import format_response

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


def analyze_health_text(user_input: str):

    # Prompt injection block
    if detect_prompt_injection(user_input):

        return generate_blocked_response()

    # High-risk symptom detection
    detected_risks = detect_high_risk(user_input)

    if detected_risks:

        return generate_emergency_response(detected_risks)

    # Normal AI flow
    prompt = f"""
    You are a safe healthcare education assistant.

    STRICT RULES:
    - Never diagnose disease
    - Never prescribe medication
    - Never act as a doctor
    - Only provide educational insights
    - Use cautious and probabilistic language

    User input:
    {user_input}

    Provide:
    - Educational insights
    - Possible health trends
    - General wellness guidance
    - Doctor discussion suggestions
    """

    result = llm_client.generate(prompt)

    # AI failure handling
    if not result["success"]:

        return {

            "disclaimer":
                "AI analysis temporarily unavailable.",

            "summary":
                result["error"],

            "risk_indicators": [],

            "insights": [],

            "evidence": [],

            "doctor_prep": {
                "summary": "",
                "questions": []
            },

            "confidence": 0.0
        }

    # ML / rule-based insight engine
    risk_indicators = analyze_health_data(
        user_input
    )

    # Doctor preparation engine
    doctor_prep = generate_doctor_prep(
        risk_indicators
    )

    return format_response(
        result["text"],
        risk_indicators,
        doctor_prep
    )