import express from 'express';
import cors from 'cors';
import { boardRouter } from './boardRoutes.js';

const app = express();
const PORT = 5002; // Port pour le service boards

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

// Montage des routes du service boards
app.use('/boards', boardRouter);

// Point d'entrée pour le service boards
export const startBoardsService = () => {
    app.listen(PORT, () => {
        console.log(`Boards service is running on port ${PORT}`);
    });
};
