import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types'; // Import PropTypes

const SellerSocketContext = createContext();

export const useSellerSocket = () => useContext(SellerSocketContext);

export const SellerSocketProvider = ({ isAuthenticated, children }) => { // Add isAuthenticated to props
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isAuthenticated) { 
        const newSocket = io("http://localhost:8000", {
          cors: {
            origin: "http://localhost:3000",
          },
        });
        setSocket(newSocket);
        const userId = localStorage.getItem("userId");
        newSocket.emit('addUser', userId);
        
        return () => {
          socket.emit('disconnect');
          newSocket.close();
        };
    }
  }, [isAuthenticated]);
  return (
    <SellerSocketContext.Provider value={socket}>
      {children}
    </SellerSocketContext.Provider>
  );
};

// Validate props
SellerSocketProvider.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
