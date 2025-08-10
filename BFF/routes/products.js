import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import authenticate from '../middlewares/authMiddleware.js';

export default function createProductRouter(baseUrl) {
  const router = Router();

  router.get('/', (req, res) => getAllProducts(req, res, baseUrl));
  router.get('/:id', (req, res) => getProductById(req, res, baseUrl));
  router.post('/', (req, res) => createProduct(req, res, baseUrl));
  router.patch('/:id', authenticate, (req, res) => updateProduct(req, res, baseUrl));
  router.delete('/:id', authenticate, (req, res) => deleteProduct(req, res, baseUrl));

  return router;
}
