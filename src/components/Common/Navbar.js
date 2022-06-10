import React from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className={matchPath("/", pathname) ? 'nav-link active' : 'nav-link'} to="/">Home</NavLink>
            <NavLink className={matchPath("/driver/*", pathname) ? 'nav-link active' : 'nav-link'} to="/driver/list">Drivers</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar