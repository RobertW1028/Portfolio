import { useMemo, useState } from 'react'
import WorkCard from '../components/WorkCard'
import { works } from '../data/works'
import './AllWorksPage.css'

const categoryLabels = {
  all: 'All',
  film: 'Film',
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
          <h1>Works</h1>
          <p>
            Selected film and video projects.
          </p>
        </div>
      </section>

      <section className="works all-works-section">
        <div className="container">
          <div className="category-filters" aria-label="Work category filters">
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
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
