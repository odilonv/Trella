import databaseConnection from './DatabaseConnection.js';
import bcrypt from 'bcrypt';
import moment from 'moment-timezone';


class User {

    static tableName = 'user';
    static fields = ['id', 'civility', 'firstName', 'lastName', 'dateOfBirth', 'countryOfBirth', 'cityOfBirth', 'email', 'emailVerificationToken', 'emailVerified', 'phoneNumber', 'address', 'complementAddress', 'city', 'passwordResetToken', 'passwordResetTokenExpiration', 'password', 'balance', 'receiveOffers', 'depositLimit', 'betLimit', 'automaticWithdraw', 'selfExclusion', 'selfExclusionDate', 'currency', 'language', 'timezone', 'theme'];

    constructor(id, civility, firstName, lastName, dateOfBirth, countryOfBirth, cityOfBirth, email, emailVerificationToken, emailVerified, phoneNumber, address, complementAddress, city, passwordResetToken, passwordResetTokenExpiration, password, balance, receiveOffers, depositLimit, betLimit, automaticWithdraw, selfExclusion, selfExclusionDate, currency, language, timezone, theme) {
        this.id = id;
        this.civility = civility;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.countryOfBirth = countryOfBirth;
        this.cityOfBirth = cityOfBirth;
        this.email = email;
        this.emailVerificationToken = emailVerificationToken;
        this.emailVerified = emailVerified;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.complementAddress = complementAddress;
        this.city = city;
        this.passwordResetToken = passwordResetToken;
        this.passwordResetTokenExpiration = passwordResetTokenExpiration;
        this.password = password;
        this.balance = balance;
        this.receiveOffers = receiveOffers;
        this.depositLimit = depositLimit;
        this.betLimit = betLimit;
        this.automaticWithdraw = automaticWithdraw;
        this.selfExclusion = selfExclusion;
        this.selfExclusionDate = selfExclusionDate;
        this.currency = currency;
        this.language = language;
        this.timezone = timezone;
        this.theme = theme;
    }

    static fromDatabase(data) {
        return new User(data.id, data.civility, data.firstName, data.lastName, moment(data.dateOfBirth).tz('Europe/Paris').format('YYYY-MM-DD'),
            data.countryOfBirth, data.cityOfBirth, data.email, data.emailVerificationToken, data.emailVerified,
            data.phoneNumber, data.address, data.complementAddress, data.city, data.passwordResetToken,
            data.passwordResetTokenExpiration,
            data.password, data.balance, data.receiveOffers, data.depositLimit, data.betLimit,
            data.automaticWithdraw, data.selfExclusion, data.selfExclusionDate,
            data.currency, data.language, data.timezone, data.theme);
    }

