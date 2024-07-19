import express from 'express';
import { createCard, getCardByUserId, updateCard } from './cardController.js';

export const cardRouter = express.Router();

cardRouter.post('/', createCard);
cardRouter.get('/:userId', getCardByUserId);
cardRouter.put('/:cardId', updateCard);
