import { Router } from 'express';
import { loginUser, logoutUser } from '../controllers/authController.js';


export default function createProductRouter() {
  const router = Router();

  router.post('/login', loginUser);
  router.post('/logout', logoutUser);  // Optional: depends on strategy

  return router;
}