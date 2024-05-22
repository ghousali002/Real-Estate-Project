import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types'; 

const BuyerSocketContext = createContext();

export const useBuyerSocket = () => useContext(BuyerSocketContext);

export const BuyerSocketProvider = ({ isBuyerAuthenticated, children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isBuyerAuthenticated) { 
        const newSocket = io("http://localhost:8000", {
          cors: {
            origin: "http://localhost:3000",
          },
        });
        setSocket(newSocket);
        const userId = localStorage.getItem("buyerId");
        newSocket.emit('addUser', userId);
        
        return () => {
          socket.emit('disconnect');
          newSocket.close();
        };
    }
  }, [isBuyerAuthenticated]);
  return (
    <BuyerSocketContext.Provider value={socket}>
      {children}
    </BuyerSocketContext.Provider>
  );
};

// Validate props
BuyerSocketProvider.propTypes = {
    isBuyerAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
