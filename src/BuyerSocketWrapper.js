// BuyerSocketWrapper.js
import React from 'react';
import { BuyerSocketProvider } from './components/services/buyerSocketContext';
import PropTypes from 'prop-types';

const BuyerSocketWrapper = ({ children, isBuyerAuthenticated }) => (
  <BuyerSocketProvider isBuyerAuthenticated={isBuyerAuthenticated}>
    {children}
  </BuyerSocketProvider>
);

BuyerSocketWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isBuyerAuthenticated: PropTypes.bool.isRequired,
};

export default BuyerSocketWrapper;
