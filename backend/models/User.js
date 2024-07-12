import databaseConnection from './DatabaseConnection.js';
import bcrypt from 'bcrypt';

class User {
    static tableName = 'user';
    static fields = ['id', 'firstName', 'lastName', 'email', 'password'];

    constructor(id, firstName, lastName, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    static fromDatabase(data) {
        return new User(data.id, data.firstName, data.lastName, data.email, data.password);
    }

    static fromJson(data) {
        return new User(data.id, data.firstName, data.lastName, data.email, data.password);
    }

    static async authenticate(email, password) {
        const connection = await databaseConnection.getInstance();
        const [results] = await connection.query('SELECT * FROM ' + this.tableName + ' WHERE email = ?', [email]);
        if (results.length > 0) {
            const userData = results[0];
            const hashedPassword = userData.password;
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if (passwordMatch) {
                return User.fromDatabase(userData);
            }
        }
        return null;
    }

    static async getUserById(id) {
        const connection = await databaseConnection.getInstance();
        const [results] = await connection.query('SELECT * FROM ' + this.tableName + ' WHERE id = ?', [id]);
        if (results.length > 0) {
            return User.fromDatabase(results[0]);
        }
        return null;
    }

    static async doesEmailExist(email) {
        const connection = await databaseConnection.getInstance();
        const [results] = await connection.query('SELECT COUNT(*) AS count FROM ' + this.tableName + ' WHERE email = ?', [email]);
        return results[0].count > 0;
    }

    static async updateUser(user) {
        const connection = await databaseConnection.getInstance();
        const {
            id,
            firstName,
            lastName,
            email,
            password
        } = user;

        const sql = `
            UPDATE user
            SET firstName = ?,
                lastName = ?,
                email = ?,
                password = ?
            WHERE id = ?
        `;

        const values = [
            firstName,
            lastName,
            email,
            password,
            id
        ];

        try {
            const [results] = await connection.query(sql, values);
            if (results.affectedRows > 0) {
                const updatedUser = await User.getUserById(id);
                return updatedUser;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
        }
    }

    static async updatePassword(userId, newPassword) {
        try {
            const connection = await databaseConnection.getInstance();
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const sql = 'UPDATE user SET password = ? WHERE id = ?';
            const [results] = await connection.query(sql, [hashedPassword, userId]);
            if (results.affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe :', error);
            throw new Error('Erreur lors de la mise à jour du mot de passe');
        }
    }

    static async deleteUserByID(id) {
        const connection = await databaseConnection.getInstance();
        const [results] = await connection.query('DELETE FROM user WHERE id = ?', [id]);
        if (results.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    async insert() {
        const connection = await databaseConnection.getInstance();
        const hashedPassword = await User.hashPassword(this.password);

        const sql = `INSERT INTO ${User.tableName}
                         (${User.fields.filter(field => field !== 'id').join(', ')})
                     VALUES (?, ?, ?, ?)`;

        const [results] = await connection.query(sql, [
            this.firstName, this.lastName, this.email, hashedPassword
        ]);
        this.id = results.insertId;
    }
}

export default User;