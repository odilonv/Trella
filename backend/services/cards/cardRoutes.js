// backend/services/cards/cardRoutes.js
import express from 'express';
import { createCard, getCardById, updateCard } from './cardController.js';

export const cardRouter = express.Router();

// Routes pour les cards
cardRouter.post('/', createCard);
cardRouter.get('/:cardId', getCardById);
cardRouter.put('/:cardId', updateCard);