    static fromJson(data) {
        return new User(data.id, data.civility, data.firstName, data.lastName, data.dateOfBirth, data.countryOfBirth, data.cityOfBirth, data.email, data.emailVerificationToken, data.emailVerified, data.phoneNumber, data.address, data.complementAddress, data.city, data.passwordResetToken, data.passwordResetTokenExpiration, data.password, data.balance, data.receiveOffers, data.depositLimit, data.betLimit, data.automaticWithdraw, data.selfExclusion, data.selfExclusionDate, data.currency, data.language, data.timezone, data.theme);
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

    static async verifyEmail(token) {
        const connection = await databaseConnection.getInstance();
        const [results] = await connection.query('SELECT * FROM ' + this.tableName + ' WHERE emailVerificationToken = ?', [token]);
        if (results.length > 0) {
            let user = User.fromDatabase(results[0]);
            if (user.emailVerified === 1) {
                return 0;
            }
            await connection.query('UPDATE ' + this.tableName + ' SET emailVerified = 1 WHERE id = ?', [user.id]);
            return 1;
        }
        return -1;
    }

    static async verifyPassword(userId, password) {
        const connection = await databaseConnection.getInstance();
        const [results] = await connection.query('SELECT password FROM ' + this.tableName + ' WHERE id = ?', [userId]);
        if (results.length > 0) {
            const hashedPassword = results[0].password;
            if (!password || !hashedPassword) {
                console.error('Password or hashed password is missing');
                return false;
            }
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            return passwordMatch;
        }
        return false;
    }

    static async doesEmailExist(email) {
        const connection = await databaseConnection.getInstance();
        const [results] = await connection.query('SELECT COUNT(*) AS count FROM ' + this.tableName + ' WHERE email = ?', [email]);
        return results[0].count > 0;
    }

    static async doesEmailExistForUpdate(email, userId) {
        const connection = await databaseConnection.getInstance();
        const [results] = await connection.query('SELECT COUNT(*) AS count FROM user WHERE email = ? AND id != ?', [email, userId]);
        return results[0].count > 0;
    }

    static async updateUser(user) {
        const connection = await databaseConnection.getInstance();
        const {
            id,
            civility,
            firstName,
            lastName,
            dateOfBirth,
            countryOfBirth,
            cityOfBirth,
            email,
            phoneNumber,
            address,
            complementAddress,
            city,
            password,
            receiveOffers,
            depositLimit,
            betLimit,
            automaticWithdraw,
            selfExclusion,
            selfExclusionDate,
            currency,
            language,
            timezone,
            theme
        } = user;

        const sql = `
            UPDATE user
            SET civility          = ?,
                firstName         = ?,
                lastName          = ?,
                dateOfBirth       = ?,
                countryOfBirth    = ?,
                cityOfBirth       = ?,
                email             = ?,
                phoneNumber       = ?,
                address           = ?,
                complementAddress  = ?,
                city              = ?,
                password          = ?,
                receiveOffers     = ?,
                depositLimit      = ?,
                betLimit          = ?,
                automaticWithdraw = ?,
                selfExclusion     = ?,
                selfExclusionDate = ?,
                currency          = ?,
                language          = ?,
                timezone          = ?,
                theme             = ?
            WHERE id = ?
        `;

        const formattedBirthDate = new Date(dateOfBirth).toLocaleDateString("fr");
        const date = formattedBirthDate.split('/');
        const jour = date[0];
        const mois = date[1];
        const annee = date[2];
        const dateFinal = annee + "-" + mois + "-" + jour;
        const values = [
            civility,
            firstName,
            lastName,
            dateFinal,
            countryOfBirth,
            cityOfBirth,
            email,
            phoneNumber,
            address,
            complementAddress,
            city,
            password,
            receiveOffers,
            depositLimit,
            betLimit,
            automaticWithdraw,
            selfExclusion,
            selfExclusionDate,
            currency,
            language,
            timezone,
            theme,
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

    static async updatePasswordResetToken(userId, token, tokenExpiration) {
        const connection = await databaseConnection.getInstance();
        const sql = 'UPDATE user SET passwordResetToken = ?, passwordResetTokenExpiration = ? WHERE id = ?';
        const [results] = await connection.query(sql, [token, tokenExpiration, userId]);
        return results.affectedRows > 0;
    }

    static async clearPasswordResetToken(userId) {
        const connection = await databaseConnection.getInstance();
        const sql = 'UPDATE user SET passwordResetToken = NULL, passwordResetTokenExpiration = NULL WHERE id = ?';
        const [results] = await connection.query(sql, [userId]);
        return results.affectedRows > 0;
    }

    static async findByPasswordResetToken(token) {
        const connection = await databaseConnection.getInstance();
        const [results] = await connection.query('SELECT * FROM ' + this.tableName + ' WHERE passwordResetToken = ?', [token]);
        if (results.length > 0) {
            return User.fromDatabase(results[0]);
        }
        return null;
    }

    static async findByEmail(email) {
        try {
            const connection = await databaseConnection.getInstance();
            const [results] = await connection.query('SELECT * FROM ' + this.tableName + ' WHERE email = ?', [email]);
            if (results.length > 0) {
                return User.fromDatabase(results[0]);
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la recherche de l\'utilisateur par email :', error);
            throw new Error('Erreur lors de la recherche de l\'utilisateur par email');
        }
    }

    static async updateBalance(userId, amount) {
        const connection = await databaseConnection.getInstance();
        const sql = 'UPDATE user SET balance = balance + ? WHERE id = ?';
        const [results] = await connection.query(sql, [amount, userId]);
        return results.affectedRows > 0;
    }

    async insert() {
        const connection = await databaseConnection.getInstance();
        const formattedBirthDate = new Date(this.dateOfBirth);
        const formattedBirthDateString = formattedBirthDate.toISOString().split('T')[0];
        const hashedPassword = await User.hashPassword(this.password);

        const sql = `INSERT INTO ${User.tableName}
                         (${User.fields.filter(field => field !== 'id').join(', ')})
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [results] = await connection.query(sql, [
            this.civility, this.firstName, this.lastName, formattedBirthDateString,
            this.countryOfBirth, this.cityOfBirth, this.email, this.emailVerificationToken, false,
            this.phoneNumber, this.address, this.complementAddress, this.city,
            this.passwordResetToken, this.passwordResetTokenExpiration,
            hashedPassword, /*this.balance*/ 10000, this.receiveOffers, this.depositLimit,
            this.betLimit, this.automaticWithdraw, this.selfExclusion, this.selfExclusionDate,
            this.currency, this.language, this.timezone, this.theme
        ]);
        this.id = results.insertId;
    }
}

export default User;
