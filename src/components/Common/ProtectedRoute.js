import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'

/**
 * 
 * @param {} param0 
 * @returns 
 */
export default function ProtectedRoute({ children }) {

  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Navigate to={"/auth/login"} />
    )
  }

  return children;
}
