import { getBoards, getBoard, addBoard, updateBoardDetails } from './boardService.js';

export const getAllBoards = (req, res) => {
    const boards = getBoards();
    res.status(200).json(boards);
};

export const getBoardById = (req, res) => {
    const { boardId } = req.params;
    const board = getBoard(boardId);
    if (board) {
        res.status(200).json(board);
    } else {
        res.status(404).send('Board not found');
    }
};

export const createBoard = (req, res) => {
    const newBoard = addBoard(req.body);
    res.status(201).json(newBoard);
};

export const updateBoard = (req, res) => {
    const { boardId } = req.params;
    const updatedBoard = updateBoardDetails(boardId, req.body);
    if (updatedBoard) {
        res.status(200).json(updatedBoard);
    } else {
        res.status(404).send('Board not found');
    }
};
