// backend/services/cards/cardRoutes.js
import express from 'express';
import { createCard, updateCard } from './cardController.js';
import {getCardsByBoardId} from "../boards/boardController.js";

export const cardRouter = express.Router();

// Routes pour les cards
cardRouter.post('/', createCard);
cardRouter.get('/board/:boardId', getCardsByBoardId);
cardRouter.put('/:cardId', updateCard);