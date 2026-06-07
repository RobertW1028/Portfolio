import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import WorkCard from '../components/WorkCard'
import { works } from '../data/works'
import './AllWorksPage.css'

const categoryLabels = {
  all: '全部',
  painting: 'Painting',
  photography: 'Photography',
  installation: 'Installation',
  video: 'Video',
  other: 'Other',
}

export default function AllWorksPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = useMemo(() => {
    const existingCategories = works.map((work) => work.category).filter(Boolean)
    return ['all', ...new Set(existingCategories)]
  }, [])

  const visibleWorks =
    activeCategory === 'all'
      ? works
      : works.filter((work) => work.category === activeCategory)

  return (
    <main className="all-works-page">
      <section className="all-works-hero">
        <div className="container">
          <Link className="back-link" to="/">返回首页</Link>
          <h1>作品</h1>
          <p>
            这里收录作品列表。你可以通过分类查看绘画、摄影、装置、影像和其他项目。
          </p>
        </div>
      </section>

      <section className="works all-works-section">
        <div className="container">
          <div className="category-filters" aria-label="作品分类筛选">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={category === activeCategory ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {categoryLabels[category] || category}
              </button>
            ))}
          </div>

          <div className="works-grid">
            {visibleWorks.map((work) => (
              <WorkCard key={work.id} work={work} allowVideoPlayback />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
