import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="auth-container">
      <LoginForm onLogin={setUser} />
    </div>
  );
};

export default LoginPage;
