import express from 'express';
import cors from 'cors';
import session from 'express-session';
import {HomeRoutes, UserRoutes, CountryRoutes} from './routes/Index.js';

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
    cookie: {secure: false} 
}));

const router = express.Router();

app.use(HomeRoutes);
app.use(UserRoutes);
app.use(CountryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
