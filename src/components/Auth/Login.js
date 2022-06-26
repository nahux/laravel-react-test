import React, { useRef, useState } from 'react'
import { useAuth } from './AuthContext'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (loginError) {
      setError('Failed to login: ' + loginError);
    }

    setLoading(false);
  }

  return (
    <div className='login-container container'>
      <div className='login-card card'>
        <div className='card-body flex-none'>
          <h1 className='text-center card-title'>Login</h1>
          {error ? (<div className='alert alert-danger'> {error} </div>) : null}
          <form onSubmit={handleSubmit} >
            <div className='form-group'>
              <label htmlFor="userEmail">Email</label>
              <input className='form-control' ref={emailRef} type="email" name="email" id="userEmail" />
            </div>
            <div className='form-group'>
              <label htmlFor="userPassword">Password</label>
              <input className='form-control' ref={passwordRef} type="password" name="password" id="userPassword" />
            </div>
            <button className='btn btn-primary mt-2' type="submit" disabled={loading}>Login</button>
          </form>
          <div className='w-100 text-center mb-2'>
            If you want to create an account <Link to="/auth/signup/">Sign up here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
