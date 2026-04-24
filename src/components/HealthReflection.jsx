import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const INITIAL_VITALS = {
  spO2: "",
  systolic: "",
  diastolic: "",
  heartRate: "",
  temperature: "",
};

const lifestyleData = {
  activity: "mostly sedentary",
  stress: "high work stress",
  sleep: "6 hours with an irregular sleep time",
  outdoorTime: "limited outdoor activity",
  updatedAt: "7 days ago",
};

const vitalCards = [
  {
    key: "spO2",
    label: "Oxygen Saturation",
    shortLabel: "SpO2",
    placeholder: "98",
    unit: "%",
    hint: "Usually 95-100%",
    explainer: "Shows how much oxygen your blood is carrying.",
  },
  {
    key: "systolic",
    label: "Blood Pressure (Systolic)",
    shortLabel: "Systolic",
    placeholder: "120",
    unit: "mmHg",
    hint: "Usually below 120",
    explainer: "Top number that reflects pressure when the heart pumps.",
  },
  {
    key: "diastolic",
    label: "Blood Pressure (Diastolic)",
    shortLabel: "Diastolic",
    placeholder: "80",
    unit: "mmHg",
    hint: "Usually below 80",
    explainer: "Bottom number that reflects pressure between beats.",
  },
  {
    key: "heartRate",
    label: "Heart Rate",
    shortLabel: "Heart Rate",
    placeholder: "72",
    unit: "bpm",
    hint: "Usually 60-100 bpm",
    explainer: "How many times your heart beats in one minute at rest.",
  },
  {
    key: "temperature",
    label: "Body Temperature",
    shortLabel: "Temperature",
    placeholder: "36.8",
    unit: "deg C",
    hint: "Usually 36.1-37.2 deg C",
    explainer: "A basic sign that can reflect infection or inflammation.",
  },
];

const statusCopy = {
  good: "Balanced",
  neutral: "Watch",
  warning: "Attention",
};

