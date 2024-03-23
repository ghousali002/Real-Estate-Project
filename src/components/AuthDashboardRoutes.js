import React from "react";
import { useBuyerAuth } from './BuyerContext';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'
export const PrivateRoute = ({ element, path }) => {
    const { isBuyerAuthenticated } = useBuyerAuth();
    return isBuyerAuthenticated ? (
        element
    ) : (
        <Navigate to="/sign-in" state={{ from: path }} replace />
    );
};
PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
    path: PropTypes.string.isRequired,
};