import { Router } from 'express';
import {
  getCartWithDetails,
  addOrUpdateCartItem,
  removeCartItem,
} from '../controllers/cartController.js';
import authenticate from '../middlewares/authMiddleware.js';

export default function createCartRouter(baseUrl, productUrl) {
  const router = Router();

  router.get('/', authenticate, (req, res) =>
    getCartWithDetails(req, res, baseUrl, productUrl)
  );

  router.post('/items', authenticate, (req, res) =>
    addOrUpdateCartItem(req, res, baseUrl)
  );

  router.delete('/items/:productId', authenticate, (req, res) =>
    removeCartItem(req, res, baseUrl)
  );

  return router;
}
