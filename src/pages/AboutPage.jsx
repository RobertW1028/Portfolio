import { Link } from 'react-router-dom'
import About from '../components/About'
import './ContentPage.css'

export default function AboutPage() {
  return (
    <main className="content-page">
      <div className="container">
        <Link className="back-link" to="/">Home</Link>
      </div>
      <About />
    </main>
  )
}
