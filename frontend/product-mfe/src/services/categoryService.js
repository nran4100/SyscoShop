import API_BASE_URL from '../utils/config';

export const getAllCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);

  if (!response.ok) throw new Error('Failed to fetch categories');

  const data = await response.json();

  return data; // plain array of categories [{ id, name, imageUrl }]
};
