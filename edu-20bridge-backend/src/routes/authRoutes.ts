Sure, here's the content for the file: /edu-20bridge-backend/edu-20bridge-backend/src/routes/authRoutes.ts

import { Router } from 'express';
import { login, register } from '../controllers/authController';

const router = Router();

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

export default router;