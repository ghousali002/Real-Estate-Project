import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SaleListings from './SaleListings';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import './Listing.css';
import RentListings from './RentListings';
import {useSale} from './useSale';

export default function AllListings() {
    const [activeTab, setActiveTab] = useState('sale');
    const [activeRentCount, setActiveRentCount] = useState(0); 

    const activeSalesCount = useSale();

    const handleTabClick = (tabName) => {
        setActiveTab(tabName); 
    };


    useEffect(() => {
        fetchActiveRentCount();
    }, []);

    const  fetchActiveRentCount = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get('http://localhost:5000/getlistingrent', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          setActiveRentCount(response.data.properties.length);
        } catch (error) {
          console.error('Error fetching rent properties:', error);
        }
      }

    return (
        <>
            <div>
                <Row type="horizontal">
                    <Heading as="head1">My Listings</Heading>
                </Row>
                <div className="tabs">
                    <div className={activeTab === 'sale' ? 'start' : ''} onClick={() => handleTabClick('sale')}>
                        Listing for Sale {activeSalesCount > 0 && `(${activeSalesCount})`}
                    </div>
                    <div className={activeTab === 'rent' ? 'start' : ''} onClick={() => handleTabClick('rent')}>
                        Listing for Rent {activeRentCount > 0 && `(${activeRentCount})`}
                    </div>
                </div>
            </div>

            {activeTab === 'sale' && (
                <>
                    <SaleListings />
                </>
            )}

             {activeTab === 'rent' && (
                <>
                    <RentListings />
                </>
            )}
        </>
    );
}
