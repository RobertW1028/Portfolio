import About from '../components/About'
import './ContentPage.css'

export default function AboutPage() {
  return (
    <main className="page-shell about-page">
      <h1 className="page-title">About</h1>
      <section className="page-content about-content">
        <About />
      </section>
    </main>
  )
}
