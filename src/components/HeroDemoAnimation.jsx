
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const VITALS = [
  { label: "SpO₂", value: "98%", sub: "Oxygen saturation", status: "normal", icon: "○" },
  { label: "Blood Pressure", value: "122/80", sub: "mmHg", status: "normal", icon: "♥" },
  { label: "Heart Rate", value: "74 bpm", sub: "Resting", status: "normal", icon: "~" },
];

const REPORT = [
  { marker: "Vitamin D", value: "18 ng/mL", range: "30–100", status: "low", note: "Consider supplementation" },
  { marker: "TSH", value: "4.8 mIU/L", range: "0.4–4.0", status: "high", note: "Worth discussing with doctor" },
  { marker: "HbA1c", value: "5.4%", range: "<5.7%", status: "normal", note: "Within healthy range" },
];

const QUESTIONS = [
  "My Vitamin D has been low for 2 cycles — is daily supplementation right for me?",
  "TSH is slightly above range. Should I get a follow-up thyroid panel?",
  "I sleep 5–6 hours on weekdays. Could this be affecting my markers?",
];

const STEPS = ["vitals", "report", "prep"];
const STEP_DURATION = 2800;

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({ status }) {
  const map = {
    normal: { label: "Normal", bg: "#d4f0e4", color: "#0a6b41" },
    low:    { label: "Low",    bg: "#fde8cc", color: "#8a4a00" },
    high:   { label: "High",   bg: "#fde0e0", color: "#8a1a1a" },
  };
  const s = map[status] || map.normal;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
      padding: "3px 9px", borderRadius: 50,
      background: s.bg, color: s.color,
      textTransform: "uppercase",
      flexShrink: 0,
    }}>{s.label}</span>
  );
}

// ─── Stagger container variants ───────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

// ─── Screen 1 — Vitals ───────────────────────────────────────────────────────

function VitalsScreen() {
  return (
    <motion.div
      key="vitals"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ width: "100%" }}
    >
      <motion.div variants={itemVariants} style={styles.screenHeader}>
        <span style={styles.screenTag}>Health Reflection</span>
        <span style={styles.screenDot} />
        <span style={styles.screenTime}>Just now</span>
      </motion.div>

      <motion.p variants={itemVariants} style={styles.screenTitle}>Today's Vitals</motion.p>

      {VITALS.map((v) => (
        <motion.div key={v.label} variants={itemVariants} style={styles.vitalRow}>
          <div style={styles.vitalIcon}>{v.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={styles.vitalLabel}>{v.label}</div>
            <div style={styles.vitalSub}>{v.sub}</div>
          </div>
          <div style={styles.vitalValue}>{v.value}</div>
          <Badge status={v.status} />
        </motion.div>
      ))}

      <motion.div variants={itemVariants} style={styles.insightBubble}>
        <span style={styles.insightEmoji}>✦</span>
        <span style={styles.insightText}>All vitals within healthy range for your age & lifestyle profile.</span>
      </motion.div>
    </motion.div>
  );
}

// ─── Screen 2 — Report ───────────────────────────────────────────────────────

function ReportScreen() {
  return (
    <motion.div
      key="report"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ width: "100%" }}
    >
      <motion.div variants={itemVariants} style={styles.screenHeader}>
        <span style={styles.screenTag}>Report Simplifier</span>
        <span style={styles.screenDot} />
        <span style={styles.screenTime}>Lab results</span>
      </motion.div>

      <motion.p variants={itemVariants} style={styles.screenTitle}>Blood Panel Analysis</motion.p>

      {REPORT.map((r) => (
        <motion.div key={r.marker} variants={itemVariants} style={styles.reportRow}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={styles.reportMarker}>{r.marker}</span>
              <Badge status={r.status} />
            </div>
            <div style={styles.reportNote}>{r.note}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={styles.reportValue}>{r.value}</div>
            <div style={styles.reportRange}>ref: {r.range}</div>
          </div>
        </motion.div>
      ))}

      <motion.div variants={itemVariants} style={{ ...styles.insightBubble, background: "#fef6ec", borderColor: "#f5d9a8" }}>
        <span style={styles.insightEmoji}>✦</span>
        <span style={styles.insightText}>2 markers flagged. We've prepared questions for your next visit.</span>
      </motion.div>
    </motion.div>
  );
}

// ─── Screen 3 — Doctor Prep ───────────────────────────────────────────────────

