// backend/services/boards/boardRoutes.js
import express from 'express';
import {createBoard, getBoardById, updateBoard, getCardsByBoardId, getBoardsByUserId} from './boardController.js';

export const boardRouter = express.Router();

// Routes pour les boards
boardRouter.post('/', createBoard);
boardRouter.get('/:userId', getBoardsByUserId)
boardRouter.get('/:boardId', getBoardById);
boardRouter.put('/:boardId', updateBoard);
boardRouter.get('/cards/:boardId', getCardsByBoardId);
