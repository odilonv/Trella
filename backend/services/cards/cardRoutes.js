import { Router } from 'express';
import { getAllCards, getCardById, createCard, updateCard } from './cardController.js';

const router = Router();

router.get('/', getAllCards);
router.get('/:cardId', getCardById);
router.post('/', createCard);
router.put('/:cardId', updateCard);

export default router;
