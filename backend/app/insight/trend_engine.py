def analyze_trends(
    history
):

    trend_analysis = {}

    if len(history) < 2:

        return trend_analysis

    latest = history[-1]

    previous = history[-2]

    # HEMOGLOBIN TREND
    if (
        "hemoglobin" in latest
        and "hemoglobin" in previous
    ):

        current = latest["hemoglobin"]

        old = previous["hemoglobin"]

        trend = "stable"

        if current > old:

            trend = "increasing"

        elif current < old:

            trend = "decreasing"

        trend_analysis["hemoglobin"] = {

            "previous": old,

            "current": current,

            "trend": trend
        }

    return trend_analysis