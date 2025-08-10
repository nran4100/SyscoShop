import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CartPage from './pages/CartPage';
import './styles/cart.css';

export default function Root() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp && payload.exp > currentTime;
    } catch (err) {
      return false;
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Show message for 2 seconds, then redirect
    return (
      <BrowserRouter basename="/cart">
        <Routes>
          <Route
            path="*"
            element={
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h2>You are not logged in.</h2>
                <p>Redirecting to login page...</p>
                <RedirectAfterDelay to="/auth" delay={2000} />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter basename="/cart">
      <Routes>
        <Route path="/" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function RedirectAfterDelay({ to, delay }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = to;
    }, delay);
    return () => clearTimeout(timer);
  }, [to, delay]);

  return null;
}
