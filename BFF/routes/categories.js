import { Router } from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
} from '../controllers/categoryController.js';
import authenticate from '../middlewares/authMiddleware.js';

export default function createCategoryRouter(baseUrl, productUrl) {
  const router = Router();

  router.get('/', (req, res) => getAllCategories(req, res, baseUrl));
  router.post('/',  (req, res) => createCategory(req, res, baseUrl));
  router.patch('/:id', authenticate, (req, res) => updateCategory(req, res, baseUrl));
  router.delete('/:id', authenticate, (req, res) => deleteCategory(req, res, baseUrl));
  router.get('/:id/products', (req, res) => getProductsByCategory(req, res, baseUrl, productUrl));

  return router;
}
