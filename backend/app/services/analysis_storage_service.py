latest_text_analysis = None

latest_vitals_analysis = None

latest_report_analysis = None


# =========================
# TEXT ANALYSIS
# =========================

def save_text_analysis(data):

    global latest_text_analysis

    latest_text_analysis = data


def get_text_analysis():

    return latest_text_analysis


# =========================
# VITALS ANALYSIS
# =========================

def save_vitals_analysis(data):

    global latest_vitals_analysis

    latest_vitals_analysis = data


def get_vitals_analysis():

    return latest_vitals_analysis


# =========================
# REPORT ANALYSIS
# =========================

def save_report_analysis(data):

    global latest_report_analysis

    latest_report_analysis = data


def get_report_analysis():

    return latest_report_analysis