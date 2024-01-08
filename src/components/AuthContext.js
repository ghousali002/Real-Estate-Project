import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Read the initial authentication status from localStorage on component mount
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    // Save the updated authentication status to localStorage whenever it changes
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const loginFrontend = () => {
    // Perform login logic (e.g., check if the user is authenticated)
    // Set isAuthenticated to true if authenticated
    setIsAuthenticated(true);
  };

  const logoutFrontend = () => {
    // Perform logout logic (e.g., clear authentication token)
    // Set isAuthenticated to false
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginFrontend, logoutFrontend }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
