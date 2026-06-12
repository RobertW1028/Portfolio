import { Link } from 'react-router-dom'
import { siteContent } from '../data/siteContent'
import './Hero.css'

function getFeatureImage(feature) {
  const image = feature?.image || ''

  if (!image) {
    return ''
  }

  return image.startsWith('/') ? image : `/images/home/${image}`
}

export default function Hero() {
  const featureWork = siteContent.homeFeature
  const imageSrc = getFeatureImage(featureWork)
  const featureContent = (
    <>
      {imageSrc && (
        <img
          className="home-feature-image"
          src={imageSrc}
          alt={featureWork.alt || featureWork.title || 'Featured work'}
        />
      )}
      <div className="home-feature-meta">
        <span className="home-feature-title">{featureWork.title}</span>
        <span className="home-feature-year">{featureWork.year}</span>
      </div>
    </>
  )

  return (
    <main className="home">
      <section className="home-feature" aria-label="Featured work">
        {featureWork.slug ? (
          <Link className="home-feature-link" to={`/works/${featureWork.slug}`}>
            {featureContent}
          </Link>
        ) : (
          <div className="home-feature-link">
            {featureContent}
          </div>
        )}
      </section>
    </main>
  )
}
