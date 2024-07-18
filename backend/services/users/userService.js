// backend/services/users/userService.js
import { v4 as uuidv4 } from 'uuid';

// Exemple de stockage temporaire en mémoire
let users = [];

export const UserService = {
    // Créer un utilisateur
    createUser: (username, email, password) => {
        const newUser = {
            id: uuidv4(),
            username,
            email,
            password // Note: Vous devriez hasher ce mot de passe avant de l'enregistrer
        };
        users.push(newUser);
        return newUser;
    },

    // Obtenir un utilisateur par ID
    getUserById: (userId) => {
        return users.find(user => user.id === userId);
    },

    // Mettre à jour les détails d'un utilisateur
    updateUser: (userId, username, email) => {
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            users[userIndex].username = username;
            users[userIndex].email = email;
            return users[userIndex];
        }
        return null;
    }
};
