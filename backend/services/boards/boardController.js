import {BoardService} from './boardService.js';

export const createBoard = async (req, res) => {
    const {name, description, user_id} = req.body;
    try {
        const newBoard = await BoardService.createBoard(name, description, user_id);
        res.status(201).json(newBoard);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const getAllBoards = async (req, res) => {
    try {
        const boards = await BoardService.getAllBoards();
        res.json(boards);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


export const getBoardsByUserId = async (req, res) => {
    const {userId} = req.params;
    try {
        const boards = await BoardService.getBoardsByUserId(userId);
        res.json(boards);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const getBoardById = async (req, res) => {
    const {boardId} = req.params;
    try {
        const board = await BoardService.getBoardById(boardId);
        res.json(board);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const updateBoard = async (req, res) => {
    const {boardId} = req.params;
    const {name, user_id} = req.body;
    try {
        const updatedBoard = await BoardService.updateBoard(boardId, name, user_id);
        res.json(updatedBoard);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const getCardsByBoardId = async (req, res) => {
    const {boardId} = req.params;
    try {
        const cards = await BoardService.getCardsByBoardId(boardId);
        res.json(cards);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};