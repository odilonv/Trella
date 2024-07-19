import DatabaseConnection from '../../models/DatabaseConnection.js';
import { BoardService } from '../boards/boardService.js';
import { UserService } from '../users/userService.js';

export const CardService = {
    createCard: async (title, description, board_id, user_id, state) => {
        const connection = await DatabaseConnection.getInstance();

        const board = await BoardService.getBoardById(board_id);
        if (!board) {
            return { error: 'Board ID does not exist' };
        }

        const user = await UserService.getUserById(user_id);
        if (!user) {
            return { error: 'User ID does not exist' };
        }

        const newCard = {
            title,
            description,
            board_id,
            user_id,
            state
        };

        const [result] = await connection.query(
            'INSERT INTO card (title, description, board_id, user_id, state) VALUES (?, ?, ?, ?, ?)',
            [newCard.title, newCard.description, newCard.board_id, newCard.user_id, newCard.state]
        );

        newCard.id = result.insertId;

        return newCard;
    },

    updateCard: async (cardId, title, description, state) => {
        const connection = await DatabaseConnection.getInstance();
        await connection.query(
            'UPDATE card SET title = ?, description = ?, state = ? WHERE id = ?',
            [title, description, state, cardId]
        );

        return this.getCardById(cardId);
    },

    getCardByUserId: async (userId) => {
        const connection = await DatabaseConnection.getInstance();
        const [rows] = await connection.query(
            'SELECT * FROM card WHERE user_id = ?',
            [userId]
        );

        return rows;
    },
};