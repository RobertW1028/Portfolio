import About from '../components/About'
import './ContentPage.css'

export default function AboutPage() {
  return (
    <main className="page-shell bio-page">
      <h1 className="page-title">Bio</h1>
      <section className="page-content bio-content">
        <About />
      </section>
    </main>
  )
}
