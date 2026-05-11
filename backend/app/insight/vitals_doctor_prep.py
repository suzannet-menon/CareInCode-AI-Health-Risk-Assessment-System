def generate_vitals_questions(
    vitals: dict,
    risks: list
):

    questions = []

    if any(
        r["type"] == "heart_rate"
        for r in risks
    ):

        questions.append(
            "What could be causing my elevated heart rate?"
        )

    if any(
        r["type"] == "blood_pressure"
        for r in risks
    ):

        questions.append(
            "Should I monitor my blood pressure more frequently?"
        )

    if any(
        r["type"] == "spo2"
        for r in risks
    ):

        questions.append(
            "What could lower oxygen saturation levels indicate?"
        )

    if any(
        r["type"] == "temperature"
        for r in risks
    ):

        questions.append(
            "Could this temperature indicate infection or inflammation?"
        )

    if any(
        r["type"] == "sleep"
        for r in risks
    ):

        questions.append(
            "How can I improve my sleep quality?"
        )

    return {
        "summary":
            "You may discuss these findings with a healthcare professional.",

        "questions":
            questions
    }