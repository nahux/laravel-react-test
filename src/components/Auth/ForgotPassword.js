import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();

  const emailRef = useRef();

  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setMessage('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your email inbox to reset your password');
    } catch (loginError) {
      setError('Failed to reset password: ' + loginError);
    }

    setLoading(false);
  }

  return (
    <div className='login-container container'>
      <div className='login-card card'>
        <div className='card-body flex-none'>
          <h1 className='text-center card-title'>Reset your Password</h1>
          <p className='mt-4'>We will send you an email to reset your current password</p>
          {error ? (<div className='alert alert-danger'> {error} </div>) : null}
          {message ? (<div className='alert alert-success'> {message} </div>) : null}
          <form onSubmit={handleSubmit} >
            <div className='form-group'>
              <label htmlFor="userEmail">Email</label>
              <input className='form-control' ref={emailRef} type="email" name="email" id="userEmail" />
            </div>
            <button className='btn btn-primary mt-2' type="submit" disabled={loading}>Reset Password</button>
          </form>
          <div className='w-100 text-center mb-2'>
            <Link to="/auth/login">Login</Link>
          </div>
          <div className='w-100 text-center mb-2'>
            If you want to create an account <Link to="/auth/signup/">Sign up here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
