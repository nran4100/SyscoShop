import axios from 'axios';

const apiClient = axios.create({
  timeout: 5000,
});

// Helper to inject Authorization header
const withAuthHeader = (config = {}, req) => {
  const headers = {
    ...(config.headers || {}),
    ...(req?.headers?.authorization ? { Authorization: req.headers.authorization } : {})
  };
  return { ...config, headers };
};

export const get = (url, config = {}, req = null) => apiClient.get(url, withAuthHeader(config, req));
export const post = (url, data, config = {}, req = null) => apiClient.post(url, data, withAuthHeader(config, req));
export const patch = (url, data, config = {}, req = null) => apiClient.patch(url, data, withAuthHeader(config, req));
export const del = (url, config = {}, req = null) => apiClient.delete(url, withAuthHeader(config, req));

export default apiClient;
