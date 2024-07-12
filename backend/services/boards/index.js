import express from 'express';
import boardRoutes from './boardRoutes.js';

const app = express();
app.use(express.json());
app.use('/boards', boardRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Board service running on port ${PORT}`);
});
