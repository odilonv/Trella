// Exemple de stockage temporaire en mémoire
let users = [];

export const UserService = {
    // Créer un utilisateur
    createUser: (lastName, firstName, email, password) => {
        const newUser = {
            lastName,
            firstName,
            email,
            password
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
