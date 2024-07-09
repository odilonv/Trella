import express from 'express';

const router = express.Router();

router.post('/home', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.json({user});
    } else {
        res.json({user: null});
    }
});

export default router;