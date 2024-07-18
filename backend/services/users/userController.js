// backend/services/users/userController.js
import { UserService } from './userService.js';

// Créer un utilisateur
export const createUser = (req, res) => {
    const { lastName, firstName, email, password } = req.body;
    const newUser = UserService.createUser(lastName, firstName, email, password);
    res.status(201).json(newUser);
};

// Obtenir un utilisateur par ID
export const getUserById = (req, res) => {
    const { userId } = req.params;
    const user = UserService.getUserById(userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Mettre à jour les détails d'un utilisateur
export const updateUser = (req, res) => {
    const { userId } = req.params;
    const { username, email } = req.body;
    const updatedUser = UserService.updateUser(userId, username, email);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
