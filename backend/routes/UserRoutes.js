import express from 'express';
import User from "../models/User.js";
import crypto from 'crypto';
import UserSession from "../UserSession.js";
import nodemailer from 'nodemailer';
import moment from 'moment-timezone';
import { checkAge, checkIsEmail, checkIsPhoneNumber, checkOnlyAlphabets, checkPassword } from "../services/utils/ValidateUtils.js";

const router = express.Router();
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'trella000@gmail.com',
        pass: 'rknb nlmb xybp pbcx'
    }
});

const sendConfirmationEmail = async (userEmail, token, firstname, lastname) => {
    const mailOptions = {
        from: '"trella" <trella000@gmail.com>',
        to: userEmail,
        subject: 'Confirmation de votre adresse email',
        html:
            `
                <div>
                    <h1> Bienvenue ${firstname} ${lastname} </h1>
                    <p style={{ marginTop: '50px' }}> Merci de vous être inscris chez trella. </p>
                    <p> Cliquez sur le bouton ci-dessous pour confirmer votre adresse email : </p>
                    <div style="margin-top: 50px;">
                        <a style="display: inline-block; background-color: #7161EC; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;"
                        href="http://localhost:3000/verifyEmail/${token}">Confirmer</a>
                    </div>
                    <div style="margin-top: 50px;">
                        <p> Bonne journée, </p>
                        <h2> trella </h2>
                    </div> 
                </div>
            `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        return false;
    }
};

router.post('/api/data/session/register', async (req, res) => {
    try {
        let user = User.fromJson(req.body.user);
        let countriesList = await Country.getAll();

        if (['Monsieur', 'Madame'].includes(user.civility)
            && checkOnlyAlphabets(user.lastName) === null
            && checkOnlyAlphabets(user.firstName) === null
            && checkAge(new Date(user.dateOfBirth)) === null
            && countriesList.some(countryOfBirth => countryOfBirth.name === user.countryOfBirth)
            // && citySuggestions.includes(user.cityOfBirth)
            && checkIsEmail(user.email) == null
            && checkIsPhoneNumber(user.phoneNumber) == null
            // && addressSuggestions.includes(user.address)
            // && citySuggestions.includes(user.city)
            && checkPassword(user.password) == null
            // && user.password === user.confirmPassword
        ) {

            let token = generateRandomString(32);
            user.emailVerificationToken = token;
            const emailExists = await User.doesEmailExist(user.email);
            if (emailExists) {
                return res.status(400).json({ error: 'Cet email est déjà utilisé. Veuillez en choisir un autre.' });
            }

            const emailSent = await sendConfirmationEmail(user.email, token, user.firstName, user.lastName);
            if (emailSent) {
                req.session.user = await user.insert();
                res.status(200).json({ message: 'Inscription réussie', redirectTo: '/login' });
            } else {
                res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email de confirmation' });
            }
        } else {
            return res.status(400).json({ error: 'Veuillez remplir les champs correctement.' });
        }
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});

router.post('/api/data/session/forgotPassword', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Aucun utilisateur trouvé avec cet e-mail.' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expirationMinutes = 60; // Token expires in 60 minutes
        const tokenExpiration = Date.now() + expirationMinutes * 60000;
        const hourEmail = moment(tokenExpiration).tz('Europe/Paris').format('HH:mm');
        const tokenExpirationDate = moment(tokenExpiration).tz('Europe/Paris').format('YYYY-MM-DD HH:mm');

        await User.updatePasswordResetToken(user.id, token, tokenExpirationDate);
        const resetLink = `http://localhost:3000/changePassword?token=${token}`;
        const mailOptions = {
            from: 'trella000@gmail.com',
            to: email,
            subject: 'Réinitialisation du mot de passe',
            html:
                `
            <div>
                <h1> Bonjour ${user.firstName} ${user.lastName} </h1>
                <p style="margin-top: 50px;"> Vous avez demandé une réinitialisation de mot de passe. </p>
                <p> Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe : </p>
                <p> Ce lien expirera à ${hourEmail} </p>
                <div style="margin-top: 50px;">
                    <a style="display: inline-block; background-color: #7161EC; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;" href="${resetLink}">Modifier le mot de passe</a>
                </div>
                <div style="margin-top: 50px;">
                    <p> Bonne journée, </p>
                    <h2> trella </h2>
                </div> 
            </div>
            `,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.' });
    } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation de mot de passe :', error);
        res.status(500).json({ error: 'Erreur lors de la demande de réinitialisation de mot de passe.' });
    }
});

