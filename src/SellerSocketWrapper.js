// SellerSocketWrapper.js
import React from 'react';
import { SellerSocketProvider } from './components/services/sallerSocketContext';
import PropTypes from 'prop-types';

const SellerSocketWrapper = ({ children, isAuthenticated }) => (
  <SellerSocketProvider isAuthenticated={isAuthenticated}>
    {children}
  </SellerSocketProvider>
);

SellerSocketWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default SellerSocketWrapper;
