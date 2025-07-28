import API_BASE_URL from '../utils/config';



const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
});

export const getCart = async () => {
  const res = await fetch(`${API_BASE_URL}/carts`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
};

export const addCartItem = async ({ productId, quantity }) => {
  const res = await fetch(`${API_BASE_URL}/carts/items`, {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [{ productId, quantity }],
    }),
  });
  if (!res.ok) throw new Error('Failed to add item');
  return res.json();
};

export const removeCartItem = async (productId) => {
  const res = await fetch(`${API_BASE_URL}/carts/items/${productId}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Failed to remove item');
  return res.json();
};
