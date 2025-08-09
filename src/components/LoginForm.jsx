import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { saveAuthData } from '../utils/tokenManager';
import '../styles/auth.css'; // Ensure this import is present

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { accessToken, refreshToken, expiresIn, user } = await login(email, password);

      saveAuthData({ accessToken, refreshToken, expiresIn, user });

      if (onLogin) {
        onLogin(user);
      }

      window.location.href = 'http://localhost:9001/products/categories';
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleContinueAsGuest = () => {
    window.location.href = 'http://localhost:9001/products/categories';
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to register page
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <button
          type="button"
          onClick={handleContinueAsGuest}
          className="guest-button"
        >
          Continue as Guest
        </button>

        <button
          type="button"
          onClick={handleRegisterClick}
          className="register-button"
        >
          Become a Member
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
