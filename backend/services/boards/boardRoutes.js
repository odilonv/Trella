import express from 'express';
import {
    createBoard,
    getBoardById,
    updateBoard,
    getCardsByBoardId,
    getBoardsByUserId,
    getAllBoards
} from './boardController.js';

export const boardRouter = express.Router();

boardRouter.post('/', createBoard);
boardRouter.get('/', getAllBoards);
boardRouter.get('/user/:userId', getBoardsByUserId)
boardRouter.get('/:boardId', getBoardById);
boardRouter.put('/:boardId', updateBoard);
boardRouter.get('/cards/:boardId', getCardsByBoardId);
