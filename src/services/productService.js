import API_BASE_URL from '../utils/config';
import { getAccessToken } from '../utils/tokenManager';

export const getAllProducts = async (page = 0, size = 10, filters = {}) => {
  const params = new URLSearchParams({
    page,
    size,
  });

  if (filters.categoryId) params.append('categoryId', filters.categoryId);
  if (filters.status) params.append('status', filters.status);
  if (filters.unit) params.append('unit', filters.unit);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.name) params.append('name', filters.name); // ✅ Add this


  const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);

  if (!response.ok) throw new Error('Failed to fetch products');

  const data = await response.json();

  return {
    products: data.content || [],
    totalElements: data.totalElements,
    totalPages: data.totalPages,
    currentPage: data.number,
  };
};


export const getAllCategories = async (page = 0, size = 10) => {

  const response = await fetch(
    `${API_BASE_URL}/categories`
  );

  if (!response.ok) throw new Error('Failed to fetch products');

  const data = await response.json();

  return {
    products: data.content || [],
    totalElements: data.totalElements,
    totalPages: data.totalPages,
    currentPage: data.number,
  };
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return await response.json();
};

