import { SHOWCASE_REEL } from '../data/content'
import { useModal } from '../lib/modalStore'
import Icon from './Icon.jsx'
import './Showcase.css'

export default function Showcase() {
  const { openModal } = useModal()

  return (
    <section id="showcase">
      <div className="showcase-inner">
        <div className="showcase-bg" style={{ backgroundImage: 'url(/assets/placeholder-profile.svg)' }} />
        <div className="showcase-content">
          <h2>Watch The Work. <span style={{ color: 'var(--crimson-bright)' }}>Feel The Story.</span></h2>
          <button
            className="showcase-play"
            onClick={() => openModal(SHOWCASE_REEL)}
            aria-label="Play showcase reel"
          >
            <Icon name="play" size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}
