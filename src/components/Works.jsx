import { Link } from 'react-router-dom'
import { getFeaturedWorks } from '../data/works'
import WorkCard from './WorkCard'
import './Works.css'

const FEATURED_WORKS_COUNT = 6

export default function Works() {
  const featuredWorks = getFeaturedWorks(FEATURED_WORKS_COUNT)

  return (
    <section id="works" className="works">
      <div className="container">
        <h2 className="section-title">精选作品</h2>
        <div className="works-grid">
          {featuredWorks.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
        <div className="works-actions">
          <Link className="works-toggle" to="/works">
            查看全部作品
          </Link>
        </div>
      </div>
    </section>
  )
}
