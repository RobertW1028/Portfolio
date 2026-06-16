import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getWorkCoverSrc } from '../data/works'
import './Works.css'

export default function WorkCard({ work }) {
  const [imageFailed, setImageFailed] = useState(false)
  const posterSrc = getWorkCoverSrc(work)
  const hasDetailPage = Boolean(work.slug)
  const CardElement = hasDetailPage ? Link : 'div'
  const cardProps = hasDetailPage ? { to: `/works/${work.slug}` } : {}

  return (
    <article className="work-item">
      <CardElement className="work-card-link" {...cardProps}>
        <div className="work-image">
          {!imageFailed && posterSrc ? (
            <img
              src={posterSrc}
              alt={work.title}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="work-image-placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="work-info">
          <h3>{work.title}</h3>
          <p>{work.year}</p>
        </div>
      </CardElement>
    </article>
  )
}
