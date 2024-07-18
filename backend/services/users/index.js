import express from 'express';
import cors from 'cors';
import { userRouter } from './userRoutes.js';
import session from 'express-session';

const app = express();
const PORT = 5001; // Port pour le service utilisateur

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(express.json());

// Montage des routes du service utilisateur
app.use('/users', userRouter);

// Point d'entrée pour le service utilisateur
export const startUsersService = () => {
    app.listen(PORT, () => {
        console.log(`Users service is running on port ${PORT}`);
    });
};
