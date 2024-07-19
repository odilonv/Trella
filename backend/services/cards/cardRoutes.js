import express from 'express';
import { createCard, getCardById, updateCard } from './cardController.js';

export const cardRouter = express.Router();

cardRouter.post('/', createCard);
cardRouter.get('/:cardId', getCardById);
cardRouter.put('/:cardId', updateCard);
