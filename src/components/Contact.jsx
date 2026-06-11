import { siteContent } from '../data/siteContent'
import './Contact.css'

export default function Contact() {
  const { contact } = siteContent
  const socialLinks = contact.socialLinks.filter((link) => link.label && link.url && link.url !== '#')

  return (
    <div className="contact-info">
      <div className="info-item">
        <h2>Email</h2>
        <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
      </div>
      {socialLinks.map((link) => (
        <div className="info-item" key={link.label}>
          <h2>{link.label}</h2>
          <p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          </p>
        </div>
      ))}
    </div>
  )
}
