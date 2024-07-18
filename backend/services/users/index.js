// backend/services/users/index.js
import express from 'express';
import { userRouter } from './userRoutes.js';

const app = express();
const PORT = 5001; // Port pour le service utilisateur

app.use(express.json());

// Montage des routes du service utilisateur
app.use('/users', userRouter);

// Point d'entrée pour le service utilisateur
export const startUsersService = () => {
    app.listen(PORT, () => {
        console.log(`Users service is running on port ${PORT}`);
    });
};
