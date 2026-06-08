import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getWorkPosterSrc } from '../data/works'
import './Works.css'

export default function WorkCard({ work }) {
  const [imageFailed, setImageFailed] = useState(false)
  const posterSrc = getWorkPosterSrc(work)
  const meta = [work.year, work.duration || work.format].filter(Boolean).join(' · ')

  return (
    <article className="work-item">
      <Link className="work-card-link" to={`/works/${work.slug}`}>
        <div className="work-image">
          {!imageFailed && posterSrc ? (
            <img
              src={posterSrc}
              alt={work.title}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="work-image-placeholder">
              <span>{work.title}</span>
            </div>
          )}
        </div>
        <div className="work-info">
          <h3>{work.title}</h3>
          <p className="work-meta">{meta}</p>
          {work.format && <p>{work.format}</p>}
        </div>
      </Link>
    </article>
  )
}
