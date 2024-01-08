import React from 'react'
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {

  const { isAuthenticated} = useAuth();

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
    <div>
     Welcome to Dashboard
    </div>
    <button>
      Heelo
    </button>
    </>
  )
}