function buildInsights(vitals, lifestyle) {
  const entries = [];
  const suggestions = [];

  if (vitals.spO2) {
    const value = Number(vitals.spO2);
    if (value < 95) {
      entries.push({
        vital: "Oxygen Saturation (SpO2)",
        value: `${value}%`,
        status: "warning",
        explanation: `Your oxygen level is slightly lower than expected. Paired with your ${lifestyle.activity} routine and ${lifestyle.outdoorTime}, this can fit a pattern of low cardio conditioning worth discussing if it keeps repeating.`,
      });
      suggestions.push("Try a short daily walk or light movement break to reduce long sedentary stretches.");
    } else {
      entries.push({
        vital: "Oxygen Saturation (SpO2)",
        value: `${value}%`,
        status: "good",
        explanation: "This reading is in a reassuring range and suggests oxygen delivery looks stable right now.",
      });
    }
  }

  if (vitals.systolic && vitals.diastolic) {
    const systolic = Number(vitals.systolic);
    const diastolic = Number(vitals.diastolic);

    if (systolic >= 140 || diastolic >= 90) {
      entries.push({
        vital: "Blood Pressure",
        value: `${systolic}/${diastolic} mmHg`,
        status: "warning",
        explanation: `This blood pressure is elevated. Combined with your ${lifestyle.stress} and ${lifestyle.sleep}, that lifestyle context makes this worth monitoring closely and raising with your doctor if it stays high.`,
      });
      suggestions.push("Aim for a more regular sleep window and reduce stimulants late in the day.");
    } else if (systolic >= 120 || diastolic >= 80) {
      entries.push({
        vital: "Blood Pressure",
        value: `${systolic}/${diastolic} mmHg`,
        status: "neutral",
        explanation: `This sits a little above the ideal range. Your current stress and inconsistent sleep could be contributing, so this is a good area to recheck after a calmer routine.`,
      });
      suggestions.push("Track blood pressure at the same time of day for a more honest pattern.");
    } else {
      entries.push({
        vital: "Blood Pressure",
        value: `${systolic}/${diastolic} mmHg`,
        status: "good",
        explanation: "This reading looks comfortably within the healthy range for a routine check-in.",
      });
    }
  } else if (vitals.systolic || vitals.diastolic) {
    entries.push({
      vital: "Blood Pressure",
      value: "Incomplete entry",
      status: "neutral",
      explanation: "Add both systolic and diastolic values to get a proper blood pressure reflection.",
    });
  }

  if (vitals.heartRate) {
    const value = Number(vitals.heartRate);
    if (value > 100) {
      entries.push({
        vital: "Heart Rate",
        value: `${value} bpm`,
        status: "warning",
        explanation: `Your resting heart rate is on the higher side. Stress, poor sleep, caffeine, and low aerobic activity can all push this upward.`,
      });
      suggestions.push("Hydrate well and include some gentle aerobic movement through the week.");
    } else if (value < 60) {
      entries.push({
        vital: "Heart Rate",
        value: `${value} bpm`,
        status: "neutral",
        explanation: "A lower heart rate can be fine in fitter people, but it is worth noting if you also feel dizzy, weak, or unusually tired.",
      });
    } else {
      entries.push({
        vital: "Heart Rate",
        value: `${value} bpm`,
        status: "good",
        explanation: "Your resting heart rate sits in a typical range and does not raise concern on its own.",
      });
    }
  }

  if (vitals.temperature) {
    const value = Number(vitals.temperature);
    if (value < 36.1 || value > 37.2) {
      entries.push({
        vital: "Body Temperature",
        value: `${value} deg C`,
        status: "warning",
        explanation: "This sits outside the usual range, which can happen with infection, inflammation, or temporary body changes. It is best interpreted with symptoms.",
      });
    } else {
      entries.push({
        vital: "Body Temperature",
        value: `${value} deg C`,
        status: "good",
        explanation: "This temperature looks within the usual range for a routine reading.",
      });
    }
  }

  const uniqueSuggestions = [...new Set(suggestions)].slice(0, 3);
  const warningCount = entries.filter((entry) => entry.status === "warning").length;
  const neutralCount = entries.filter((entry) => entry.status === "neutral").length;

  let overview = "Your current readings look broadly steady.";
  if (warningCount > 0) {
    overview = "A few readings deserve closer attention, especially when viewed with your current lifestyle pattern.";
  } else if (neutralCount > 0) {
    overview = "Nothing here looks urgent, but there are a couple of areas worth keeping an eye on.";
  }

  if (!uniqueSuggestions.length) {
    uniqueSuggestions.push("Keep updating your lifestyle profile every two weeks so future reflections stay accurate.");
  }

  return { entries, suggestions: uniqueSuggestions, overview };
}

