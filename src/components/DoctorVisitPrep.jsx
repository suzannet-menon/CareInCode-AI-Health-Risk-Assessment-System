import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DoctorVisitPrep() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("medications");
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({ name: "", reason: "", dosage: "" });
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState({ date: "", description: "" });
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddMedication = () => {
    if (!newMed.name.trim()) {
      alert("Please enter medication name");
      return;
    }

    const med = {
      id: `med-${Date.now()}`,
      ...newMed,
      addedDate: new Date().toLocaleDateString("en-GB"),
    };

    setMedications([...medications, med]);
    setNewMed({ name: "", reason: "", dosage: "" });
  };

  const handleRemoveMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const handleAddSymptom = () => {
    if (!newSymptom.date || !newSymptom.description.trim()) {
      alert("Please select a date and describe your symptom");
      return;
    }

    const symptom = {
      id: `sym-${Date.now()}`,
      date: newSymptom.date,
      description: newSymptom.description,
      timestamp: new Date(newSymptom.date),
    };

    setSymptoms([...symptoms, symptom].sort((a, b) => a.timestamp - b.timestamp));
    setNewSymptom({ date: "", description: "" });
  };

  const handleRemoveSymptom = (id) => {
    setSymptoms(symptoms.filter((sym) => sym.id !== id));
  };

  const handleGenerateSummary = async () => {
    if (medications.length === 0 && symptoms.length === 0) {
      alert("Please add at least one medication or symptom entry");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const generatedSummary = generateSummary(medications, symptoms);
      setSummary(generatedSummary);
      setLoading(false);
    }, 1500);
  };

  const generateSummary = (meds, syms) => {
    const visitDate = new Date().toLocaleDateString("en-GB", { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    let summary = "═══════════════════════════════════════════════════════\n";
    summary += "         DOCTOR VISIT PREPARATION SUMMARY\n";
    summary += "═══════════════════════════════════════════════════════\n\n";
    
    summary += `Visit Date: ${visitDate}\n\n`;

    summary += "┌─ CURRENT MEDICATIONS ─────────────────────────────────┐\n";
    summary += "│                                                       │\n";
    if (meds.length > 0) {
      meds.forEach((med, idx) => {
        summary += `│ ${idx + 1}. ${med.name}\n`;
        if (med.dosage) summary += `│    Dosage: ${med.dosage}\n`;
        if (med.reason) summary += `│    Reason: ${med.reason}\n`;
        summary += `│    Added: ${med.addedDate}\n`;
        if (idx < meds.length - 1) summary += "│\n";
      });
    } else {
      summary += "│ No medications reported.\n";
    }
    summary += "│                                                       │\n";
    summary += "└─────────────────────────────────────────────────────────┘\n\n";

    summary += "┌─ SYMPTOM TIMELINE & PROGRESSION ──────────────────────┐\n";
    summary += "│                                                       │\n";
    if (syms.length > 0) {
      syms.forEach((sym, idx) => {
        summary += `│ [${sym.date}]\n`;
        summary += `│ → ${sym.description}\n`;
        if (idx < syms.length - 1) summary += "│\n";
      });
      summary += "│                                                       │\n";
      summary += "│ PATTERN ANALYSIS:\n";
      summary += `│ • Total symptoms logged: ${syms.length}\n`;
      summary += `│ • Time span: ${syms.length > 1 ? 'Multiple days tracked' : 'Recent onset'}\n`;
    } else {
      summary += "│ No symptoms logged.\n";
      summary += "│                                                       │\n";
    }
    summary += "└─────────────────────────────────────────────────────────┘\n\n";

    summary += "┌─ INTEGRATION NOTES ───────────────────────────────────┐\n";
    summary += "│                                                       │\n";
    if (meds.length > 0 && syms.length > 0) {
      summary += "│ Please discuss:\n";
      summary += "│ • How current medications relate to reported symptoms\n";
      summary += "│ • Any medication adjustments if symptoms persist\n";
      summary += "│ • Timeline of symptom onset vs medication start\n";
    } else if (meds.length > 0) {
      summary += "│ Current medication regimen needs review.\n";
    } else if (syms.length > 0) {
      summary += "│ Symptom timeline provided for medical assessment.\n";
    }
    summary += "│                                                       │\n";
    summary += "└─────────────────────────────────────────────────────────┘\n\n";

    summary += "═══════════════════════════════════════════════════════\n";
    summary += "Generated from CareInCode - Your Personal Health Hub\n";
    summary += "═══════════════════════════════════════════════════════\n";

    return summary;
  };

  const downloadSummary = () => {
    if (!summary) return;

    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `doctor-visit-summary-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="doctor-visit-page">
      {/* Header */}
      <motion.div
        className="dv-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="back-btn"
          aria-label="Back to dashboard"
        >
          ← Dashboard
        </button>
        <h1 className="dv-title">Doctor Visit Preparation</h1>
        <p className="dv-desc">
          Log your current medications and symptom timeline, then generate a comprehensive summary to share with your doctor.
        </p>
      </motion.div>

      <div className="dv-container">
        {/* Tabs */}
        <motion.div
          className="dv-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <button
            className={`dv-tab ${activeTab === "medications" ? "active" : ""}`}
            onClick={() => setActiveTab("medications")}
          >
            💊 Medications
            {medications.length > 0 && <span className="tab-badge">{medications.length}</span>}
          </button>
          <button
            className={`dv-tab ${activeTab === "symptoms" ? "active" : ""}`}
            onClick={() => setActiveTab("symptoms")}
          >
            📋 Symptoms
            {symptoms.length > 0 && <span className="tab-badge">{symptoms.length}</span>}
          </button>
          <button
            className={`dv-tab ${activeTab === "summary" ? "active" : ""}`}
            onClick={() => setActiveTab("summary")}
          >
            📄 Summary
          </button>
        </motion.div>

        {/* Content */}
        <motion.div
          className="dv-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          {/* Medications Tab */}
          {activeTab === "medications" && (
            <div className="dv-section">
              <h2 className="dv-section-title">Current Medications</h2>
              <p className="dv-section-desc">
                List all medications you're currently taking. This helps your doctor understand
                your complete medical picture.
              </p>

              {/* Input Form */}
              <div className="dv-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="med-name">Medication Name *</label>
                    <input
                      id="med-name"
                      type="text"
                      placeholder="e.g., Aspirin, Metformin"
                      value={newMed.name}
                      onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="med-dosage">Dosage</label>
                    <input
                      id="med-dosage"
                      type="text"
                      placeholder="e.g., 500mg twice daily"
                      value={newMed.dosage}
                      onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="med-reason">Reason for Taking</label>
                  <textarea
                    id="med-reason"
                    placeholder="e.g., High blood pressure, Diabetes management"
                    value={newMed.reason}
                    onChange={(e) => setNewMed({ ...newMed, reason: e.target.value })}
                    className="form-textarea"
                    rows="2"
                  />
                </div>

                <button className="btn-add-item" onClick={handleAddMedication}>
                  + Add Medication
                </button>
              </div>

              {/* Medications List */}
              {medications.length > 0 && (
                <div className="dv-list">
                  <h3 className="list-title">Your Medications ({medications.length})</h3>
                  {medications.map((med) => (
                    <motion.div
                      key={med.id}
                      className="dv-list-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                    >
                      <div className="item-content">
                        <h4 className="item-name">{med.name}</h4>
                        {med.dosage && <p className="item-detail">Dosage: {med.dosage}</p>}
                        {med.reason && <p className="item-detail">Reason: {med.reason}</p>}
                        <p className="item-meta">Added: {med.addedDate}</p>
                      </div>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveMedication(med.id)}
                        aria-label="Remove medication"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Symptoms Tab */}
          {activeTab === "symptoms" && (
            <div className="dv-section">
              <h2 className="dv-section-title">Symptom Timeline</h2>
              <p className="dv-section-desc">
                Log your symptoms over time. Include dates, severity, and any changes you notice.
                This helps identify patterns.
              </p>

              {/* Calendar & Input Form */}
              <div className="dv-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="symptom-date">Date *</label>
                    <input
                      id="symptom-date"
                      type="date"
                      value={newSymptom.date}
                      onChange={(e) => setNewSymptom({ ...newSymptom, date: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="symptom-desc">Symptom Description *</label>
                  <textarea
                    id="symptom-desc"
                    placeholder="e.g., Joint pain in left knee, mild swelling, felt worse after sitting"
                    value={newSymptom.description}
                    onChange={(e) => setNewSymptom({ ...newSymptom, description: e.target.value })}
                    className="form-textarea"
                    rows="3"
                  />
                </div>

                <button className="btn-add-item" onClick={handleAddSymptom}>
                  + Log Symptom
                </button>
              </div>

              {/* Symptoms Timeline */}
              {symptoms.length > 0 && (
                <div className="dv-timeline">
                  <h3 className="list-title">Symptom History ({symptoms.length})</h3>
                  <div className="timeline-container">
                    {symptoms.map((symptom, idx) => (
                      <motion.div
                        key={symptom.id}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <h4 className="timeline-date">{symptom.date}</h4>
                          <p className="timeline-description">{symptom.description}</p>
                        </div>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemoveSymptom(symptom.id)}
                          aria-label="Remove symptom"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Summary Tab */}
          {activeTab === "summary" && (
            <div className="dv-section">
              <h2 className="dv-section-title">Pre-Consultation Summary</h2>
              <p className="dv-section-desc">
                Generate a comprehensive summary from your medications, symptoms, and reports to
                share with your doctor.
              </p>

              {!summary ? (
                <div className="summary-prompt">
                  <p className="summary-prompt-text">
                    {medications.length === 0 && symptoms.length === 0
                      ? "Add medications and/or symptoms in the tabs above to generate your summary."
                      : "Ready to generate your doctor visit summary?"}
                  </p>
                  {(medications.length > 0 || symptoms.length > 0) && (
                    <motion.button
                      className="btn-generate-summary"
                      onClick={handleGenerateSummary}
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner"></span>
                          Generating Summary...
                        </>
                      ) : (
                        "Generate Summary for Doctor"
                      )}
                    </motion.button>
                  )}
                </div>
              ) : (
                <motion.div
                  className="summary-display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="summary-text">
                    {summary.split("\n").map((line, idx) => (
                      <p key={idx} className={line.endsWith(":") ? "summary-heading" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="summary-actions">
                    <motion.button
                      className="btn-download-summary"
                      onClick={downloadSummary}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      📥 Download as PDF
                    </motion.button>
                    <motion.button
                      className="btn-new-summary"
                      onClick={() => setSummary(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ↻ Generate New
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Recent Reports Reference - Removed as per simplified design */}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
