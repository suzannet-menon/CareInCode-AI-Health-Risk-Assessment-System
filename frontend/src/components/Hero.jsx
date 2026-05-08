import { motion } from 'framer-motion'
import { text } from '../content/text'
import HeroDemoAnimation from './HeroDemoAnimation'
import '../Herodemo.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay }
})

function Hero({ lang }) {
  const t = text[lang]
  return (
    <section className="hero hero-split">
      <div className="hero-bg">
        <HeroDemoAnimation />
      </div>
      <div className="hero-glow" />
      <div className="hero-content">
        <motion.div {...fadeUp(0.1)}>
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            <span>{t.heroTag}</span>
          </div>
        </motion.div>
        <motion.h1 {...fadeUp(0.2)}>
           {t.heroH1Part1}
           <br />
           <em>{t.heroH1Em}</em>
           </motion.h1>
        <motion.p className="hero-sub" {...fadeUp(0.3)}>{t.heroSub}</motion.p>
        <motion.div className="hero-actions" {...fadeUp(0.4)}>
          <button className="btn-primary">{t.heroCTA}</button>
          <button className="btn-ghost" onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}>
            <span className="play-icon">▶</span>
            {t.heroSeeHow}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero