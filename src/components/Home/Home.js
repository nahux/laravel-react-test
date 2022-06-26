import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import './Home.css';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className='home-container'>
      <div className='home-link-container'>
        <NavLink to="/" className='home-box-link flex-g-1'>
          Home
        </NavLink>
        {currentUser && (
          <NavLink to="/driver/list" className='home-box-link flex-g-2'>
            Drivers
          </NavLink>
        )
        }
      </div>
      <div className='home-content'>
        <p>This is a sample app to showcase a basic React application for learning porpouses</p>
        {!currentUser && <p>Do you have an account? <Link to="/auth/login/">Login</Link></p>}
      </div>
    </div>
  )
}

export default Home