import './Marquee.css'

export default function Marquee({ items }) {
  // Doubled so the 50%-translate loop is seamless.
  const doubled = [...items, ...items]
  return (
    <div className="marquee">
      <div className="marquee-track" aria-hidden="true">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>
            <span className="dot" />{item}
          </span>
        ))}
      </div>
      <span className="visually-hidden">{items.join(', ')}</span>
    </div>
  )
}
