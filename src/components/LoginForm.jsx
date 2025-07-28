import React, { useState } from 'react';
import { login } from '../services/authService';
import { saveAuthData } from '../utils/tokenManager';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { accessToken, refreshToken, expiresIn, user } = await login(email, password);

      // Save all tokens and user info
      saveAuthData({ accessToken, refreshToken, expiresIn, user });

      // Notify parent (optional, if you want to keep using onLogin)
      if (onLogin) {
        onLogin(user);
      }

      // Redirect to products page
      window.location.href = 'http://localhost:9001/products/categories';
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
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
    </form>
  );
};

export default LoginForm;
