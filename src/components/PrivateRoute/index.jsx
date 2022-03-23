import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ children }) => {
  const userToken = useSelector(state => state.token);
  return userToken ? children : <Navigate to='/login' />
}

export default PrivateRoute;