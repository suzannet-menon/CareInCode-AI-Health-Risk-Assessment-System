import { text } from '../content/text'

function Footer({ lang }) {
  const t = text[lang]
  return (
    <footer className="footer">
      <div className="footer-logo">CareInCode</div>
      <div className="footer-note">{t.footerNote}</div>
      <div className="footer-links">
        <a href="#">{t.footerPrivacy}</a>
        <a href="#">{t.footerAbout}</a>
        <a href="#">{t.footerContact}</a>
      </div>
    </footer>
  )
}

export default Footer