import { siteContent } from '../data/siteContent'
import './About.css'

export default function About() {
  const { about } = siteContent
  const paragraphs = about.paragraphs.filter((paragraph) => paragraph.trim())
  const portraitSrc = about.portraitImage
    ? about.portraitImage.startsWith('/')
      ? about.portraitImage
      : `/images/profile/${about.portraitImage}`
    : ''

  const contentSections = []

  if (paragraphs[0]) {
    contentSections.push({
      title: 'Bio',
      paragraphs: [paragraphs[0]],
    })
  }

  if (paragraphs.length > 1) {
    contentSections.push({
      title: 'Artist statement',
      paragraphs: paragraphs.slice(1),
    })
  }

  return (
    <>
      <div className="about-copy">
        {contentSections.map((section) => (
          <section className="about-section" key={section.title}>
            <h3>{section.title}</h3>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
      <div className="about-portrait-wrap" aria-label="Portrait">
        {portraitSrc ? (
          <img className="about-portrait" src={portraitSrc} alt={about.heading || siteContent.name} />
        ) : (
          // TEMP: about portrait placeholder, replace with real portrait later.
          <div className="about-portrait about-portrait-placeholder" aria-hidden="true" />
        )}
      </div>
    </>
  )
}
