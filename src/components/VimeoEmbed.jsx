import './VimeoEmbed.css'

function isIframeString(url) {
  return typeof url === 'string' && url.toLowerCase().includes('<iframe')
}

function getYoutubeEmbedUrl(work) {
  const url = work.youtubeEmbedUrl || ''

  if (!url || isIframeString(url)) {
    return ''
  }

  if (
    url.startsWith('https://www.youtube.com/embed/')
    || url.startsWith('https://youtube.com/embed/')
    || url.startsWith('https://www.youtube-nocookie.com/embed/')
  ) {
    return url
  }

  return ''
}

function getVimeoEmbedUrl(url) {
  if (!url || isIframeString(url)) {
    return ''
  }

  if (url.startsWith('https://player.vimeo.com/video/')) {
    return url
  }

  const match = url.match(/^https?:\/\/(?:www\.)?vimeo\.com\/(?:.*\/)?(\d+)/)
  return match ? `https://player.vimeo.com/video/${match[1]}` : ''
}

function getBilibiliEmbedUrl(url) {
  if (!url || isIframeString(url)) {
    return ''
  }

  if (url.startsWith('https://player.bilibili.com/player.html')) {
    return url
  }

  if (url.startsWith('//player.bilibili.com/player.html')) {
    return `https:${url}`
  }

  return ''
}

function getVideoEmbedUrl(work) {
  return (
    getYoutubeEmbedUrl(work)
    || getVimeoEmbedUrl(work.vimeoEmbedUrl)
    || getBilibiliEmbedUrl(work.bilibiliEmbedUrl)
  )
}

export default function VimeoEmbed({ work }) {
  const embedUrl = getVideoEmbedUrl(work)

  if (!embedUrl) {
    return null
  }

  return (
    <div className="work-video-embed">
      <iframe
        src={embedUrl}
        title={`${work.title} video`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
