import React, { useState, useEffect } from 'react';
import Logo from '../../ui/Logo';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@material-ui/core';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const [activeButton, setActiveButton] = useState('buyer');
  const navigate=useNavigate();


  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminloggedin');
    if (!adminLoggedIn) {
      navigate('/admin'); // Redirect to '/admin' if not logged in
    }
  }, [navigate]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/buyer/get-buyers');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  
  useEffect(() => {
    fetchDataSellers();
  }, []);

  const fetchDataSellers = async () => {
    try {
      const response = await fetch('http://localhost:5000/seller/get-sellers');
      const data = await response.json();
      console.log("these are sellers")
      setSellers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'buyer') {
      fetchData(); // Fetch buyers data
    } else if (button === 'seller') {
        fetchDataSellers();
    }
  };


const handleLogoutClick = () => {
  localStorage.removeItem('adminloggedin');
  navigate('/admin', { replace: true });


};


  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Logo />
        <p>Welcome! Admin</p>
      </header>
      <nav style={styles.nav}>
        <button
          style={{ ...styles.userTypeButton, backgroundColor: activeButton === 'buyer' ? '#5BA600' : '' }}
          onClick={() => handleButtonClick('buyer')}
        >
          Buyer
        </button>
        <button
          style={{ ...styles.userTypeButton, backgroundColor: activeButton === 'seller' ? '#5BA600' : '' }}
          onClick={() => handleButtonClick('seller')}
        >
          Seller
        </button>
        <button style={styles.navButton}  onClick={() => handleLogoutClick()}>Logout</button>
      </nav>
      <main style={styles.main}>
        <div style={styles.tableContainer}>
        <h2>Users list</h2>
        <Divider/>

          {activeButton === 'buyer' ? (
            <>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email address</th>
                    <th>Description</th>
                    <th>Verify Status</th>
                    <th>Booked Rent Properties</th>
                    <th>Booked Sale Properties</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.Name}</td>
                      <td>{user.email}</td>
                      <td>{user.description}</td>
                      <td>{user.isVerified ? 'Verified' : 'Not Verified'}</td>
                      <td>{user.bookedRentProperties.length}</td>
                      <td>{user.bookedSaleProperties.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
<>
<table style={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email address</th>
                    <th>Description</th>
                    <th>Verify Status</th>                  </tr>
                </thead>
                <tbody>
                  {sellers?.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.Name}</td>
                      <td>{user.email}</td>
                      <td>{user.description}</td>
                      <td>{user.isVerified ? 'Verified' : 'Not Verified'}</td>
                
                    </tr>
                  ))}
                </tbody>
              </table>
</>            
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#122550',
    color: '#fff',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    backgroundColor: '#444',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#122550',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    
  },
  
  userTypeButton: {
    backgroundColor: '#5BA600',
    color: '#black',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',

  },
  main: {
    padding: '1rem',
  },
  tableContainer: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  table: {

    width: '100%',
    borderCollapse: 'collapse',
    marginTop:"30px"
  },
  th: {
    backgroundColor: '#f4f4f4',
    padding: '0.5rem',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '0.5rem',
    borderBottom: '1px solid #ddd',
  },
  actionButton: {
    marginRight: '0.5rem',
    padding: '0.25rem 0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
