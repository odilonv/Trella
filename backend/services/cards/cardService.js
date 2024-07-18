// backend/services/cards/cardService.js
import { v4 as uuidv4 } from 'uuid';
import DatabaseConnection from '../../models/DatabaseConnection.js';

export const CardService = {
    // Créer une card
    createCard: async (title, description) => {
        const newCard = {
            id: uuidv4(),
            title,
            description
        };

        const connection = await DatabaseConnection.getInstance();
        await connection.query(
            'INSERT INTO card (id, title, description) VALUES (?, ?, ?)',
            [newCard.id, newCard.title, newCard.description]
        );

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