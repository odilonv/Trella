import express from 'express';
import cors from 'cors';
import { cardRouter } from './cardRoutes.js';

const app = express();
const PORT = 5003; 

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use('/cards', cardRouter);

export const startCardsService = () => {
    app.listen(PORT, () => {
        console.log(`Cards service is running on port ${PORT}`);
    });
};
