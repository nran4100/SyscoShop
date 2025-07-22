import { Router } from 'express';
import { get, post, del } from '../utils/appClient.js';
import authenticate from '../middlewares/authMiddleware.js';

export default function createCartRouter(baseUrl, productUrl) {
  const router = Router();

  // Get current user's cart with product details aggregated
  router.get('/', authenticate, async (req, res) => {
    try {
      const userId = req.user.sub; // assuming Cognito sub is userId or adjust accordingly

      // 1. Get cart from cart service
      const cartResponse = await get(baseUrl, { params: { userId } });
      const cart = cartResponse.data;

      // 2. For each cart item, get product details from product service
      const detailedItems = await Promise.all(
        cart.items.map(async (item) => {
          try {
            const productResponse = await get(`${productUrl}/${item.productId}`);
            return {
              ...item,
              productName: productResponse.data.name,
              price: productResponse.data.price,
            };
          } catch {
            return item; // fallback, in case product fetch fails
          }
        })
      );

      res.json({ ...cart, items: detailedItems });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch cart with product details' });
    }
  });

  // Add or update cart item
  router.post('/items', authenticate, async (req, res) => {
    try {
      const userId = req.user.sub;
      const payload = { ...req.body, userId };

      const { data } = await post(`${baseUrl}/items`, payload);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Failed to add/update cart item' });
    }
  });

  // Remove item from cart
  router.delete('/items/:productId', authenticate, async (req, res) => {
    try {
      const userId = req.user.sub;
      const productId = req.params.productId;
      const { data } = await del(`${baseUrl}/items/${productId}`, { params: { userId } });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Failed to remove item from cart' });
    }
  });

  return router;
}
