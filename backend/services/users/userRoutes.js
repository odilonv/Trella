// backend/services/users/userRoutes.js
import express from 'express';
import { createUser, loginUser, sessionUser, updateUser, logoutUser, deleteUser, IdUser } from './userController.js';

export const userRouter = express.Router();

// Routes pour les utilisateurs
userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/delete', deleteUser);
userRouter.get('/session', sessionUser);
userRouter.get('/user/:id', IdUser);
userRouter.put('/:userId', updateUser);
