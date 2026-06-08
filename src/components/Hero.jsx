import { Link } from 'react-router-dom'
import { siteContent } from '../data/siteContent'
import './Hero.css'

export default function Hero() {
  return (
    <main className="hero">
      <div className="container">
        <section className="hero-content" aria-label="首页介绍">
          <p className="hero-kicker">{siteContent.siteTitle}</p>
          <h1 className="hero-name">{siteContent.name}</h1>
          <p className="hero-title">{siteContent.tagline}</p>
          <p className="hero-description">{siteContent.intro}</p>
          <div className="hero-actions">
            <Link className="hero-cta" to="/works">Works</Link>
            <div className="hero-secondary-links">
              <Link to="/about">Bio</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
