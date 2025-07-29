export function decodeAccessToken() {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;  // { sub, email, role, iat, etc. }
  } catch (err) {
    console.error('Failed to decode access token:', err);
    return null;
  }
}

export function getUserRole() {
  const decoded = decodeAccessToken();
  return decoded?.role || null;
}

export function hasRole(allowedRoles = []) {
  const role = getUserRole();
  if (!role) return false;
  return allowedRoles.includes(role);
}

// src/utils/authUtils.js

export function isTokenValid(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > currentTime;
  } catch (err) {
    return false;
  }
}
