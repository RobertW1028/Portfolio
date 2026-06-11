import { Link, useParams } from 'react-router-dom'
import VimeoEmbed from '../components/VimeoEmbed'
import { getWorkBySlug, getWorkImageSrc } from '../data/works'
import './WorkDetail.css'

function getWorkMeta(work) {
  return [work.format, work.duration, work.year, work.medium]
    .filter(Boolean)
    .join(', ')
}

function getSynopsisParagraphs(work) {
  return [work.synopsis, work.description]
    .filter(Boolean)
    .filter((text, index, list) => list.indexOf(text) === index)
}

function getCredits(credits) {
  if (Array.isArray(credits)) {
    return credits.filter(Boolean)
  }

  if (typeof credits === 'string') {
    return credits ? [credits] : []
  }

  if (typeof credits === 'object') {
    return Object.entries(credits)
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
  }

  return []
}

function getStillImages(work) {
  const stills = Array.isArray(work.stills) ? work.stills.filter(Boolean) : []

  if (stills.length > 0) {
    return stills
  }

  return [work.poster || work.image].filter(Boolean)
}

function getScreeningHistory(screeningHistory) {
  return Array.isArray(screeningHistory) ? screeningHistory.filter(Boolean) : []
}

export default function WorkDetail() {
  const { slug } = useParams()
  const work = getWorkBySlug(slug)

  if (!work) {
    return (
      <main className="work-detail-page">
        <article className="work-detail-inner work-not-found">
          <h1>Work not found</h1>
          <Link to="/works">Back to Works</Link>
        </article>
      </main>
    )
  }

  const metadata = getWorkMeta(work)
  const synopsisParagraphs = getSynopsisParagraphs(work)
  const credits = getCredits(work.credits)
  const stills = getStillImages(work)
  const screeningHistory = getScreeningHistory(work.screeningHistory)

  return (
    <main className="work-detail-page">
      <article className="work-detail-inner">
        <header className="work-detail-header">
          <h1>{work.title}</h1>
          {metadata && <p>{metadata}</p>}
        </header>

        <VimeoEmbed work={work} />

        {synopsisParagraphs.length > 0 && (
          <section className="work-detail-section work-synopsis">
            <h2>Synopsis</h2>
            {synopsisParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        )}

        {credits.length > 0 && (
          <section className="work-detail-section">
            <h2>Credits</h2>
            <ul>
              {credits.map((credit) => (
                <li key={credit}>{credit}</li>
              ))}
            </ul>
          </section>
        )}

        {stills.length > 0 && (
          <section className="work-detail-section work-stills">
            <h2>Film stills</h2>
            <div className="work-stills-grid">
              {stills.map((still) => (
                <img key={still} src={getWorkImageSrc(still)} alt={`${work.title} still`} />
              ))}
            </div>
          </section>
        )}

        {screeningHistory.length > 0 && (
          <section className="work-detail-section">
            <h2>Screening history</h2>
            <ul>
              {screeningHistory.map((screening) => (
                <li key={screening}>{screening}</li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  )
}
