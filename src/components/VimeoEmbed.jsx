import './VimeoEmbed.css'

function getVimeoEmbedUrl(url) {
  if (!url) {
    return ''
  }

  if (url.startsWith('https://player.vimeo.com/video/')) {
    return url
  }

  const match = url.match(/^https?:\/\/(?:www\.)?vimeo\.com\/(?:.*\/)?(\d+)/)
  return match ? `https://player.vimeo.com/video/${match[1]}` : ''
}

export default function VimeoEmbed({ work }) {
  const embedUrl = getVimeoEmbedUrl(work.vimeoEmbedUrl)

  if (!embedUrl) {
    return (
      // TEMP: layout placeholder, remove after content is added.
      <div className="vimeo-placeholder" aria-label="Video placeholder" />
    )
  }

  return (
    <div className="vimeo-embed">
      <iframe
        src={embedUrl}
        title={`${work.title} video`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
