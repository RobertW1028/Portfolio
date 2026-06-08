import works from './works.json'

export { works }

export function getWorkImageSrc(image) {
  if (!image) {
    return ''
  }

  if (image.startsWith('/')) {
    return image
  }

  return `/images/works/${image}`
}

export function getWorkPosterSrc(work) {
  return getWorkImageSrc(work.poster || work.image)
}

export function getWorkVideoSrc(video) {
  if (!video) {
    return ''
  }

  if (video.startsWith('/')) {
    return video
  }

  return `/videos/works/${video}`
}

export function getWorkBySlug(slug) {
  return works.find((work) => work.slug === slug)
}

export function getFeaturedWorks(limit = 6) {
  return works
    .map((work, index) => ({ work, index }))
    .filter(({ work }) => work.featured)
    .sort((a, b) => {
      const aOrder = Number.isFinite(Number(a.work.featuredOrder))
        ? Number(a.work.featuredOrder)
        : Number.POSITIVE_INFINITY
      const bOrder = Number.isFinite(Number(b.work.featuredOrder))
        ? Number(b.work.featuredOrder)
        : Number.POSITIVE_INFINITY

      if (aOrder !== bOrder) {
        return aOrder - bOrder
      }

      return a.index - b.index
    })
    .slice(0, limit)
    .map(({ work }) => work)
}
