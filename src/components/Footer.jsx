import { CONTACT } from '../data/content'
import Icon from './Icon.jsx'
import './Footer.css'

// Computed once at module load, outside the component -- reading the system
// clock during render is an impure operation the React Compiler flags, and
// the copyright year only needs to be correct per page load anyway.
const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo"><span className="a">A</span>K EDITS</div>
      <div className="footer-tagline">VISUALS THAT TELL STORIES</div>
      <div className="footer-details">
        <span>{CONTACT.phone}</span>
        <span>{CONTACT.email}</span>
        <span>{CONTACT.location}</span>
      </div>
      <div className="footer-socials">
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Icon name="instagram" size={18} />
        </a>
        <a href={`mailto:${CONTACT.email}`} aria-label="Email">
          <Icon name="mail" size={18} />
        </a>
        <a href={CONTACT.phoneHref} aria-label="Phone">
          <Icon name="phone" size={18} />
        </a>
      </div>
      <div className="footer-bottom">© {CURRENT_YEAR} AK EDITS. All Rights Reserved.</div>
    </footer>
  )
}
