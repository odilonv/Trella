// backend/services/boards/boardRoutes.js
import express from 'express';
import { createBoard, getBoardById, updateBoard } from './boardController.js';

export const boardRouter = express.Router();

// Routes pour les boards
boardRouter.post('/', createBoard);
boardRouter.get('/:boardId', getBoardById);
boardRouter.put('/:boardId', updateBoard);
