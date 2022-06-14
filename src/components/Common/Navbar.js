import React from 'react'
import { NavLink, matchPath, useLocation, useNavigate, Link } from 'react-router-dom'
import apiClient from '../../services/apiClient';
import { IsLoggedIn, LogOut } from '../../services/auth';

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = IsLoggedIn();

  const logout = () => {
    apiClient.post('/logout')
      .then((response) => {
        LogOut();
        console.log('Logged out successfully!', response)
        navigate('/login');
      })
      .catch((error) => {
        console.log(error)
      })
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
            {
              isLoggedIn ?
                (<NavLink className={matchPath("/driver/*", pathname) ? 'nav-link active' : 'nav-link'} to="/driver/list">Drivers</NavLink>)
              : null
            }
          </div>
        </div>
        <div className="nav navbar-nav navbar-right">
          {
            isLoggedIn ? <Link className="nav-link" onClick={logout} to="#">Logout</Link>
            : <NavLink className={matchPath("/login", pathname) ? 'nav-link float-end active' : 'nav-link float-end'} to="/login">Login</NavLink>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar