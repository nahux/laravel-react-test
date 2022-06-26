import React, { useState } from 'react'
import { NavLink, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext';

const Navbar = () => {
  const { pathname } = useLocation();
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/auth/login');
    } catch (loginError) {
      console.error(loginError);
      setError('Failed to logout ' + loginError)
    }
    
  }

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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {currentUser ?
              (
                <React.Fragment>
                  <span className='nav-link'>{currentUser.email}</span>
                  <a className='nav-link' href='#' onClick={handleLogout}>Logout</a>
                </React.Fragment>
              ) :
              (
                <NavLink className={matchPath("/auth/login", pathname) ? 'nav-link active' : 'nav-link'} to="/auth/login">Login</NavLink>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar