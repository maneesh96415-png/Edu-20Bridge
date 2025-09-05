import express from 'express';
import { getUser, updateUser } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Route to get user details
router.get('/:id', authenticate, getUser);

// Route to update user details
router.put('/:id', authenticate, updateUser);

export default router;