// backend/services/boards/boardService.js
import { v4 as uuidv4 } from 'uuid';

// Exemple de stockage temporaire en mémoire
let boards = [];

export const BoardService = {
    // Créer un board
    createBoard: (name, description) => {
        const newBoard = {
            id: uuidv4(),
            name,
            description
        };
        boards.push(newBoard);
        return newBoard;
    },

    // Obtenir un board par ID
    getBoardById: (boardId) => {
        return boards.find(board => board.id === boardId);
    },


    // Mettre à jour les détails d'un board
    updateBoard: (boardId, name, description) => {
        const boardIndex = boards.findIndex(board => board.id === boardId);
        if (boardIndex !== -1) {
            boards[boardIndex].name = name;
            boards[boardIndex].description = description;
            return boards[boardIndex];
        }
        return null;
    },

    getCardsByBoardId: (boardId) => {
        return cards.filter(card => card.boardId === boardId);
    }
};
