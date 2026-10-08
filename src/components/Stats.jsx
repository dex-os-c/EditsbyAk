import { STATS } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import StatCard from './StatCard.jsx'
import './Stats.css'

export default function Stats() {
  const [ref, visible] = useReveal({ threshold: 0.4 })

  return (
    <section id="stats" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} start={visible} />
          ))}
        </div>
        <p className="stats-note">
          Reels start from <strong>₹200</strong>. Final pricing depends on video length, complexity, editing requirements and overall effort.
        </p>
      </div>
    </section>
  )
}
