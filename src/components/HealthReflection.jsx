import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const IconHeart = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const IconDroplet = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z"/>
  </svg>
);

const IconThermometer = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 14.76v1.5a2.5 2.5 0 1 1-5 0v-1.5M6.5 6.5a6 6 0 0 1 11 0"/>
  </svg>
);

const IconWind = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
  </svg>
);

const IconActivity = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

export default function HealthReflection() {
  const navigate = useNavigate();
  const [vitals, setVitals] = useState({
    spO2: "",
    systolic: "",
    diastolic: "",
    heartRate: "",
    temperature: "",
  });

  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock lifestyle data - in a real app, this would come from context/database
  const lifestyleData = {
    activity: "sedentary",
    stress: "high",
    sleep: "6 hours",
    sleepTime: "irregular",
    outdoorTime: "minimal",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVitals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetInsights = async () => {
    // Validate that at least one vital is entered
    const hasAnyVital = Object.values(vitals).some((v) => v);
    if (!hasAnyVital) {
      alert("Please enter at least one vital sign");
      return;
    }

    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const generatedInsights = generateInsights(vitals, lifestyleData);
      setInsights(generatedInsights);
      setLoading(false);
    }, 1200);
  };

  const generateInsights = (vitals, lifestyle) => {
    const insights = [];

    // SpO2 Insight
    if (vitals.spO2) {
      const spO2Val = parseFloat(vitals.spO2);
      if (spO2Val < 95) {
        insights.push({
          vital: "Oxygen Saturation (SpO2)",
          value: `${vitals.spO2}%`,
          status: "warning",
          explanation: `Your SpO2 is on the lower end. Combined with your ${lifestyle.activity} routine and limited outdoor activity, this could indicate reduced cardiovascular fitness or oxygen utilization. Consider increasing physical activity and spending more time outdoors.`,
        });
      } else if (spO2Val >= 95 && spO2Val <= 100) {
        insights.push({
          vital: "Oxygen Saturation (SpO2)",
          value: `${vitals.spO2}%`,
          status: "good",
          explanation: `Your SpO2 is in the normal range, indicating good oxygen saturation. Keep up with regular physical activity.`,
        });
      }
    }

    // Blood Pressure Insight
    if (vitals.systolic && vitals.diastolic) {
      const sys = parseFloat(vitals.systolic);
      const dia = parseFloat(vitals.diastolic);
      if (sys > 140 || dia > 90) {
        insights.push({
          vital: "Blood Pressure",
          value: `${vitals.systolic}/${vitals.diastolic} mmHg`,
          status: "warning",
          explanation: `Your blood pressure is elevated. Given your reported ${lifestyle.stress} stress levels and ${lifestyle.sleep} sleep pattern, these are known contributing factors. Consider stress management techniques and improving sleep consistency.`,
        });
      } else if (sys >= 120 && sys <= 140) {
        insights.push({
          vital: "Blood Pressure",
          value: `${vitals.systolic}/${vitals.diastolic} mmHg`,
          status: "neutral",
          explanation: `Your blood pressure is slightly elevated. Monitor regularly and consider lifestyle adjustments like reducing caffeine intake and increasing physical activity.`,
        });
      } else {
        insights.push({
          vital: "Blood Pressure",
          value: `${vitals.systolic}/${vitals.diastolic} mmHg`,
          status: "good",
          explanation: `Your blood pressure is healthy. Continue with your current lifestyle habits.`,
        });
      }
    }

    // Heart Rate Insight
    if (vitals.heartRate) {
      const hrVal = parseFloat(vitals.heartRate);
      if (hrVal > 100) {
        insights.push({
          vital: "Heart Rate",
          value: `${vitals.heartRate} bpm`,
          status: "warning",
          explanation: `Your resting heart rate is elevated. This could indicate stress, caffeine intake, or reduced cardio fitness. Your ${lifestyle.activity} routine may benefit from more aerobic exercise.`,
        });
      } else if (hrVal >= 60 && hrVal <= 100) {
        insights.push({
          vital: "Heart Rate",
          value: `${vitals.heartRate} bpm`,
          status: "good",
          explanation: `Your resting heart rate is in a healthy range, suggesting good cardiovascular fitness.`,
        });
      } else if (hrVal < 60) {
        insights.push({
          vital: "Heart Rate",
          value: `${vitals.heartRate} bpm`,
          status: "neutral",
          explanation: `Your resting heart rate is low. This can indicate good fitness or may warrant a conversation with your doctor if you feel fatigued.`,
        });
      }
    }

    // Temperature Insight
    if (vitals.temperature) {
      const tempVal = parseFloat(vitals.temperature);
      if (tempVal < 36.1 || tempVal > 37.2) {
        insights.push({
          vital: "Body Temperature",
          value: `${vitals.temperature}°C`,
          status: "warning",
          explanation: `Your body temperature is outside the normal range. This could indicate an infection, inflammation, or other health concern. Consider consulting with your doctor.`,
        });
      } else {
        insights.push({
          vital: "Body Temperature",
          value: `${vitals.temperature}°C`,
          status: "good",
          explanation: `Your body temperature is in the normal range.`,
        });
      }
    }

    return insights.length > 0
      ? insights
      : [{ vital: "General", value: "N/A", status: "neutral", explanation: "No vitals entered yet." }];
  };

  return (
    <div className="health-reflection-page">
      {/* Header */}
      <motion.div
        className="reflection-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="back-button"
          aria-label="Back to dashboard"
        >
          ← Back
        </button>
        <h1 className="reflection-title">Health Reflection Tool</h1>
        <p className="reflection-desc">
          Enter your vitals below to get personalized insights based on your lifestyle habits.
        </p>
      </motion.div>

      <div className="reflection-container">
        {/* Input Section */}
        <motion.section
          className="reflection-input-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <h2 className="section-subtitle">Enter Your Vitals</h2>

          <div className="vitals-grid">
            {/* SpO2 Input */}
            <div className="vital-input-group">
              <label htmlFor="spO2">
                Oxygen Saturation (SpO2)
                <span className="optional-badge">Optional</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="spO2"
                  type="number"
                  name="spO2"
                  placeholder="e.g., 98"
                  min="0"
                  max="100"
                  step="0.1"
                  value={vitals.spO2}
                  onChange={handleInputChange}
                  className="vital-input"
                />
                <span className="input-unit">%</span>
              </div>
              <p className="input-hint">Normal: 95-100%</p>
            </div>

            {/* Systolic Input */}
            <div className="vital-input-group">
              <label htmlFor="systolic">
                Blood Pressure (Systolic)
                <span className="optional-badge">Optional</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="systolic"
                  type="number"
                  name="systolic"
                  placeholder="e.g., 120"
                  min="0"
                  max="200"
                  value={vitals.systolic}
                  onChange={handleInputChange}
                  className="vital-input"
                />
                <span className="input-unit">mmHg</span>
              </div>
              <p className="input-hint">Normal: &lt; 120 mmHg</p>
            </div>

            {/* Diastolic Input */}
            <div className="vital-input-group">
              <label htmlFor="diastolic">
                Blood Pressure (Diastolic)
                <span className="optional-badge">Optional</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="diastolic"
                  type="number"
                  name="diastolic"
                  placeholder="e.g., 80"
                  min="0"
                  max="150"
                  value={vitals.diastolic}
                  onChange={handleInputChange}
                  className="vital-input"
                />
                <span className="input-unit">mmHg</span>
              </div>
              <p className="input-hint">Normal: &lt; 80 mmHg</p>
            </div>

            {/* Heart Rate Input */}
            <div className="vital-input-group">
              <label htmlFor="heartRate">
                Heart Rate
                <span className="optional-badge">Optional</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="heartRate"
                  type="number"
                  name="heartRate"
                  placeholder="e.g., 72"
                  min="0"
                  max="200"
                  value={vitals.heartRate}
                  onChange={handleInputChange}
                  className="vital-input"
                />
                <span className="input-unit">bpm</span>
              </div>
              <p className="input-hint">Normal: 60-100 bpm</p>
            </div>

            {/* Temperature Input */}
            <div className="vital-input-group">
              <label htmlFor="temperature">
                Body Temperature
                <span className="optional-badge">Optional</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="temperature"
                  type="number"
                  name="temperature"
                  placeholder="e.g., 37"
                  min="35"
                  max="42"
                  step="0.1"
                  value={vitals.temperature}
                  onChange={handleInputChange}
                  className="vital-input"
                />
                <span className="input-unit">°C</span>
              </div>
              <p className="input-hint">Normal: 36.1-37.2°C</p>
            </div>
          </div>

          <motion.button
            className="btn-get-insights"
            onClick={handleGetInsights}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating Insights...
              </>
            ) : (
              "Get Insights"
            )}
          </motion.button>
        </motion.section>

        {/* Insights Section */}
        {insights && (
          <motion.section
            className="reflection-insights-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <h2 className="section-subtitle">Your Health Insights</h2>
            <div className="insights-container">
              {insights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  className={`insight-card insight-${insight.status}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                >
                  <div className="insight-header">
                    <h3 className="insight-vital">{insight.vital}</h3>
                    <span className={`insight-badge insight-badge-${insight.status}`}>
                      {insight.status.charAt(0).toUpperCase() + insight.status.slice(1)}
                    </span>
                  </div>
                  <p className="insight-value">{insight.value}</p>
                  <p className="insight-explanation">{insight.explanation}</p>
                </motion.div>
              ))}
            </div>

            <div className="insights-footer">
              <p className="insights-note">
                💡 <strong>Lifestyle Context:</strong> These insights are based on your reported
                lifestyle of <strong>{lifestyleData.activity}</strong> activity,{" "}
                <strong>{lifestyleData.stress}</strong> stress levels, and{" "}
                <strong>{lifestyleData.sleep}</strong> sleep. Update your lifestyle profile every
                two weeks for accurate insights.
              </p>
            </div>

            <motion.button
              className="btn-reset"
              onClick={() => {
                setVitals({
                  spO2: "",
                  systolic: "",
                  diastolic: "",
                  heartRate: "",
                  temperature: "",
                });
                setInsights(null);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Enter New Vitals
            </motion.button>
          </motion.section>
        )}
      </div>
    </div>
  );
}
