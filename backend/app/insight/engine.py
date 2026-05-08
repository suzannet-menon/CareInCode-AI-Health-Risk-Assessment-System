import re


def analyze_health_data(
    text: str
):

    text = text.lower()

    risk_indicators = []

    # HEMOGLOBIN
    hemoglobin_match = re.search(
        r'hemoglobin.*?(\d+\.?\d*)',
        text
    )

    if hemoglobin_match:

        hb = float(
            hemoglobin_match.group(1)
        )

        if hb < 13:

            risk_indicators.append({

                "type":
                "Low Hemoglobin",

                "severity":
                "moderate",

                "confidence":
                0.90,

                "source":
                "rule-based",

                "value":
                hb
            })

    # PLATELETS
    platelet_match = re.search(
        r'platelet.*?(\d+)',
        text
    )

    if platelet_match:

        platelets = int(
            platelet_match.group(1)
        )

        if platelets < 150000:

            risk_indicators.append({

                "type":
                "Low Platelet Count",

                "severity":
                "moderate",

                "confidence":
                0.88,

                "source":
                "rule-based",

                "value":
                platelets
            })

    # GLUCOSE
    glucose_match = re.search(
        r'glucose.*?(\d+)',
        text
    )

    if glucose_match:

        glucose = int(
            glucose_match.group(1)
        )

        if glucose > 140:

            risk_indicators.append({

                "type":
                "Elevated Glucose",

                "severity":
                "high",

                "confidence":
                0.91,

                "source":
                "rule-based",

                "value":
                glucose
            })

    return risk_indicators


def extract_structured_metrics(
    text: str
):

    text = text.lower()

    metrics = {}

    # HEMOGLOBIN
    hb_match = re.search(
        r'hemoglobin.*?(\d+\.?\d*)',
        text
    )

    if hb_match:

        metrics["hemoglobin"] = float(
            hb_match.group(1)
        )

    # PLATELETS
    platelet_match = re.search(
        r'platelet.*?(\d+)',
        text
    )

    if platelet_match:

        metrics["platelets"] = int(
            platelet_match.group(1)
        )

    return metrics