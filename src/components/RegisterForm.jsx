import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/registerForm.css';
import { getRoleFromToken } from '../utils/tokenManager';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = getRoleFromToken();
    setIsAdmin(role === 'admin');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const response = await fetch('http://localhost:4000/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess('Registration successful! Redirecting...');

      setTimeout(() => {
        if (isAdmin) {
          // Redirect admin to categories page (outside React Router)
          window.location.href = 'http://localhost:9001/products/categories';
        } else {
          // Regular user — navigate to login page within app
          navigate('/');
        }
      }, 2000);
    } else {
      setError(data.message || 'Registration failed');
    }
  } catch (err) {
    console.error('Registration error:', err);
    setError('Something went wrong.');
  }
};


  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>{isAdmin ? 'Register New User' : 'Become a Member'}</h2>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {isAdmin && (
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="role-select"
        >
          <option value="customer">Customer</option>
          <option value="data-steward">Data Steward</option>
          <option value="supplier">Supplier</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <button type="submit">Register</button>
    </form>
  );
}
