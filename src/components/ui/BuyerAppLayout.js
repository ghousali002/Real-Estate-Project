import React from "react";
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../section-components/BuyerDashboard/BuyerDashboard';
import Sidebar from './BuyerSidebar';
import Profile from '../section-components/BuyerDashboard/BuyerProfile';
import Bookings from '../section-components/BuyerDashboard/BuyerBookings';
import Listings from '../section-components/BuyerDashboard/BuyerListings';
import Message from '../section-components/BuyerDashboard/BuyerMessage';
import './Dashboard.css';
import {PrivateRoute} from '../AuthDashboardRoutes';


export default function DashboardLinks() {
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route
            path="/Dashboard/"
            element={<PrivateRoute element={<Dashboard />} path="/Dashboard" />}
          />
          <Route
            path="/Profile/"
            element={<PrivateRoute element={<Profile />} path="/Profile" />}
          />
          <Route
            path="/Bookings/"
            element={<PrivateRoute element={<Bookings/>} path="/Bookings" />}
          />
          <Route
            path="/Listings/"
            element={<PrivateRoute element={<Listings/>} path="/Listings" />}
          />
          <Route
            path="/Message/"
            element={<PrivateRoute element={<Message />} path="/Message" />}
          />
        </Routes>
      </div>
    </div>
  );
}
