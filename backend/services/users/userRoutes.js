// backend/services/users/userRoutes.js
import express from 'express';
import { createUser, getUserById, updateUser } from './userController.js';

export const userRouter = express.Router();

// Routes pour les utilisateurs
userRouter.post('/signup', createUser);
userRouter.get('/:userId', getUserById);
userRouter.put('/:userId', updateUser);
