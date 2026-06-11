import { Link } from 'react-router-dom'
import { getWorkImageSrc, works } from '../data/works'
import { siteContent } from '../data/siteContent'
import './Hero.css'

function getHomeFeatureWork() {
  const availableWorks = Array.isArray(works) ? works : []
  const featuredWork = availableWorks
    .map((work, index) => ({ work, index }))
    .filter(({ work }) => work.featured)
    .sort((a, b) => {
      const aOrder = Number.isFinite(Number(a.work.featuredOrder))
        ? Number(a.work.featuredOrder)
        : Number.POSITIVE_INFINITY
      const bOrder = Number.isFinite(Number(b.work.featuredOrder))
        ? Number(b.work.featuredOrder)
        : Number.POSITIVE_INFINITY

      if (aOrder !== bOrder) {
        return aOrder - bOrder
      }

      return a.index - b.index
    })[0]?.work

  return featuredWork || availableWorks[0] || siteContent.homeFeature
}

function getFeatureImage(work) {
  const image = work?.poster || work?.image || (Array.isArray(work?.stills) ? work.stills[0] : '')
  return getWorkImageSrc(image)
}

export default function Hero() {
  const featureWork = getHomeFeatureWork()
  const imageSrc = getFeatureImage(featureWork)
  const featureContent = (
    <>
      {imageSrc && (
        <img
          className="home-feature-image"
          src={imageSrc}
          alt={featureWork.title || 'Featured work'}
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