export default function HealthReflection() {
  const navigate = useNavigate();
  const [vitals, setVitals] = useState(INITIAL_VITALS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const enteredCount = useMemo(
    () => Object.values(vitals).filter((value) => value !== "").length,
    [vitals]
  );

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setError("");
    setVitals((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleGetInsights = () => {
    if (!enteredCount) {
      setError("Enter at least one vital to generate insights.");
      return;
    }

    setLoading(true);
    setError("");

    window.setTimeout(() => {
      setResult(buildInsights(vitals, lifestyleData));
      setLoading(false);
    }, 900);
  };

  const resetForm = () => {
    setVitals(INITIAL_VITALS);
    setResult(null);
    setError("");
  };

  return (
    <div className="health-reflection-page">
      <motion.div
        className="reflection-header reflection-shell"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <button onClick={() => navigate("/dashboard")} className="back-btn" type="button">
          {"<-"} Dashboard
        </button>
        <div className="reflection-header-copy">
          <span className="page-kicker">Profile 1</span>
          <h1 className="reflection-title">Health Reflection Tool</h1>
          <p className="reflection-desc">
            Enter whichever vitals you have. CareInCode explains each one in plain language and
            connects it back to your lifestyle rather than showing isolated numbers.
          </p>
        </div>
        <div className="reflection-header-meta">
          <div className="reflection-meta-card">
            <span className="meta-label">Lifestyle profile</span>
            <strong>Up to date</strong>
            <p>Last refreshed {lifestyleData.updatedAt}</p>
          </div>
          <div className="reflection-meta-card">
            <span className="meta-label">Inputs added</span>
            <strong>{enteredCount}/5</strong>
            <p>Every vital stays optional.</p>
          </div>
        </div>
      </motion.div>

      <div className="reflection-shell reflection-grid">
        <motion.section
          className="reflection-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <div className="panel-head">
            <div>
              <p className="panel-kicker">Input Vitals</p>
              <h2 className="panel-title">Add the readings you have today</h2>
            </div>
            <p className="panel-note">
              No pressure to fill everything. Even one reading can still generate a useful
              reflection.
            </p>
          </div>

          <div className="reflection-vitals-grid">
            {vitalCards.map((card, index) => (
              <motion.label
                key={card.key}
                className="reflection-vital-card"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <div className="reflection-vital-head">
                  <div>
                    <span className="reflection-vital-short">{card.shortLabel}</span>
                    <h3>{card.label}</h3>
                  </div>
                  <span className="optional-badge">Optional</span>
                </div>
                <p className="reflection-vital-explainer">{card.explainer}</p>
                <div className="reflection-input-wrap">
                  <input
                    className="reflection-input"
                    type="number"
                    name={card.key}
                    placeholder={card.placeholder}
                    step={card.key === "temperature" || card.key === "spO2" ? "0.1" : "1"}
                    value={vitals[card.key]}
                    onChange={handleChange}
                  />
                  <span className="reflection-unit">{card.unit}</span>
                </div>
                <span className="reflection-hint">{card.hint}</span>
              </motion.label>
            ))}
          </div>

          <div className="reflection-actions">
            <motion.button
              type="button"
              className="btn-analyze"
              onClick={handleGetInsights}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
            >
              {loading ? (
                <>
                  <span className="spinner-small" />
                  Generating insights...
                </>
              ) : (
                "Get Insights"
              )}
            </motion.button>
            <button type="button" className="btn-reset subtle-reset" onClick={resetForm}>
              Clear values
            </button>
          </div>

          {error ? <p className="reflection-error">{error}</p> : null}
        </motion.section>

        <motion.section
          className="reflection-panel reflection-results-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
        >
          <div className="panel-head">
            <div>
              <p className="panel-kicker">Connected Insight</p>
              <h2 className="panel-title">What these readings may be saying</h2>
            </div>
            <p className="panel-note">
              Current lifestyle context: {lifestyleData.activity}, {lifestyleData.stress}, and{" "}
              {lifestyleData.sleep}.
            </p>
          </div>

          {!result ? (
            <div className="reflection-empty">
              <div className="reflection-empty-ring">
                <span>AI</span>
              </div>
              <h3>Insights will appear here</h3>
              <p>
                Once you click <strong>Get Insights</strong>, this panel will summarize the
                readings, connect them to lifestyle, and give grounded next-step suggestions.
              </p>
            </div>
          ) : (
            <>
              <div className="reflection-overview-card">
                <span className="overview-label">Overall reflection</span>
                <p>{result.overview}</p>
              </div>

              <div className="reflection-insights-list">
                {result.entries.map((entry, index) => (
                  <motion.article
                    key={`${entry.vital}-${index}`}
                    className={`reflection-insight-card status-${entry.status}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className="reflection-insight-top">
                      <div>
                        <h3>{entry.vital}</h3>
                        <span className="reflection-insight-value">{entry.value}</span>
                      </div>
                      <span className={`insight-status-badge badge-${entry.status}`}>
                        {statusCopy[entry.status]}
                      </span>
                    </div>
                    <p>{entry.explanation}</p>
                  </motion.article>
                ))}
              </div>

              <div className="reflection-suggestions-card">
                <div className="suggestions-head">
                  <h3>Personalized lifestyle suggestions</h3>
                  <span>{result.suggestions.length} tips</span>
                </div>
                <div className="suggestions-list">
                  {result.suggestions.map((suggestion) => (
                    <div key={suggestion} className="suggestion-item">
                      <span className="suggestion-dot" />
                      <p>{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lifestyle-context-card">
                <h3>Lifestyle signals used in this reflection</h3>
                <div className="lifestyle-context-grid">
                  <div>
                    <span>Activity</span>
                    <strong>{lifestyleData.activity}</strong>
                  </div>
                  <div>
                    <span>Stress</span>
                    <strong>{lifestyleData.stress}</strong>
                  </div>
                  <div>
                    <span>Sleep</span>
                    <strong>{lifestyleData.sleep}</strong>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.section>
      </div>
    </div>
  );
}
