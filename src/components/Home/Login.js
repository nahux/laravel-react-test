import React from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { LogIn } from "../../services/auth";

const endpoint = '/login';

function Login() {

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const loginCredentials = {
      email: formData.get('email'),
      password: formData.get('password')
    }

    apiClient.get('/sanctum/csrf-cookie')
      .then(() => {
        apiClient.post(endpoint, loginCredentials)
          .then((response) => {
            LogIn();
            console.log('Logged successfully!', response)
            navigate('/');
          })
          .catch((error) => {
            console.log(error)
          })
      })
  }

  return (
    <div id="form-container" className="container">
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" type="email" name="email" id="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" type="password" name="password" id="password" required />
        </div>
        <button type="submit" className="mt-2 btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login