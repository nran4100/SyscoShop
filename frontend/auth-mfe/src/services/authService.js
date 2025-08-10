import API_BASE_URL from '../utils/config';

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Login failed');
  return await response.json(); 
};

export const logout = async () => {
  await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
};
