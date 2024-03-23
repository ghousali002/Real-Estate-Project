import React from "react";
import { IoIosNotifications } from 'react-icons/io';
import { VscSignOut } from 'react-icons/vsc';
import { useState, useEffect } from 'react';
import { useBuyerLogout } from "../useBuyerLogout";
import { useAuth } from '../AuthContext';
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import {useBuyerUser} from '../section-components/BuyerDashboard/useBuyerUser';


const Header = () => {
  const { data , isLoading, isError} = useBuyerUser();
  const { mutate: logoutMutate } = useBuyerLogout();
  const { logoutFrontend } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    const scrolled = window.scrollY > 0;
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    // Handle loading state
    return <Spinner />;
  }

  if (isError) {
    // Handle error state
    return <div>Error fetching user details</div>;
  }
  
  let Name = data.user?.Name || 'Unknown User';
  
  const handleLogout = async () => {
    try {
      logoutMutate();
      logoutFrontend();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <div className={`header ${isScrolled ? 'scrolled' : ''}`}
      style={{
        background: isScrolled ? 'white' : 'transparent',
        boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
        width: '100%', // Ensure the header is full width
        display: 'flex', // Use flexbox to align children
        justifyContent: 'space-between', // Place children on opposite ends
        alignItems: 'center', // Center children vertically
        padding: '0 1rem', // Add some padding on the sides
      }}>
      <div className="left">
        <h4 className="mx-3 my-3">Welcome, {Name ? Name : "No Name"}</h4>
      </div>
      <div className="right">
        <IoIosNotifications style={{ fontSize: '2.5rem' }} />
        <VscSignOut className='logout' style={{ fontSize: '2.5rem', marginLeft: '1rem' }} onClick={handleLogout} />
      </div>
    </div>
  );
}  

export default Header;
