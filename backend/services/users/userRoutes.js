// backend/services/users/userRoutes.js
import express from 'express';
import { createUser, loginUser, sessionUser, updateUser, logoutUser } from './userController.js';

export const userRouter = express.Router();

// Routes pour les utilisateurs
userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/session', sessionUser)
userRouter.put('/:userId', updateUser);
