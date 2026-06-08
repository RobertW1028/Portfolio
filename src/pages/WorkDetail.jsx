import { Link, useParams } from 'react-router-dom'
import VimeoEmbed from '../components/VimeoEmbed'
import { getWorkBySlug, getWorkImageSrc } from '../data/works'
import './WorkDetail.css'

export default function WorkDetail() {
  const { slug } = useParams()
  const work = getWorkBySlug(slug)

  if (!work) {
    return (
      <main className="work-detail-page">
        <div className="container">
          <Link className="back-link" to="/works">返回 Works</Link>
          <div className="work-not-found">
            <h1>Work not found</h1>
            <p>没有找到这个作品，可能链接已经改变。</p>
          </div>
        </div>
      </main>
    )
  }

  const metadata = [work.year, work.duration, work.format].filter(Boolean).join(' · ')

  return (
    <main className="work-detail-page">
      <div className="container work-detail-container">
        <Link className="back-link" to="/works">返回 Works</Link>

        <VimeoEmbed work={work} />

        <header className="work-detail-header">
          <h1>{work.title}</h1>
          {metadata && <p className="work-detail-meta">{metadata}</p>}
          {work.medium && <p className="work-detail-medium">{work.medium}</p>}
        </header>

        {work.synopsis && (
          <section className="work-detail-section">
            <h2>Synopsis</h2>
            <p>{work.synopsis}</p>
          </section>
        )}

        {work.credits.length > 0 && (
          <section className="work-detail-section">
            <h2>Credits</h2>
            <ul>
              {work.credits.map((credit) => (
                <li key={credit}>{credit}</li>
              ))}
            </ul>
          </section>
        )}

        {work.stills.length > 0 && (
          <section className="work-detail-section">
            <h2>Film Stills</h2>
            <div className="stills-grid">
              {work.stills.map((still) => (
                <img key={still} src={getWorkImageSrc(still)} alt={`${work.title} still`} />
              ))}
            </div>
          </section>
        )}

        {work.screeningHistory.length > 0 && (
          <section className="work-detail-section">
            <h2>Screening History</h2>
            <ul>
              {work.screeningHistory.map((screening) => (
                <li key={screening}>{screening}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}
