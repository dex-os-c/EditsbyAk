import { useEffect, useState } from 'react'
import { CONTACT } from '../data/content'
import { fetchReviews } from '../lib/reviews'
import { useModal } from '../lib/modalStore'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon.jsx'
import ReviewForm from './ReviewForm.jsx'
import ReviewsWall from './ReviewsWall.jsx'
import './Contact.css'

export default function Contact() {
  const [headingRef, headingVisible] = useReveal()
  const [formRef, formVisible] = useReveal()
  const [wallRef, wallVisible] = useReveal()
  const { openModal } = useModal()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchReviews().then((list) => {
      if (!cancelled) {
        setReviews(list)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [])

  function handlePosted(nextList) {
    setReviews(nextList)
  }

  return (
    <section id="contact">
      <div className="container contact-grid">
        <div ref={headingRef} className={`contact-heading reveal${headingVisible ? ' in' : ''}`}>
          <h2>Have A Project In Mind?</h2>
          <p className="contact-sub">Let's turn your footage into something worth watching.</p>
          <div className="contact-detail">
            <a href={CONTACT.phoneHref}><span className="ic"><Icon name="phone" size={16} /></span> {CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}><span className="ic"><Icon name="mail" size={16} /></span> {CONTACT.email}</a>
            <div className="row"><span className="ic">📍</span> {CONTACT.location}</div>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
              <span className="ic"><Icon name="instagram" size={16} /></span> {CONTACT.instagramHandle}
            </a>
          </div>
          <button
            className="card-preview"
            onClick={() => openModal({
              title: 'AK EDITS — Visiting Card',
              desc: 'Official brand identity card.',
              thumb: '/assets/placeholder-card.svg',
              video: '',
            })}
          >
            <img src="/assets/placeholder-card.svg" alt="AK EDITS visiting card" />
            <span className="card-preview-tag">Tap to view business card</span>
          </button>
        </div>

        <div ref={formRef} className={`contact-form-wrap reveal${formVisible ? ' in' : ''}`}>
          <div className="review-form-head">
            <div className="eyebrow">Share Your Experience</div>
            <h3 className="review-form-title">Leave A Review</h3>
          </div>
          <ReviewForm onPosted={handlePosted} />
        </div>
      </div>

      <div ref={wallRef} className={wallVisible ? 'in' : ''}>
        <ReviewsWall reviews={reviews} loading={loading} />
      </div>
    </section>
  )
}
