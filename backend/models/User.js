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

    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
}

export default User;