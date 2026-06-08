import { siteContent } from '../data/siteContent'
import './Contact.css'

export default function Contact() {
  const { contact } = siteContent

  return (
    <section className="contact">
      <div className="container">
        <h1 className="section-title">Contact</h1>
        <div className="contact-content contact-content-simple">
          <div className="contact-info">
            <div className="info-item">
              <h2>Email</h2>
              <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
            </div>
            <div className="info-item">
              <h2>Social</h2>
              <div className="social-links">
                {contact.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="contact-note">
            For collaborations, exhibitions, or project inquiries, please contact me via email or social media.
          </p>
        </div>
      </div>
    </section>
  )
}
