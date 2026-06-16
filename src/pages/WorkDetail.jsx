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
  const texts = [work.synopsis, work.description]
    .filter(Boolean)
    .filter((text, index, list) => list.indexOf(text) === index)
  
  // 把每个文本按段落分割
  return texts.flatMap(text => 
    text.split('\n\n').map(para => para.trim()).filter(Boolean)
  )
}

function getFilmmakerStatement(work) {
  const statement = work.filemakerStatement || ''
  if (!statement.trim()) return []
  
  // 把 statement 按段落分割
  return statement.split('\n\n').map(para => para.trim()).filter(Boolean)
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

function getPoster(work) {
  return work.poster || work.image ? [work.poster || work.image] : []
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
  const filemakerStatement = getFilmmakerStatement(work)
  const credits = getCredits(work.credits)
  const poster = getPoster(work)
  const stills = getStillImages(work)
  const screeningHistory = getScreeningHistory(work.screeningHistory)

  return (
    <main className="work-detail-page">
      <article className="work-detail-inner">
        <header className="work-detail-header">
          <h1 className="work-detail-title">{work.title}</h1>
          {metadata && <p className="work-detail-meta">{metadata}</p>}
        </header>

        <VimeoEmbed work={work} />

        {synopsisParagraphs.length > 0 && (
          <section className="work-detail-section work-synopsis">
            <h2 className="work-section-title">Synopsis</h2>
            {synopsisParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        )}

        {filemakerStatement.length > 0 && (
          <section className="work-detail-section work-filmmaker-statement">
            <h2 className="work-section-title">Filmmaker Statement</h2>
            {filemakerStatement.map((statement) => (
              <p key={statement}>{statement}</p>
            ))}
          </section>
        )}

        {credits.length > 0 && (
          <section className="work-detail-section">
            <h2 className="work-section-title">Credits</h2>
            <ul>
              {credits.map((credit) => (
                <li key={credit}>{credit}</li>
              ))}
            </ul>
          </section>
        )}

        {poster.length > 0 && (
          <section className="work-detail-section work-poster">
            <h2 className="work-section-title">Poster</h2>
            <div className="work-poster-container">
              {poster.map((posterImg) => (
                <img key={posterImg} src={getWorkImageSrc(posterImg)} alt={`${work.title} poster`} />
              ))}
            </div>
          </section>
        )}

        {stills.length > 0 && (
          <section className="work-detail-section work-stills">
            <h2 className="work-section-title">Film stills</h2>
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
