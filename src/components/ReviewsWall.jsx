import { starRating } from '../lib/stars'
import { useReveal } from '../hooks/useReveal'

function ReviewCard({ review }) {
  const [ref, visible] = useReveal()
  const stars = starRating(review.rating)
  const date = review.date
    ? new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''

  return (
    <div ref={ref} className={`review-card${visible ? ' in' : ''}`}>
      <div className="review-stars">{stars.filled}<span className="dim">{stars.dim}</span></div>
      <p className="review-comment">{review.comment}</p>
      <div className="review-meta">
        <span className="review-name">{review.name}</span>
        <span>{date}</span>
      </div>
    </div>
  )
}

export default function ReviewsWall({ reviews, loading }) {
  const sorted = [...reviews].sort((a, b) => (b.date || 0) - (a.date || 0))
  const avg = reviews.length ? reviews.reduce((s, r) => s + Number(r.rating), 0) / reviews.length : 0
  const avgStars = starRating(avg)

  return (
    <div className="container reviews-wall">
      <div className="section-head" style={{ marginBottom: '2rem' }}>
        <span className="kicker">What Clients Say</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>Client Reviews</h2>
        {reviews.length > 0 && (
          <div className="reviews-summary">
            <span className="avg-stars">{avgStars.filled}<span className="dim">{avgStars.dim}</span></span>
            {avg.toFixed(1)} out of 5 · {reviews.length} review{reviews.length === 1 ? '' : 's'}
          </div>
        )}
      </div>
      {loading ? null : reviews.length === 0 ? (
        <p className="reviews-empty">No reviews yet — be the first to leave one above.</p>
      ) : (
        <div className="reviews-grid">
          {sorted.map((r) => <ReviewCard key={r.id || r.date} review={r} />)}
        </div>
      )}
    </div>
  )
}
