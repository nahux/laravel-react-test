import React, { useRef, useState } from 'react'
import { useAuth } from './AuthContext'
import './Auth.css'

export default function SignUp() {
  const { signUp } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError('The confirmation password does not match the password');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      setError('Failed to create an account: ' + error);
    }

    setLoading(false);
  }

  return (
    <div className='login-container container'>
      <div className='login-card card'>
        <div className='card-body flex-none'>
          <h1 className='text-center card-title'>Sign Up</h1>
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
            <div className='form-group'>
              <label htmlFor="userPassword">Confirm Password</label>
              <input className='form-control' ref={passwordConfirmationRef} type="password" name="passwordConfirmation" id="userPasswordConfirmation" />
            </div>
            <button className='btn btn-primary mt-2' type="submit" disabled={loading}>Sign Up</button>
          </form>
          <div className='w-100 text-center mb-2'>
            Do you have an account? Login
          </div>
        </div>
      </div>
    </div>
  )
}
