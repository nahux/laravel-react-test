import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Call firebase signup
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Call firebase login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  // Call firebase logout
  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }
  
  useEffect(() => {
    // Set current user when firebase auth changed
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    })
  })

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
