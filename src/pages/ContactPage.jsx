import { Link } from 'react-router-dom'
import Contact from '../components/Contact'
import './ContentPage.css'

export default function ContactPage() {
  return (
    <main className="content-page">
      <div className="container">
        <Link className="back-link" to="/">Home</Link>
      </div>
      <Contact />
    </main>
  )
}
