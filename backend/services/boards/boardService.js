// backend/services/boards/boardService.js
import { v4 as uuidv4 } from 'uuid';
import DatabaseConnection from '../../models/DatabaseConnection.js';
import { UserService } from '../users/userService.js'; // Import UserService

export const BoardService = {
    // Créer un board
    createBoard: async (name, description, user_id) => {
        // Vérifie si l'utilisateur existe
        const user = await UserService.getUserById(user_id);
        if (!user) {
            return { error: 'User ID does not exist' };
        }

        const newBoard = {
            name,
            description,
            user_id
        };

        const connection = await DatabaseConnection.getInstance();
        await connection.query(
            'INSERT INTO board (name, description, user_id) VALUES (?, ?, ?)',
            [newBoard.name, newBoard.description, newBoard.user_id]
        );

        return newBoard;
    },

    getBoardsByUserId: async (userId) => {
        const connection = await DatabaseConnection.getInstance();
        const [rows] = await connection.query(
            'SELECT * FROM board WHERE user_id = ?',
            [userId]
        );

        return rows;
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
    updateBoard: async (boardId, name, user_id) => {
        // Vérifie si l'utilisateur existe
        await UserService.getUserById(user_id);

        const connection = await DatabaseConnection.getInstance();
        await connection.query(
            'UPDATE board SET name = ?, user_id = ? WHERE id = ?',
            [name, user_id, boardId]
        );

        return this.getBoardById(boardId);
    },

    getCardsByBoardId: (boardId) => {
        return cards.filter(card => card.boardId === boardId);
    }
};