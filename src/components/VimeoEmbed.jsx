import { getWorkPosterSrc } from '../data/works'
import './VimeoEmbed.css'

export default function VimeoEmbed({ work }) {
  if (work.vimeoEmbedUrl) {
    return (
      <div className="vimeo-embed">
        <iframe
          src={work.vimeoEmbedUrl}
          title={work.title}
          allow="fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )
  }

  return (
    <div className="vimeo-placeholder">
      <img src={getWorkPosterSrc(work)} alt={work.title} />
      <p>Video coming soon</p>
    </div>
  )
}
