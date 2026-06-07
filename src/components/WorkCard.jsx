import { useState } from 'react'
import { getWorkImageSrc, getWorkVideoSrc } from '../data/works'
import './Works.css'

export default function WorkCard({ work, allowVideoPlayback = false }) {
  const [imageFailed, setImageFailed] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const imageSrc = getWorkImageSrc(work.image)
  const videoSrc = getWorkVideoSrc(work.video)
  const isVideo = work.mediaType === 'video'
  const canPlayVideo = isVideo && allowVideoPlayback && videoSrc && !videoFailed

  return (
    <article className="work-item">
      <div className="work-image">
        {canPlayVideo ? (
          <video
            className="work-video"
            controls
            preload="metadata"
            poster={imageSrc}
            onError={() => setVideoFailed(true)}
          >
            <source src={videoSrc} type="video/mp4" />
            你的浏览器暂时不能播放这个视频。
          </video>
        ) : !imageFailed && imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={work.title}
              onError={() => setImageFailed(true)}
            />
            {isVideo && <span className="media-badge">Video</span>}
          </>
        ) : (
          <div className="work-image-placeholder">
            <span>{work.title}</span>
            {isVideo && <span className="media-badge media-badge-placeholder">Video</span>}
          </div>
        )}
      </div>
      <div className="work-info">
        <h3>{work.title}</h3>
        <p className="work-meta">
          {work.year} · {work.medium}
        </p>
        <p>{work.description}</p>
      </div>
    </article>
  )
}
