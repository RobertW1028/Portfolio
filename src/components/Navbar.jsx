import { Link, NavLink } from 'react-router-dom'
import { siteContent } from '../data/siteContent'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link className="navbar-logo" to="/">
            {siteContent.name}
          </Link>
          {siteContent.brandIcon && (
            <Link className="navbar-icon-link" to="/" aria-label={`${siteContent.name} home`}>
              <img
                className="navbar-icon"
                src={siteContent.brandIcon}
                alt=""
                aria-hidden="true"
              />
            </Link>
          )}
          <ul className="nav-links">
            <li><NavLink to="/works">Works</NavLink></li>
            <li><NavLink to="/about">Bio</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
