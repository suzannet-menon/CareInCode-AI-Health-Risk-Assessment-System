def classify_medical_report(text: str):

    lowered = text.lower()

    # =========================
    # CBC / COMPLETE BLOOD COUNT
    # =========================

    cbc_keywords = [
        "hemoglobin",
        "rbc",
        "wbc",
        "platelet",
        "hematocrit"
    ]

    # =========================
    # DIABETES
    # =========================

    diabetes_keywords = [
        "glucose",
        "hba1c",
        "fasting sugar",
        "blood sugar"
    ]

    # =========================
    # LIPID PROFILE
    # =========================

    lipid_keywords = [
        "cholesterol",
        "ldl",
        "hdl",
        "triglycerides"
    ]

    # =========================
    # THYROID
    # =========================

    thyroid_keywords = [
        "tsh",
        "t3",
        "t4",
        "thyroid"
    ]

    # =========================
    # LIVER FUNCTION
    # =========================

    liver_keywords = [
        "alt",
        "ast",
        "bilirubin",
        "liver"
    ]

    # =========================
    # KIDNEY FUNCTION
    # =========================

    kidney_keywords = [
        "creatinine",
        "urea",
        "bun",
        "egfr"
    ]

    # =========================
    # URINE REPORT
    # =========================

    urine_keywords = [
        "urine",
        "ketones",
        "protein",
        "pus cells"
    ]

    # =========================
    # ECG
    # =========================

    ecg_keywords = [
        "ecg",
        "tachycardia",
        "arrhythmia",
        "rhythm"
    ]

    # =========================
    # CLASSIFICATION LOGIC
    # =========================

    if any(word in lowered for word in cbc_keywords):
        return "cbc"

    if any(word in lowered for word in diabetes_keywords):
        return "diabetes"

    if any(word in lowered for word in lipid_keywords):
        return "lipid"

    if any(word in lowered for word in thyroid_keywords):
        return "thyroid"

    if any(word in lowered for word in liver_keywords):
        return "liver"

    if any(word in lowered for word in kidney_keywords):
        return "kidney"

    if any(word in lowered for word in urine_keywords):
        return "urine"

    if any(word in lowered for word in ecg_keywords):
        return "ecg"

    # =========================
    # DEFAULT
    # =========================

    return "general"