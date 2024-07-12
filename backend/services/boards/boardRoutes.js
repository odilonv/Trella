import { Router } from 'express';
import { getAllBoards, getBoardById, createBoard, updateBoard } from './boardController.js';

const router = Router();

router.get('/', getAllBoards);
router.get('/:boardId', getBoardById);
router.post('/', createBoard);
router.put('/:boardId', updateBoard);

export default router;
