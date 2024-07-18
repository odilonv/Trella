// backend/services/boards/boardController.js
import { v4 as uuidv4 } from 'uuid';
import { BoardService } from './boardService.js';

// Créer un board
export const createBoard = (req, res) => {
    const { name, description } = req.body;
    const newBoard = BoardService.createBoard(name, description);
    res.status(201).json(newBoard);
};

// Obtenir un board par ID
export const getBoardById = (req, res) => {
    const { boardId } = req.params;
    const board = BoardService.getBoardById(boardId);
    if (board) {
        res.json(board);
    } else {
        res.status(404).json({ message: 'Board not found' });
    }
};

// Mettre à jour les détails d'un board
export const updateBoard = (req, res) => {
    const { boardId } = req.params;
    const { name, description } = req.body;
    const updatedBoard = BoardService.updateBoard(boardId, name, description);
    if (updatedBoard) {
        res.json(updatedBoard);
    } else {
        res.status(404).json({ message: 'Board not found' });
    }
};

export const getCardsByBoardId = (req, res) => {
    const { boardId } = req.params;
    const cards = BoardService.getCardsByBoardId(boardId);
    res.json(cards);
}