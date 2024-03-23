import React from 'react'
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
import Row from './ui/Row';
import Heading from './ui/Heading';
import PieChart from './ListingChart';

export default function Dashboard() {

  const { isAuthenticated } = useAuth();

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
      <Row type="horizontal">
          <Heading as="head1">Dashboard</Heading>
      </Row>
      <PieChart/>
    </>
  )
}
