import WorkCard from '../components/WorkCard'
import { works } from '../data/works'
import './ContentPage.css'
import './AllWorksPage.css'

export default function AllWorksPage() {
  return (
    <main className="page-shell works-page">
      <h1 className="page-title">Works</h1>
      <section className="page-content works-content">
        {works.length > 0 ? (
          <div className="works-grid">
            {works.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        ) : (
          <p className="works-empty">Works coming soon.</p>
        )}
      </section>
    </main>
  )
}
