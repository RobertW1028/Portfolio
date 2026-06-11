import { siteContent } from '../data/siteContent'
import './About.css'

export default function About() {
  const { about } = siteContent
  const paragraphs = about.paragraphs.filter((paragraph) => paragraph.trim())
  const portraitSrc = about.portraitImage
    ? about.portraitImage.startsWith('/')
      ? about.portraitImage
      : `/images/bio/${about.portraitImage}`
    : ''

  return (
    <>
      <div className="bio-portrait-wrap" aria-label="Portrait">
        {portraitSrc ? (
          <img className="bio-portrait" src={portraitSrc} alt={about.heading || siteContent.name} />
        ) : (
          // TEMP: bio portrait placeholder, replace with real portrait later.
          <div className="bio-portrait bio-portrait-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="bio-copy">
        {about.heading && <h2>{about.heading}</h2>}
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </>
  )
}
