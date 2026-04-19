import { useRef, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "uploadedReports";

function saveUploadedReport(file, summary) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const now = new Date();

  const record = {
    id: `${file.name}-${now.getTime()}`,
    fileName: file.name,
    category: "Pending",
    uploadedAt: now.toISOString(),
    uploadedDateLabel: now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    uploadedDay: now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    fileType: file.type || "unknown",
    summary,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing]));
}

function downloadSummaryFile(file, insight) {
  const body = [
    "CareInCode Report Upload",
    "",
    `File: ${file?.name || "Uploaded report"}`,
    "",
    insight,
  ].join("\n");

  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-summary.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function Report() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError("");
    setInsight("");
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload one report file first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setInsight("");

      setTimeout(() => {
        const generatedSummary =
          "AI insight generation is not connected yet. Uploaded reports can be collected here, but no automatic interpretation is being shown.";
        setInsight(generatedSummary);
        saveUploadedReport(file, generatedSummary);
        setLoading(false);
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Could not generate AI insights right now.");
      setLoading(false);
    }
  };

  const handleDownloadSummary = async () => {
    if (!insight) {
      setError("Generate insights first before downloading the summary.");
      return;
    }

    try {
      setDownloading(true);
      setError("");
      downloadSummaryFile(file, insight);
    } catch (err) {
      console.error(err);
      setError("Could not download the summary.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="report-page">
      <motion.div
        className="report-hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <h1 className="report-heading">Report Simplifier</h1>
          <p className="report-desc">
            Upload one medical report at a time. This screen currently stores
            the selected file locally and reserves space for future analysis
            without showing any fabricated report interpretation.
          </p>

          <div className="report-tags">
            <span className="report-chip">Single file upload</span>
            <span className="report-chip">Medical-style summary</span>
            <span className="report-chip">Saved for history view</span>
          </div>
        </div>

        <section className="report-side-card">
          <div className="report-side-icon" aria-hidden="true">
            []
          </div>

          <h2 className="report-side-title">Smarter report interpretation</h2>

          <p className="report-side-text">
            Report analysis is intentionally left blank until the actual
            processing flow is connected.
          </p>
        </section>
      </motion.div>

      <div className="report-workspace">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          <section className="upload-shell report-panel">
            <div className="upload-shell-body">
              <div className="upload-shell-header">
                <h2 className="upload-title">Upload your report</h2>
                <p className="upload-subtitle">Supported formats: PDF, PNG, JPG, JPEG</p>
              </div>

              <div className="upload-card enhanced" onClick={handleChooseFile}>
                <div className="upload-icon-wrap" aria-hidden="true">
                  ^
                </div>

                <p className="upload-main-text">Click to select a report</p>

                <p className="upload-helper-text">
                  Upload one report file to register it here without any dummy
                  AI insight output
                </p>

                {file && <div className="selected-file">{file.name}</div>}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <div className="report-actions">
                <button
                  type="button"
                  className="btn-primary report-button"
                  onClick={handleAnalyze}
                  disabled={loading}
                >
                  {loading ? "Saving upload..." : "Save Upload"}
                </button>
              </div>

              {error && <p className="report-error">{error}</p>}
            </div>
          </section>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <section className="insight-panel report-panel">
            <div className="upload-shell-body">
              <div className="insight-panel-header">
                <div className="insight-panel-icon" aria-hidden="true">
                  *
                </div>

                <div>
                  <h2 className="insight-title">AI Insight Summary</h2>
                  <p className="insight-subtitle">
                    No dummy interpretation is displayed on this screen
                  </p>
                </div>
              </div>

              <div className="insight-box upgraded">
                {insight ||
                  "No AI summary is being shown right now. This area will stay neutral until real report analysis is connected."}
              </div>

              {insight && (
                <div className="report-actions">
                  <button
                    type="button"
                    className="btn-primary report-button"
                    onClick={handleDownloadSummary}
                    disabled={downloading}
                  >
                    {downloading ? "Preparing file..." : "Download Note"}
                  </button>
                </div>
              )}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
