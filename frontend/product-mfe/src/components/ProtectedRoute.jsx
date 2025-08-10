import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasRole } from '../utils/authUtils';

export default function ProtectedRoute({ allowedRoles, children }) {
  const isAuthorized = hasRole(allowedRoles);

  if (!isAuthorized) {
    return <Navigate to="/categories" replace />;
  }

  return children;
}
