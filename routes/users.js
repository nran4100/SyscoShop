import { Router } from 'express';
import { get, post, patch, del } from '../utils/appClient.js';
import authenticate from '../middlewares/authMiddleware.js';

export default function createUserRouter(baseUrl) {
  const router = Router();

  router.get('/', authenticate, async (req, res) => {
    try {
      const { data } = await get(baseUrl);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  });

  router.get('/:id', authenticate, async (req, res) => {
    try {
      const { data } = await get(`${baseUrl}/${req.params.id}`);
      res.json(data);
    } catch (err) {
      res.status(404).json({ message: 'User not found' });
    }
  });

  router.post('/', authenticate, async (req, res) => {
    try {
      const { data } = await post(baseUrl, req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create user' });
    }
  });

  router.patch('/:id', authenticate, async (req, res) => {
    try {
      const { data } = await patch(`${baseUrl}/${req.params.id}`, req.body);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Failed to update user' });
    }
  });

  router.delete('/:id', authenticate, async (req, res) => {
    try {
      await del(`${baseUrl}/${req.params.id}`);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  });

  return router;
}
