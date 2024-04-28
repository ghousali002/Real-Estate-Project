import React, { useEffect, useState } from 'react';
import BuyerHeader from '..//../ui/BuyerHeader';
import SaleProperties from './SaleProperties';
import Button from '@material-ui/core/Button';
import RentProperties from './RentProperties';
import axios from 'axios';

export default function BuyerListings() {
  const [listingType, setListingType] = useState('sale');
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('http://localhost:5000/buyer/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userData = response.data.user;
        setUser(userData);

        // Store user ID in local storage
        if (userData && userData._id) {
          localStorage.setItem('userId', userData._id);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error (e.g., redirect to login page, show error message)
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array ensures the effect runs only once after initial render
  useEffect(() => {
    console.log('User details:', user);
  }, [user]);
  const handleButtonClick = (type) => {
    setListingType(type);
  };

  return (
    <div>
      <BuyerHeader />
      <div>
        <Button color={listingType === 'sale' ? 'primary' : 'default'} onClick={() => handleButtonClick('sale')} style={{ marginRight: '20px',marginLeft: '20px',fontSize:"12px" }}>Sale</Button>
        <Button color={listingType === 'rent' ? 'primary' : 'default'} onClick={() => handleButtonClick('rent')} style={{fontSize:"12px"}}>Rent</Button>
      </div>
      <div>
        {listingType === 'sale' ? (
          <SaleProperties />
        ) : (
          <RentProperties />
        )}
      </div>
    </div>
  );
}
