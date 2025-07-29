import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValid } from '../utils/authUtils';
import '../styles/navbar.css';

export default function NavBar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(token && isTokenValid(token));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('user');
    navigate('/auth'); // Redirect to auth page
  };

  const handleLogin = () => {
    navigate('/auth'); // Redirect to auth page
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/products/categories" className="brand-link">SyscoShop</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/products/categories">Products</Link></li>

        {isAuthenticated ? (
          <>
            <li><Link to="/cart">Cart</Link></li>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <button className="login-button" onClick={handleLogin}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
