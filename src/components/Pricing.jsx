import { PRICING } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import PriceCard from './PriceCard.jsx'
import './Pricing.css'

export default function Pricing() {
  const [headRef, headVisible] = useReveal()
  const [ctaRef, ctaVisible] = useReveal()

  return (
    <section id="pricing">
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headVisible ? ' in' : ''}`}>
          <span className="kicker">Investment</span>
          <h2>Pricing</h2>
          <p className="pricing-intro">
            Every project is different — final pricing depends on duration, complexity, editing style, number of
            revisions and overall effort required.
          </p>
        </div>
        <div className="pricing-grid">
          {PRICING.map((plan, i) => (
            <PriceCard key={plan.title} plan={plan} index={i} />
          ))}
        </div>
        <p className="pricing-note-global">
          Prices shown are <strong>starting points</strong> — the final quote reflects video length, complexity,
          revisions, motion graphics and color-grading effort involved.
        </p>
        <div ref={ctaRef} className={`pricing-cta reveal${ctaVisible ? ' in' : ''}`}>
          <a href="#contact" className="btn btn-primary">Get A Quote</a>
        </div>
      </div>
    </section>
  )
}
