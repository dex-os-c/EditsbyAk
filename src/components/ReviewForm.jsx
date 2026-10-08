import { Fragment, useState } from 'react'
import { postReview } from '../lib/reviews'
import Icon from './Icon.jsx'

const STAR_VALUES = [5, 4, 3, 2, 1]

export default function ReviewForm({ onPosted }) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [posted, setPosted] = useState(false)

  function validate() {
    const next = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    if (!rating) next.rating = 'Please select a star rating.'
    if (!comment.trim()) next.comment = 'Please share a few words about your experience.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const next = await postReview({ name: name.trim(), rating: Number(rating), comment: comment.trim() })
      onPosted?.(next)
      setPosted(true)
    } catch {
      setErrors({ form: 'Something went wrong posting your review. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (posted) {
    return (
      <div className="form-success show">
        <div className="check-circle"><Icon name="check" size={26} strokeWidth={2.5} /></div>
        <h3>Thank You</h3>
        <p>Your review has been posted publicly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'review-name-error' : undefined}
        />
        {errors.name && <p className="field-error" id="review-name-error">{errors.name}</p>}
      </div>

      <div className="star-input">
        <fieldset>
          <legend>Your Rating</legend>
          {/* <Fragment> doesn't add a DOM wrapper, so input and label stay
              true siblings -- required for the CSS to light up every star
              from the hovered one up to 5 via a general sibling selector
              (input:checked ~ label, label:hover ~ label). Wrapping the
              input inside its label instead would break that. */}
          {STAR_VALUES.map((v) => (
            <Fragment key={v}>
              <input
                type="radio"
                id={`star${v}`}
                name="rating"
                value={v}
                checked={rating === String(v)}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor={`star${v}`}>★</label>
            </Fragment>
          ))}
        </fieldset>
        {errors.rating && <p className="field-error">{errors.rating}</p>}
      </div>

      <div>
        <textarea
          placeholder="Tell others about your experience working with AK EDITS"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={errors.comment ? 'review-comment-error' : undefined}
        />
        {errors.comment && <p className="field-error" id="review-comment-error">{errors.comment}</p>}
      </div>

      {errors.form && <p className="field-error">{errors.form}</p>}

      <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
        {submitting ? 'Posting...' : 'Post Review'}
      </button>
      <p className="review-form-note">Your review will be publicly visible to everyone who visits this site.</p>
    </form>
  )
}