function PrepScreen() {
  return (
    <motion.div
      key="prep"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ width: "100%" }}
    >
      <motion.div variants={itemVariants} style={styles.screenHeader}>
        <span style={styles.screenTag}>Doctor Visit Prep</span>
        <span style={styles.screenDot} />
        <span style={styles.screenTime}>3 questions ready</span>
      </motion.div>

      <motion.p variants={itemVariants} style={styles.screenTitle}>Ask Your Doctor</motion.p>

      {QUESTIONS.map((q, i) => (
        <motion.div key={i} variants={itemVariants} style={styles.questionRow}>
          <div style={styles.questionNum}>{i + 1}</div>
          <p style={styles.questionText}>{q}</p>
        </motion.div>
      ))}

      <motion.div variants={itemVariants} style={{ ...styles.insightBubble, background: "#e8f4ff", borderColor: "#b3d4f5" }}>
        <span style={styles.insightEmoji}>✦</span>
        <span style={styles.insightText}>Based on your lifestyle data & 2 flagged markers.</span>
      </motion.div>
    </motion.div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepDots({ current }) {
  return (
    <div style={styles.dotsRow}>
      {STEPS.map((s, i) => (
        <div key={s} style={{
          ...styles.dot,
          width: i === current ? 20 : 6,
          background: i === current ? "#0d9e6e" : "#c8e6d8",
        }} />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroDemoAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Floating card */}
      <div style={styles.card}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <div style={styles.topBarDots}>
            <span style={{ ...styles.macDot, background: "#ff6b6b" }} />
            <span style={{ ...styles.macDot, background: "#ffd93d" }} />
            <span style={{ ...styles.macDot, background: "#6bcb77" }} />
          </div>
          <span style={styles.topBarTitle}>CareInCode</span>
          <div style={{ width: 44 }} />
      </div>

        {/* Animated content */}
        <div style={styles.contentArea}>
          <AnimatePresence mode="wait">
            {step === 0 && <VitalsScreen />}
            {step === 1 && <ReportScreen />}
            {step === 2 && <PrepScreen />}
          </AnimatePresence>
        </div>

        {/* Step dots */}
        <StepDots current={step} />
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  wrapper: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px 40px 60px",
    overflow: "hidden",
  },

  card: {
    width: "100%",
    maxWidth: 700,
    height:650,
    background: "#fffdf9",
    borderRadius: 20,
    boxShadow: "0 24px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.06)",
    border: "1px solid rgba(13,158,110,0.12)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    background: "#f5f0e8",
    borderBottom: "1px solid #ede8df",
  },
  topBarDots: { display: "flex", gap: 5, alignItems: "center" },
  macDot: { width: 9, height: 9, borderRadius: "50%", display: "inline-block" },
  topBarTitle: {
    fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
    color: "#6b5e45", textTransform: "uppercase",
  },

  contentArea: {
    padding: "18px 18px 10px",
    minHeight: 280,
    display: "flex",
    flexDirection: "column",
  },

  screenHeader: {
    display: "flex", alignItems: "center", gap: 6,
    marginBottom: 10,
  },
  screenTag: {
    fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
    color: "#0d9e6e", textTransform: "uppercase",
  },
  screenDot: {
    width: 3, height: 3, borderRadius: "50%",
    background: "#b5c9bf",
  },
  screenTime: { fontSize: 10, color: "#9aada6" },

  screenTitle: {
    fontSize: 15, fontWeight: 700,
    color: "#1a2e24", marginBottom: 12,
    letterSpacing: "-0.01em",
  },

  // Vitals
  vitalRow: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px", marginBottom: 6,
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #ede8df",
  },
  vitalIcon: {
    width: 28, height: 28, borderRadius: 8,
    background: "#e8f7f0",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, color: "#0d9e6e", flexShrink: 0,
    fontFamily: "monospace",
  },
  vitalLabel: { fontSize: 12, fontWeight: 600, color: "#1a2e24" },
  vitalSub:   { fontSize: 10, color: "#9aada6", marginTop: 1 },
  vitalValue: { fontSize: 13, fontWeight: 700, color: "#1a2e24", flexShrink: 0 },

  // Report
  reportRow: {
    display: "flex", alignItems: "flex-start", gap: 10,
    padding: "10px 12px", marginBottom: 6,
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #ede8df",
  },
  reportMarker: { fontSize: 12, fontWeight: 600, color: "#1a2e24" },
  reportNote:   { fontSize: 10, color: "#9aada6", marginTop: 2 },
  reportValue:  { fontSize: 13, fontWeight: 700, color: "#1a2e24" },
  reportRange:  { fontSize: 10, color: "#b5c9bf", marginTop: 2 },

  // Questions
  questionRow: {
    display: "flex", alignItems: "flex-start", gap: 10,
    padding: "10px 12px", marginBottom: 6,
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #ede8df",
  },
  questionNum: {
    width: 20, height: 20, borderRadius: 6,
    background: "#e8f7f0",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 10, fontWeight: 700, color: "#0d9e6e",
    flexShrink: 0, marginTop: 1,
  },
  questionText: {
    fontSize: 11.5, color: "#3a5248", lineHeight: 1.55,
    margin: 0,
  },

  // Insight
  insightBubble: {
    display: "flex", alignItems: "flex-start", gap: 8,
    padding: "10px 12px",
    background: "#edf7f3",
    border: "1px solid #b8e6d0",
    borderRadius: 12,
    marginTop: 2,
  },
  insightEmoji: { fontSize: 11, color: "#0d9e6e", flexShrink: 0, marginTop: 1 },
  insightText: { fontSize: 11, color: "#2a6048", lineHeight: 1.5 },

  // Dots
  dotsRow: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 5, padding: "10px 0 14px",
  },
  dot: {
    height: 6, borderRadius: 99,
    transition: "width 0.4s cubic-bezier(.4,0,.2,1), background 0.4s ease",
  },
};