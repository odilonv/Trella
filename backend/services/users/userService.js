// backend/services/users/userService.js
import { v4 as uuidv4 } from 'uuid';
import DatabaseConnection from '../../models/DatabaseConnection.js';

export const UserService = {
    // Créer un utilisateur
    createUser: async (firstName, lastName, email, password) => {
        const newUser = {
            firstName,
            lastName,
            email,
            password // Note: Vous devriez hasher ce mot de passe avant de l'enregistrer
        };

        const connection = await DatabaseConnection.getInstance();
        await connection.query(
            'INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
            [newUser.firstName, newUser.lastName, newUser.email, newUser.password]
        );

        // Récupérer l'ID généré automatiquement par MySQL
        const [rows] = await connection.query('SELECT LAST_INSERT_ID() as id');
        newUser.id = rows[0].id;

        return newUser;
    },

    // Obtenir un utilisateur par ID
    getUserById: async (userId) => {
        const connection = await DatabaseConnection.getInstance();
        const [rows] = await connection.query(
            'SELECT * FROM user WHERE id = ?',
            [userId]
        );

        return rows[0];
    },

    // Mettre à jour les détails d'un utilisateur
    updateUser: async (userId, firstName, lastName, email) => {
        const connection = await DatabaseConnection.getInstance();
        await connection.query(
            'UPDATE user SET firstName = ?, lastName = ?, email = ? WHERE id = ?',
            [firstName, lastName, email, userId]
        );

        return this.getUserById(userId);
    }
};