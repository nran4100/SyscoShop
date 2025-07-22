import axios from 'axios';

const apiClient = axios.create({
  timeout: 5000,
});

export const get = (url, config) => apiClient.get(url, config);
export const post = (url, data, config) => apiClient.post(url, data, config);
export const patch = (url, data, config) => apiClient.patch(url, data, config);
export const del = (url, config) => apiClient.delete(url, config);  

export default apiClient;
