import { siteContent } from '../data/siteContent'
import './Contact.css'

function getInstagramHandle(link) {
  if (!link) {
    return ''
  }

  if (link.handle) {
    return link.handle
  }

  if (!link.url) {
    return ''
  }

  const handle = link.url
    .replace(/^https?:\/\/(www\.)?instagram\.com\//, '')
    .replace(/^@/, '')
    .replace(/\/$/, '')

  return handle ? `@${handle}` : ''
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  )
}

export default function Contact() {
  const { contact } = siteContent
  const socialLinks = Array.isArray(contact.socialLinks) ? contact.socialLinks : []
  const instagramLink = socialLinks.find(
    (link) => link.label?.toLowerCase() === 'instagram' && link.url && link.url !== '#',
  )
  const instagramHandle = getInstagramHandle(instagramLink)

  return (
    <>
      <div className="contact-left">
        {instagramLink && (
          <div className="contact-row">
            <a
              className="contact-instagram"
              href={instagramLink.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
              {instagramHandle && <span>{instagramHandle}</span>}
            </a>
          </div>
        )}

        {contact.email && (
          <div className="contact-row contact-email-block">
            <p className="contact-label">Email</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        )}
      </div>

      <div className="contact-right">
        {contact.contactMessage && <p>{contact.contactMessage}</p>}
      </div>
    </>
  )
}
