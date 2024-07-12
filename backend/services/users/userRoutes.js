import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, signup, login, forgotPassword, validateEmail } from './userController.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/validate-email', validateEmail);

export default router;
