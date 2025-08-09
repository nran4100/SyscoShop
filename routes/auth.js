import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/authController.js';

export default function createAuthRouter() {
  const router = Router();

  router.post('/login', loginUser);
  router.post('/logout', logoutUser);
  router.post('/register', registerUser);

  return router;
}
