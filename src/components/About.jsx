import { siteContent } from '../data/siteContent'
import './About.css'

export default function About() {
  const { about } = siteContent

  return (
    <section className="about">
      <div className="container">
        <h1 className="section-title">Bio</h1>
        <div className="about-content">
          <div className="about-text">
            <h2>{about.heading}</h2>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
