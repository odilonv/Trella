import DatabaseConnection from '../../models/DatabaseConnection.js';
import bcrypt from 'bcrypt';
import User from '../../models/User.js';

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

    // Authentifier un utilisateur
    loginUser: async (email, password) => {
        const connection = await DatabaseConnection.getInstance();
        const [results] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
        if (results.length > 0) {
            const userData = results[0];
            const hashedPassword = userData.password;
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if (passwordMatch) {
                return User.fromDatabase(userData);
            }
        }
        return null;
    },

};