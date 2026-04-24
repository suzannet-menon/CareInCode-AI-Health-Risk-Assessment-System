import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HealthVisualisation() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock data - in a real app, this would come from database
  const reports = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      category: "Blood Test",
      date: "2024-02-15",
      status: "normal",
      markers: 12,
      abnormal: 0,
    },
    {
      id: 2,
      name: "Thyroid Function Test (TSH)",
      category: "Hormone Panel",
      date: "2024-02-10",
      status: "warning",
      markers: 4,
      abnormal: 1,
    },
    {
      id: 3,
      name: "Lipid Profile",
      category: "Cholesterol Panel",
      date: "2024-02-01",
      status: "normal",
      markers: 5,
      abnormal: 0,
    },
    {
      id: 4,
      name: "Vitamin D Test",
      category: "Micronutrient",
      date: "2024-01-25",
      status: "abnormal",
      markers: 1,
      abnormal: 1,
    },
    {
      id: 5,
      name: "Kidney Function Test",
      category: "Metabolic Panel",
      date: "2024-01-15",
      status: "normal",
      markers: 6,
      abnormal: 0,
    },
    {
      id: 6,
      name: "Chest X-Ray",
      category: "Radiology",
      date: "2024-01-10",
      status: "normal",
      markers: 8,
      abnormal: 0,
    },
  ];

  const filteredReports =
    activeFilter === "all"
      ? reports
      : reports.filter((report) => report.status === activeFilter);

  const categories = ["all", ...new Set(reports.map((r) => r.status))];

  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
        return "#10b981"; // green
      case "warning":
        return "#f59e0b"; // amber
      case "abnormal":
        return "#ef4444"; // red
      default:
        return "#6b7280"; // gray
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "normal":
        return "Normal";
      case "warning":
        return "Monitor";
      case "abnormal":
        return "Abnormal";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="health-viz-page">
      {/* Header */}
      <motion.div
        className="viz-header"
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
        <h1 className="viz-title">Health Visualization</h1>
        <p className="viz-desc">
          Track your medical reports across time. Compare results, identify patterns, and see how
          your health evolves with lifestyle changes.
        </p>
      </motion.div>

      <div className="viz-container">
        {/* Stats Overview */}
        <motion.div
          className="viz-stats"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="stat-card stat-card-total">
            <span className="stat-number">{reports.length}</span>
            <span className="stat-label">Total Reports</span>
          </div>
          <div className="stat-card stat-card-normal">
            <span className="stat-number">{reports.filter((r) => r.status === "normal").length}</span>
            <span className="stat-label">Normal</span>
          </div>
          <div className="stat-card stat-card-warning">
            <span className="stat-number">
              {reports.filter((r) => r.status === "warning").length}
            </span>
            <span className="stat-label">Need Monitoring</span>
          </div>
          <div className="stat-card stat-card-abnormal">
            <span className="stat-number">
              {reports.filter((r) => r.status === "abnormal").length}
            </span>
            <span className="stat-label">Abnormal</span>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="viz-filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <h3 className="filter-label">Filter by Status:</h3>
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? "active" : ""}`}
                onClick={() => setActiveFilter(category)}
              >
                {category === "all" ? "All Reports" : getStatusLabel(category)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Reports Grid */}
        <motion.div
          className="viz-reports"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <h2 className="reports-title">
            {activeFilter === "all" ? "All Reports" : `${getStatusLabel(activeFilter)} Reports`}
          </h2>

          {filteredReports.length > 0 ? (
            <div className="reports-container">
              {filteredReports.map((report, idx) => (
                <motion.div
                  key={report.id}
                  className="report-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  style={{
                    borderLeftColor: getStatusColor(report.status),
                  }}
                >
                  <div className="report-card-header">
                    <div className="report-info">
                      <h3 className="report-name">{report.name}</h3>
                      <p className="report-category">{report.category}</p>
                    </div>
                    <div
                      className="report-status-badge"
                      style={{
                        backgroundColor: getStatusColor(report.status),
                      }}
                    >
                      {getStatusLabel(report.status)}
                    </div>
                  </div>

                  <div className="report-card-body">
                    <div className="report-date">
                      <span className="date-label">Date:</span>
                      <span className="date-value">{report.date}</span>
                    </div>

                    <div className="report-markers">
                      <span className="markers-label">Total Markers:</span>
                      <span className="markers-value">{report.markers}</span>
                    </div>

                    {report.abnormal > 0 && (
                      <div className="report-abnormal">
                        <span className="abnormal-label">⚠️ Abnormal Values:</span>
                        <span className="abnormal-value">{report.abnormal}</span>
                      </div>
                    )}
                  </div>

                  <div className="report-card-footer">
                    <motion.button
                      className="btn-view-details"
                      whileHover={{ x: 4 }}
                      whileTap={{ x: 0 }}
                    >
                      View Details →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="no-reports"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No reports found for the selected filter.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          className="viz-timeline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
        >
          <h2 className="timeline-title">Report Timeline</h2>
          <div className="timeline-container">
            {reports
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((report, idx) => (
                <motion.div
                  key={report.id}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="timeline-marker" style={{ backgroundColor: getStatusColor(report.status) }}></div>
                  <div className="timeline-content">
                    <h4 className="timeline-report-name">{report.name}</h4>
                    <p className="timeline-date">{report.date}</p>
                    <p className="timeline-status">{getStatusLabel(report.status)}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Health Trends Section */}
        <motion.div
          className="viz-trends"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
        >
          <h2 className="trends-title">Health Trends & Insights</h2>
          <div className="trends-grid">
            <div className="trend-card">
              <h3 className="trend-card-title">📊 Report Frequency</h3>
              <p className="trend-card-text">
                You're averaging <strong>one report every 7 days</strong>. Keep tracking regularly
                to identify meaningful patterns.
              </p>
            </div>

            <div className="trend-card">
              <h3 className="trend-card-title">📈 Most Tested Category</h3>
              <p className="trend-card-text">
                Your most frequent tests are <strong>Blood Tests</strong>. Ensure consistency in
                testing times for accurate comparisons.
              </p>
            </div>

            <div className="trend-card">
              <h3 className="trend-card-title">💡 Next Steps</h3>
              <p className="trend-card-text">
                Schedule a follow-up appointment to discuss your latest report results with your
                doctor. Bring this summary.
              </p>
            </div>

            <div className="trend-card">
              <h3 className="trend-card-title">🔄 Lifestyle Impact</h3>
              <p className="trend-card-text">
                Updates to your lifestyle profile are synced with your reports. Keep your routine
                information current for better insights.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
