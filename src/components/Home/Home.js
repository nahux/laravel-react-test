import React from 'react'
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='home-link-container'>
        <NavLink to="/" className='home-box-link flex-g-1'>
          Home
        </NavLink>
        <NavLink to="/driver/list" className='home-box-link flex-g-2'>
          Drivers
        </NavLink>
        <NavLink to="#" className='home-box-link flex-g-3 disabled'>
          Teams
        </NavLink>
      </div>
      <div className='home-content'>
        <p>This is a sample app to showcase a basic React application for learning porpouses</p>
      </div>
    </div>
  )
}

export default Home