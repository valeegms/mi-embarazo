import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth: React.FC = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;

