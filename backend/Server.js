// backend/server.js
import express from 'express';
import cors from 'cors';
import session from 'express-session';
// Importez ici d'autres fonctions pour démarrer d'autres services si nécessaire

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Importez d'autres routes principales si nécessaire
import { startUsersService } from './services/users/index.js';
import { startBoardsService } from './services/boards/index.js'; // Exemple si vous avez un service boards
import { startCardsService } from './services/cards/index.js'; // Exemple si vous avez un service cards

// Démarrage des services
startUsersService();
startBoardsService(); // Démarrez le service des tableaux si nécessaire
startCardsService(); // Démarrez le service des cartes si nécessaire

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
