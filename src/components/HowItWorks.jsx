import { motion } from 'framer-motion'
import { text } from '../content/text'

function HowItWorks({ lang }) {
  const t = text[lang]
  const steps = [
    { title: t.step1Title, desc: t.step1Desc, num: '1' },
    { title: t.step2Title, desc: t.step2Desc, num: '2' },
    { title: t.step3Title, desc: t.step3Desc, num: '3' },
  ]
  return (
    <motion.section
      className="how-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="section-label">{t.howLabel}</div>
      <div className="section-title">{t.howTitle}</div>
      <div className="steps">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className={`step ${i === 0 ? 'active' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="step-circle">{step.num}</div>
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default HowItWorks