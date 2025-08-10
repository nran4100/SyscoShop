import API_BASE_URL from '../utils/config';
import { getAccessToken } from '../utils/tokenManager';

export const addToCart = async (productId, quantity = 1) => {
  const token = getAccessToken();
  const payload = {
    items: [{ productId, quantity }],
  };

  const response = await fetch(`${API_BASE_URL}/carts/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add to cart');
  }

  return await response.json(); // Return updated cart
};
