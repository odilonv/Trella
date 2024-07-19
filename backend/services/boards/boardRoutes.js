import express from 'express';
import {createBoard, getBoardById, updateBoard, getCardsByBoardId, getBoardsByUserId} from './boardController.js';

export const boardRouter = express.Router();

boardRouter.post('/', createBoard);
boardRouter.get('/user/:userId', getBoardsByUserId)
boardRouter.get('/:boardId', getBoardById);
boardRouter.put('/:boardId', updateBoard);
boardRouter.get('/cards/:boardId', getCardsByBoardId);
