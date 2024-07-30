import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {appConfigSlice} from '../../redux/appConfigurationSlice'; // Adjust the path accordingly

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(appConfigSlice);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component {...rest} /> : <Navigate to="/dashboard" />}
    />
  );
};

export default PrivateRoute;
