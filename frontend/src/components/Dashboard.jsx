import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Health Reflection Tool",
    desc: "Review your daily vitals with simple explanations grounded in your routine.",
    icon: "O",
    route: "/health-reflection",
    tag: "Vitals",
    subtext: "See patterns in blood pressure, heart rate, oxygen, and everyday lifestyle habits.",
  },
  {
    title: "Report Simplifier",
    desc: "Upload reports and receive clear AI-driven explanations.",
    icon: "[]",
    route: "/report",
    tag: "AI Insights",
    subtext: "Understand difficult medical terms in plain language without leaving the dashboard.",
  },
  {
    title: "Doctor Visit Prep",
    desc: "Organize medications, log symptoms, and prepare for your appointment.",
    icon: "~",
    route: "/doctor-visit-prep",
    tag: "Preparation",
    subtext: "Generate a comprehensive summary to share with your doctor.",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Welcome to your dashboard</h2>

      <div className="card-grid">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="dashboard-card-wrap"
            style={{ width: "100%", height: "100%" }}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <motion.div
              className="dashboard-orbit"
              animate={{
                x: [0, 16, 0],
                y: [0, -10, 0],
                opacity: [0.35, 0.7, 0.35],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <article
              onClick={() => navigate(card.route)}
              className="dashboard-card"
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(card.route);
                }
              }}
            >
              <motion.div
                className="dashboard-card-glow"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <div className="dashboard-card-content">
                <div className="dashboard-card-main">
                  <motion.div
                    className="card-icon"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="dashboard-card-icon">{card.icon}</span>
                  </motion.div>

                  <span className="dashboard-chip">{card.tag}</span>

                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-desc">{card.desc}</p>
                </div>

                <div className="dashboard-card-footer">
                  <p className="dashboard-subtext">{card.subtext}</p>
                  <span className="dashboard-link">
                    Open feature
                    <span className="dashboard-link-arrow" aria-hidden="true">
                      {"->"}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
