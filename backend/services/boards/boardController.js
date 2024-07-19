// backend/services/boards/boardController.js
import { v4 as uuidv4 } from 'uuid';
import { BoardService } from './boardService.js';

// Créer un board
export const createBoard = async (req, res) => {
    const { name, user_id} = req.body;
    try {
        const newBoard = await BoardService.createBoard(name, user_id);
        res.status(201).json(newBoard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir un board par ID
export const getBoardById = async (req, res) => {
    const { boardId } = req.params;
    try {
        const board = await BoardService.getBoardById(boardId);
        res.json(board);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Mettre à jour les détails d'un board
export const updateBoard = async (req, res) => {
    const { boardId } = req.params;
    const { name, user_id } = req.body;
    try {
        const updatedBoard = await BoardService.updateBoard(boardId, name, user_id);
        res.json(updatedBoard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCardsByBoardId = async (req, res) => {
    const { boardId } = req.params;
    try {
        const cards = await BoardService.getCardsByBoardId(boardId);
        res.json(cards);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};