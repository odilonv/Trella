import express from 'express';
import Country from '../models/Country.js';

const router = express.Router();

router.get('/api/data/countries', async (req, res) => {
    const countries = await Country.getAll();
    res.send(countries);
});

export default router;
