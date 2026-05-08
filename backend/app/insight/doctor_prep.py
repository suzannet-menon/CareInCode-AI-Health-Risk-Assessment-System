def generate_doctor_prep(
    risk_indicators
):

    questions = []

    summaries = []

    for risk in risk_indicators:

        risk_type = risk["type"]

        # LOW HEMOGLOBIN
        if risk_type == "Low Hemoglobin":

            summaries.append(
                "Mildly low hemoglobin detected."
            )

            questions.extend([

                "Could this indicate anemia?",

                "Should iron studies be performed?",

                "Would vitamin B12 or folate testing help?",

                "Should dietary changes be considered?"
            ])

        # LOW PLATELETS
        elif risk_type == "Low Platelet Count":

            summaries.append(
                "Borderline or reduced platelet count detected."
            )

            questions.extend([

                "Does platelet count need monitoring?",

                "Could this be temporary or clinically significant?",

                "Are additional blood tests recommended?"
            ])

        # HIGH GLUCOSE
        elif risk_type == "Elevated Glucose":

            summaries.append(
                "Elevated glucose level detected."
            )

            questions.extend([

                "Should fasting glucose or HbA1c be checked?",

                "Could lifestyle changes help improve glucose levels?",

                "Is follow-up monitoring recommended?"
            ])

    if not summaries:

        summaries.append(
            "No major structured abnormalities detected."
        )

    return {

        "summary":
        " ".join(summaries),

        "questions":
        questions
    }