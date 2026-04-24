import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { text } from "../content/text";

const profiles = [
  {
    pill: {
      en: "Lifestyle-aware insights",
      hi: "जीवनशैली-आधारित जानकारी",
    },
    desc: {
      en: "Enter whatever vitals you have. We explain each one and connect it to how you actually live.",
      hi: "अपने वाइटल दर्ज करें। हम हर एक को समझाते हैं और आपकी जीवनशैली से जोड़ते हैं।",
    },
    visual: (
      <div>
        <div className="mock-row">
          <span className="mock-label">SpO2</span>
          <span className="mock-val">96%</span>
          <span className="badge good">Normal</span>
        </div>
        <div className="mock-row">
          <span className="mock-label">Blood pressure</span>
          <span className="mock-val">128/84</span>
          <span className="badge warn">Watch</span>
        </div>
        <div className="mock-row">
          <span className="mock-label">Heart rate</span>
          <span className="mock-val">78 bpm</span>
          <span className="badge good">Good</span>
        </div>
        <div className="mock-insight">
          Your BP is slightly elevated. Based on your described routine of long sitting hours and
          low outdoor activity, this is a common lifestyle pattern worth monitoring.
        </div>
      </div>
    ),
  },
  {
    pill: {
      en: "Blood · Thyroid · Urine",
      hi: "ब्लड · थायरॉइड · यूरिन",
    },
    desc: {
      en: "Upload a blood test, thyroid panel, urine report, or prescription. Every marker gets explained with your lifestyle in context.",
      hi: "ब्लड टेस्ट, थायरॉइड, यूरिन रिपोर्ट या प्रिस्क्रिप्शन अपलोड करें। हर मार्कर को जीवनशैली के संदर्भ में समझाया जाता है।",
    },
    visual: (
      <div>
        <div className="mock-report">
          <div className="mock-icon">LAB</div>
          <div className="mock-report-text">
            <strong>Vitamin D - 18 ng/mL (Low)</strong>
            Your indoor routine likely contributes. Dietary change or sunlight exposure may help.
          </div>
        </div>
        <div className="mock-report">
          <div className="mock-icon">CBC</div>
          <div className="mock-report-text">
            <strong>Haemoglobin - 13.2 g/dL (Normal)</strong>
            Within healthy range for your age and gender.
          </div>
        </div>
        <div className="mock-report">
          <div className="mock-icon">TSH</div>
          <div className="mock-report-text">
            <strong>TSH - 5.1 mIU/L (Slightly high)</strong>
            Combined with fatigue and irregular sleep, this is worth discussing with your doctor.
          </div>
        </div>
      </div>
    ),
  },
  {
    desc: {
      en: "Log symptoms as they happen. One button before your visit generates a structured summary and the exact questions to ask.",
      hi: "लक्षण लॉग करें। एक बटन दबाएं और डॉक्टर के लिए सारांश व सवाल तैयार हो जाएं।",
    },
    pill: {
      en: "Doctor-ready questions",
      hi: "डॉक्टर के लिए प्रश्न",
    },
    visual: (
      <div>
        <div className="visual-mini-calendar">
          <div className="visual-mini-header">Symptom calendar</div>
          <div className="visual-mini-grid">
            <div className="visual-mini-cell">Mon 8</div>
            <div className="visual-mini-cell active">Tue 9</div>
            <div className="visual-mini-cell">Wed 10</div>
            <div className="visual-mini-cell">Thu 11</div>
          </div>
        </div>
        <div className="mock-report" style={{ marginTop: "14px" }}>
          <div className="mock-icon mock-icon-text">MED</div>
          <div className="mock-report-text">
            <strong>Vitamin D3 - 1000 IU daily</strong>
            Currently taking for low Vitamin D.
          </div>
        </div>
        <div className="mock-question">
          <span className="mock-qnum">1</span>
          Today felt some joint pain around both knees after walking longer than usual.
        </div>
        <div className="mock-question">
          <span className="mock-qnum">2</span>
          A week later the pain aggravated slightly while climbing stairs and standing up.
        </div>
      </div>
    ),
  },
];

function ProfilesDemo({ lang }) {
  const [active, setActive] = useState(0);
  const t = text[lang];
  const tabs = [
    { num: t.tab1Num, name: t.tab1Name, desc: t.tab1Desc },
    { num: t.tab2Num, name: t.tab2Name, desc: t.tab2Desc },
    { num: t.tab3Num, name: t.tab3Name, desc: t.tab3Desc },
  ];

  return (
    <motion.section
      className="demo-section"
      id="demo"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="section-label">{t.demoLabel}</div>
      <div className="section-title">{t.demoTitle}</div>

      <div className="profile-tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.num}
            className={`profile-tab ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
          >
            <div className="tab-num">{tab.num}</div>
            <div className="tab-name">{tab.name}</div>
            <div className="tab-desc">{tab.desc}</div>
          </button>
        ))}
      </div>

      <div className="demo-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="demo-visual"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
          >
            {profiles[active].visual}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-info`}
            className="demo-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <h3>{tabs[active].name}</h3>
            <p>{profiles[active].desc[lang]}</p>
            <span className="demo-pill">{profiles[active].pill[lang]}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default ProfilesDemo;
