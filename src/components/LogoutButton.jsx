import React from 'react';
import { logout } from '../services/authService';
import { clearAuthData } from '../utils/tokenManager';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      clearAuthData();
      onLogout();
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
