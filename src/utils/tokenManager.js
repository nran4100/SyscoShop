// Save all authentication data
export const saveAuthData = ({ accessToken, refreshToken, expiresIn, user }) => {
  const expiresAt = Date.now() + expiresIn * 1000; // expiresIn is in seconds
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('expiresAt', expiresAt.toString());
  localStorage.setItem('user', JSON.stringify(user));
};

// Retrieve access token
export const getAccessToken = () => localStorage.getItem('accessToken');

// Retrieve refresh token
export const getRefreshToken = () => localStorage.getItem('refreshToken');

// Retrieve user info
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if token is expired
export const isTokenExpired = () => {
  const expiresAt = parseInt(localStorage.getItem('expiresAt'), 10);
  return isNaN(expiresAt) || Date.now() > expiresAt;
};

// Clear all auth data
export const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expiresAt');
  localStorage.removeItem('user');
};
