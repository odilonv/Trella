// backend/services/cards/cardService.js
import { v4 as uuidv4 } from 'uuid';
import DatabaseConnection from '../../models/DatabaseConnection.js';
import { BoardService } from '../boards/boardService.js';
import { UserService } from '../users/userService.js';

export const CardService = {
    // Créer une card
    createCard: async (title, description, board_id, user_id) => {
        const connection = await DatabaseConnection.getInstance();

        // Vérifier si le board_id existe
        const board = await BoardService.getBoardById(board_id);
        if (!board) {
            return { error: 'Board ID does not exist' };
        }

        // Vérifier si le user_id existe
        const user = await UserService.getUserById(user_id);
        if (!user) {
            return { error: 'User ID does not exist' };
        }

        const newCard = {
            title,
            description,
            board_id,
            user_id
        };

        const [result] = await connection.query(
            'INSERT INTO card (title, description, board_id, user_id) VALUES (?, ?, ?, ?)',
            [newCard.title, newCard.description, newCard.board_id, newCard.user_id]
        );

        newCard.id = result.insertId;

        return newCard;
    },
    // Obtenir une card par ID
    getCardById: async (cardId) => {
        const connection = await DatabaseConnection.getInstance();
        const [rows] = await connection.query(
            'SELECT * FROM card WHERE id = ?',
            [cardId]
        );

        return rows[0];
    },

    // Mettre à jour les détails d'une card
    updateCard: async (cardId, title, description) => {
        const connection = await DatabaseConnection.getInstance();
        await connection.query(
            'UPDATE card SET title = ?, description = ? WHERE id = ?',
            [title, description, cardId]
        );

        return this.getCardById(cardId);
    }
};