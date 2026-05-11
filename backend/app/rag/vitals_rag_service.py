from app.rag.vitals_evidence import (
    VITAL_EVIDENCE
)


def get_vitals_evidence(
    risk_indicators
):

    evidence = []

    for risk in risk_indicators:

        risk_type = risk["type"]

        if risk_type in VITAL_EVIDENCE:

            evidence.append(
                VITAL_EVIDENCE[risk_type]
            )

    return evidence