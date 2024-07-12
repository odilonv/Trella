import express from 'express';
import cardRoutes from './cardRoutes.js';

const app = express();
app.use(express.json());
app.use('/cards', cardRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Card service running on port ${PORT}`);
});
