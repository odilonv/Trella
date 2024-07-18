// backend/services/users/userRoutes.js
import express from 'express';
import { createUser, loginUser, sessionUser, updateUser } from './userController.js';

export const userRouter = express.Router();

// Routes pour les utilisateurs
userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/session', sessionUser)
userRouter.put('/:userId', updateUser);
