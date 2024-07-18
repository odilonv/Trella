import mysql from 'mysql2/promise';
import fs from 'fs';
import User from './User.js';

class DatabaseConnection {
    static #instance = null;
    static #initializing = false;

    static async getInstance() {
        if (DatabaseConnection.#instance) {
            return DatabaseConnection.#instance;
        }

        if (DatabaseConnection.#initializing) {
            // Wait until the initializing process is finished
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (DatabaseConnection.#instance) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
            return DatabaseConnection.#instance;
        }

        DatabaseConnection.#initializing = true;
        DatabaseConnection.#instance = await this.initDatabase();
        DatabaseConnection.#initializing = false;

        return DatabaseConnection.#instance;
    }

    static async initDatabase() {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: 'admin',
                database: 'trella_db',
            });

            await this.dropTables(connection);
            await this.createTables(connection);

            return connection;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async dropTables(connection) {
        const dropTables = fs.readFileSync('backend/assets/dropTables.sql', 'utf-8');
        for (let query of dropTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Tables dropped");
    }

    static async createTables(connection) {
        const creationTables = fs.readFileSync('backend/assets/createTables.sql', 'utf-8');
        for (let query of creationTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Tables Updated");

        const sql = "INSERT INTO user (id, firstName, lastName, email, password) " +
            "VALUES (0, 'admin', 'admin', 'admin@admin.com','" + await User.hashPassword("admin") + "')";
        connection.query(sql);
        console.log("- Admin user created");
    }
}

export default DatabaseConnection;