router.post('/api/data/session/resetPassword', async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'Les mots de passe ne correspondent pas.' });
        }

        const user = await User.findByPasswordResetToken(token);
        if (!user || user.passwordResetTokenExpiration < Date.now()) {
            return res.status(400).json({ error: 'Jeton invalide ou expiré.' });
        }

        await User.updatePassword(user.id, newPassword);
        await User.clearPasswordResetToken(user.id);
        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe :', error);
        res.status(500).json({ error: 'Erreur lors de la réinitialisation du mot de passe.' });
    }
});

router.post('/api/data/session/login', async (req, res) => {
    try {
        const userData = req.body.user;
        const user = await User.authenticate(userData.email, userData.password);
        if (user) {
            req.session.user = user;
            res.status(200).json({ message: 'Connexion réussie', redirectTo: '/home' });
        } else {
            res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
    } catch (error) {
        console.error('Erreur lors de l\'authentification de l\'utilisateur : ', error);
        res.status(500).json({ error: 'Erreur lors de l\'authentification de l\'utilisateur' });
    }
});

router.post('/api/data/session/user', async (req, res) => {
    try {
        const userData = req.body;
        //Vérifier l'unicité de l'e-mail
        const emailExists = await User.doesEmailExistForUpdate(userData.email, userData.id);
        if (emailExists) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé. Veuillez en choisir un autre.' });
        }
        // Mise à jour des données
        const updatedUser = await User.updateUser(userData);
        req.session.user = updatedUser;
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
});

router.post('/api/data/session/userDetails', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.json({ user });
    } else {
        res.json({ user: null });
    }
});

router.delete('/api/data/session/deleteAccount', async (req, res) => {
    try {
        const userId = req.session.user.id;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Mot de passe est requis.' });
        }

        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Aucun utilisateur trouvé avec cet ID.' });
        }

        const passwordMatch = await User.verifyPassword(userId, password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
        }

        const userDeleted = await User.deleteUserByID(userId);
        if (userDeleted) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Erreur lors de la destruction de la session :', err);
                    res.status(500).json({ error: 'Erreur lors de la déconnexion' });
                } else {
                    res.clearCookie('connect.sid');
                    res.status(200).json({ message: 'Compte supprimé avec succès' });
                }
            });
        } else {
            res.status(404).json({ error: 'Aucun utilisateur trouvé avec cet ID.' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du compte :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression du compte' });
    }
});

router.post('/api/data/session/changePassword', async (req, res) => {
    try {
        console.log(req.session.user);
        const userId = req.session.user.id;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        console.log(userId, oldPassword, newPassword, confirmPassword)

        const passwordMatch = await User.verifyPassword(userId, oldPassword);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'Les mots de passe ne correspondent pas' });
        }
        const updateSuccess = await User.updatePassword(userId, newPassword);
        if (updateSuccess) {
            res.status(200).json({ message: 'Le mot de passe a été mis à jour avec succès' });
        } else {
            res.status(404).json({ error: 'Impossible de mettre à jour le mot de passe, utilisateur introuvable' });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe' });
    }
});

router.get('/api/data/user/verifyEmail/:token', async (req, res) => {
    const token = req.params.token;
    let emailVerified = await User.verifyEmail(token);
    if (emailVerified === 1) {
        res.status(200).json({ message: 'Email vérifié avec succès', status: 'success' });
    } else if (emailVerified === 0) {
        res.status(200).json({ message: 'Email déjà vérifié', status: 'error' });
    } else {
        res.status(200).json({ message: 'Lien invalide', status: 'error' });
    }
});

router.get('/api/data/session', async (req, res) => {
    if (UserSession.isActive(req)) {
        const user = await User.getUserById(req.session.user.id);
        req.session.user.balance = user.balance;
        req.session.user.ongoingBets = await Bet.getAllOngoingBets(req.session.user.id);
        const finishedBets = await Bet.checkForFinishedBets(req.session.user.id);
        req.session.user.finishedBets = finishedBets.length > 0 ? finishedBets : req.session.user.finishedBets;
        res.status(200).send({ message: 'Session is active', user: req.session.user, finishedBets: finishedBets });
    } else {
        res.status(202).send({ message: 'No active session', user: false });
    }
});

router.post('/api/data/session/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la destruction de la session :', err);
            res.status(500).json({ error: 'Erreur lors de la déconnexion' });
        } else {
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Déconnexion réussie' });
        }
    });
});

function generateRandomString(length = 16) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

export default router;