import { Link } from 'react-router-dom'
import { siteContent } from '../data/siteContent'
import { works } from '../data/works'
import './Hero.css'

function getFeatureImage(feature) {
  const image = feature?.image || ''

  if (!image) {
    return ''
  }

  return image.startsWith('/') ? image : `/images/home/${image}`
}

function getFeaturedOrder(work) {
  const order = Number(work.featuredOrder)
  return Number.isFinite(order) ? order : Number.POSITIVE_INFINITY
}

function getHomeFeaturedWork(worksList, content) {
  if (!Array.isArray(worksList) || worksList.length === 0) {
    return null
  }

  const homeFeature = content?.homeFeature
  const configuredSlug = content?.homeFeatureWorkSlug || homeFeature?.workSlug

  if (configuredSlug) {
    const matchedWork = worksList.find((work) => work.slug === configuredSlug)
    if (matchedWork) {
      return matchedWork
    }
  }

  const featuredWork = worksList
    .map((work, index) => ({ work, index }))
    .filter(({ work }) => work.featured)
    .sort((a, b) => {
      const orderDifference = getFeaturedOrder(a.work) - getFeaturedOrder(b.work)
      return orderDifference || a.index - b.index
    })[0]?.work

  return featuredWork || worksList[0]
}

export default function Hero() {
  const homeFeature = siteContent.homeFeature
  const featuredWork = getHomeFeaturedWork(works, siteContent)
  const imageSrc = getFeatureImage(homeFeature) || '/images/home/home-still.jpg'
  const title = featuredWork?.title || homeFeature?.fallbackTitle || ''
  const year = featuredWork?.year || featuredWork?.date || homeFeature?.fallbackYear || ''
  const detailPath = featuredWork?.slug ? `/works/${featuredWork.slug}` : null
  const featureContent = (
    <>
      {imageSrc && (
        <img
          className="home-feature-image"
          src={imageSrc}
          alt={homeFeature?.alt || title || 'Featured work'}
        />
      )}
      <div className="home-feature-meta">
        <span className="home-feature-title">{title}</span>
        <span className="home-feature-year">{year}</span>
      </div>
    </>
  )

  return (
    <main className="home">
      <section className="home-feature" aria-label="Featured work">
        {detailPath ? (
          <Link className="home-feature-link" to={detailPath}>
            {featureContent}
          </Link>
        ) : (
          <div>
            {featureContent}
          </div>
        )}
      </section>
    </main>
  )
}
