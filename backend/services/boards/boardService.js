// backend/services/boards/boardService.js
import { v4 as uuidv4 } from 'uuid';
import DatabaseConnection from '../../models/DatabaseConnection.js';

export const BoardService = {
    // Créer un board
    createBoard: async (name, description) => {
        const newBoard = {
            id: uuidv4(),
            name,
            description
        };

        const connection = await DatabaseConnection.getInstance();
        await connection.query(
            'INSERT INTO board (id, name, description) VALUES (?, ?, ?)',
            [newBoard.id, newBoard.name, newBoard.description]
        );

        return newBoard;
    },

    // Obtenir un board par ID
    getBoardById: async (boardId) => {
        const connection = await DatabaseConnection.getInstance();
        const [rows] = await connection.query(
            'SELECT * FROM board WHERE id = ?',
            [boardId]
        );

        return rows[0];
    },

    // Mettre à jour les détails d'un board
    updateBoard: async (boardId, name, description) => {
        const connection = await DatabaseConnection.getInstance();
        await connection.query(
            'UPDATE board SET name = ?, description = ? WHERE id = ?',
            [name, description, boardId]
        );

        return this.getBoardById(boardId);
    }
};