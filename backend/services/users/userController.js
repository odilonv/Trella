import { UserService } from './userService.js';

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const newUser = await UserService.createUser(firstName, lastName, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
