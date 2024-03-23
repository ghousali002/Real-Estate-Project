import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BuyerContext = createContext();

export const BuyerProvider = ({ children }) => {
  const [isBuyerAuthenticated, setIsBuyerAuthenticated] = useState(() => {
    // Read the initial authentication status from localStorage on component mount
    return localStorage.getItem('isBuyerAuthenticated') === 'true';
  });

  useEffect(() => {
    // Save the updated authentication status to localStorage whenever it changes
    localStorage.setItem('isBuyerAuthenticated', isBuyerAuthenticated);
  }, [isBuyerAuthenticated]);

  const loginFrontend = () => {
    setIsBuyerAuthenticated(true);
  };

  const logoutFrontend = () => {
    setIsBuyerAuthenticated(false);
  };

  return (
    <BuyerContext.Provider value={{ isBuyerAuthenticated, loginFrontend, logoutFrontend }}>
      {children}
    </BuyerContext.Provider>
  );
};

BuyerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBuyerAuth = () => {
  return useContext(BuyerContext);
};
