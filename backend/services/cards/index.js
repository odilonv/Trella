// backend/services/cards/index.js
import express from 'express';
import { cardRouter } from './cardRoutes.js';

const app = express();
const PORT = 5003; // Port pour le service cards

app.use(express.json());

// Montage des routes du service cards
app.use('/cards', cardRouter);

// Point d'entrée pour le service cards
export const startCardsService = () => {
    app.listen(PORT, () => {
        console.log(`Cards service is running on port ${PORT}`);
    });
};
