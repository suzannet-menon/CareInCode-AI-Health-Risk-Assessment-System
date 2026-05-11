def analyze_vitals(
    data: dict
):

    risks = []

    insights = []

    # HEART RATE

    heart_rate = data.get(
        "heart_rate",
        0
    )

    if heart_rate > 100:

        risks.append({
            "type": "heart_rate",
            "severity": "moderate",
            "confidence": 0.75,
            "source": "hybrid (rule + RAG)"
        })

        insights.append(
            "Heart rate appears elevated."
        )

    elif heart_rate < 50:

        risks.append({
            "type": "heart_rate",
            "severity": "moderate",
            "confidence": 0.70,
            "source": "rule-based"
        })

        insights.append(
            "Heart rate appears lower than typical."
        )

    # SPO2

    if data.get("spo2", 100) < 95:

        risks.append({
            "type": "spo2",
            "severity": "high",
            "confidence": 0.85,
            "source": "hybrid (rule + RAG)"
        })

        insights.append(
            "Oxygen saturation appears lower than typical levels."
        )

    # TEMPERATURE

    if data.get("temperature", 0) > 37.5:

        risks.append({
            "type": "temperature",
            "severity": "moderate",
            "confidence": 0.80,
            "source": "rule-based"
        })

        insights.append(
            "Body temperature appears elevated."
        )

    # BLOOD PRESSURE

    systolic = data.get(
        "systolic_bp",
        0
    )

    diastolic = data.get(
        "diastolic_bp",
        0
    )

    if systolic > 130 or diastolic > 85:

        risks.append({
            "type": "blood_pressure",
            "severity": "moderate",
            "confidence": 0.80,
            "source": "hybrid (rule + RAG)"
        })

        insights.append(
            "Blood pressure readings are higher than typical ranges."
        )

    # SLEEP

    sleep_hours = data.get(
        "sleep_hours",
        8
    )

    if sleep_hours < 5:

        risks.append({
            "type": "sleep",
            "severity": "moderate",
            "confidence": 0.72,
            "source": "rule-based"
        })

        insights.append(
            "Sleep duration appears lower than recommended."
        )

    elif sleep_hours < 6:

        risks.append({
            "type": "sleep",
            "severity": "low",
            "confidence": 0.68,
            "source": "rule-based"
        })

        insights.append(
            "Sleep duration appears slightly below recommended levels."
        )

    # ACTIVITY

    if data.get("steps", 10000) < 3000:

        risks.append({
            "type": "activity",
            "severity": "low",
            "confidence": 0.68,
            "source": "rule-based"
        })

        insights.append(
            "Physical activity appears lower than common recommendations."
        )

    return {

        "risks":
            risks,

        "insights":
            insights
    }