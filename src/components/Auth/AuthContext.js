import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  // Call firebase signup
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  useEffect(() => {
    // Set current user when firebase auth changed
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    })
    // Unsubscribe
    return unsubscribe;
  })

  const value = {
    currentUser,
    signUp
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
