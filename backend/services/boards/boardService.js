import DatabaseConnection from '../../models/DatabaseConnection.js';
import { UserService } from '../users/userService.js'; 
export const BoardService = {
    createBoard: async (name, description, user_id) => {
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

    getAllBoards: async () => {
        const connection = await DatabaseConnection.getInstance();
        const [rows] = await connection.query('SELECT * FROM board');
        return rows;
    },

    getBoardsByUserId: async (userId) => {
        const connection = await DatabaseConnection.getInstance();
        const [rows] = await connection.query(
            'SELECT * FROM board WHERE user_id = ?',
            [userId]
        );

        return rows;
    },

    getBoardById: async (boardId) => {
        const connection = await DatabaseConnection.getInstance();
        const [rows] = await connection.query(
            'SELECT * FROM board WHERE id = ?',
            [boardId]
        );

        return rows[0];
    },

    updateBoard: async (boardId, name, user_id) => {
        await UserService.getUserById(user_id);

        const connection = await DatabaseConnection.getInstance();
        await connection.query(
            'UPDATE board SET name = ?, user_id = ? WHERE id = ?',
            [name, user_id, boardId]
        );

        return this.getBoardById(boardId);
    },

    getCardsByBoardId: async (boardId) => {
        const connection = await DatabaseConnection.getInstance();
        const [rows] = await connection.query(
            'SELECT * FROM card WHERE board_id = ?',
            [boardId]
        );

        return rows;
    }
};