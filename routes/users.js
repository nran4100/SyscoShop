import { Router } from 'express';
import authenticate from '../middlewares/authMiddleware.js';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

export default function createUserRouter(baseUrl) {
  const router = Router();

  router.get('/', authenticate, (req, res) => getAllUsers(req, res, baseUrl));
  router.get('/:id', authenticate, (req, res) => getUserById(req, res, baseUrl));
  router.post('/', authenticate, (req, res) => createUser(req, res, baseUrl));
  router.patch('/:id', authenticate, (req, res) => updateUser(req, res, baseUrl));
  router.delete('/:id', authenticate, (req, res) => deleteUser(req, res, baseUrl));

  return router;
}
