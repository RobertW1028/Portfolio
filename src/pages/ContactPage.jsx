import Contact from '../components/Contact'
import './ContentPage.css'

export default function ContactPage() {
  return (
    <main className="page-shell contact-page">
      <h1 className="page-title">Contact</h1>
      <section className="page-content contact-content">
        <Contact />
      </section>
    </main>
  )
}
