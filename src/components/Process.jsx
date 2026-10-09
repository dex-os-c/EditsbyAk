import { PROCESS } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import ProcessStep from './ProcessStep.jsx'
import './Process.css'

export default function Process() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="process">
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headVisible ? ' in' : ''}`}>
          <span className="kicker">How It Works</span>
          <h2>Work Process</h2>
        </div>
        <div className="process-list">
          {PROCESS.map((step) => (
            <ProcessStep key={step.num} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
