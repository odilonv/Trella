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

            // await this.dropTables(connection);
            // await this.dropStoredProcedures(connection);
            // await this.insertCountries(connection);
            // await this.createTables(connection);
            // await this.createIndexes(connection);
            // await this.createStoredProcedures(connection);
            // await this.createTriggers(connection);

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

    static async dropStoredProcedures(connection) {
        const dropStoredProcedures = fs.readFileSync('backend/assets/dropStoredProcedures.sql', 'utf-8');
        for (let query of dropStoredProcedures.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Stored procedures dropped");
    }

    static async createTables(connection) {
        const creationTables = fs.readFileSync('backend/assets/createTables.sql', 'utf-8');
        for (let query of creationTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Tables Updated");

        const sql = "INSERT INTO user (id, civility, firstName, lastName, dateOfBirth, countryOfBirth, cityOfBirth, email, emailVerificationToken, emailVerified, phoneNumber, address, complementAddress, city, password, receiveOffers, balance) " +
            "VALUES (0, 'monsieur', 'admin', 'admin', '2003-01-01', 'France', 'Montpellier', 'admin@admin.com', '', true, '0600000000', '65 rue de trella','test', 'test','" + await User.hashPassword("admin") + "', true, 10000)";
        connection.query(sql);
        console.log("- Admin user created");
    }

    static async createIndexes(connection) {
        const creationIndexes = fs.readFileSync('backend/assets/createIndexes.sql', 'utf-8');
        for (let query of creationIndexes.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Indexes created");
    }

    static async insertCountries(connection) {
        const countries = fs.readFileSync('backend/assets/insertCountries.sql', 'utf-8');
        for (let query of countries.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Countries inserted");
    }

    static async createStoredProcedures(connection) {
        const storedProcedures = fs.readFileSync('backend/assets/createStoredProcedures.sql', 'utf-8');
        for (let query of storedProcedures.split('DELIMITER / /')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Stored procedures created");
    }

    static async createTriggers(connection) {
        const triggers = fs.readFileSync('backend/assets/createTriggers.sql', 'utf-8');
        for (let query of triggers.split('DELIMITER / /')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Triggers created");
    }
}

export default DatabaseConnection;