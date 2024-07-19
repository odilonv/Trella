// backend/services/cards/cardController.js
import { v4 as uuidv4 } from 'uuid';
import { CardService } from './cardService.js';

export const createCard = async (req, res) => {
    const { title, description, board_id, user_id } = req.body;
    const result = await CardService.createCard(title, description, board_id, user_id);

    if (result.error) {
        // Si une erreur est présente, renvoyez un statut 400 avec le message d'erreur
        res.status(400).json({ error: result.error });
    } else {
        // Sinon, renvoyez un statut 201 avec la nouvelle carte
        res.status(201).json(result);
    }
};

// Obtenir une card par ID
export const getCardById = (req, res) => {
    const { cardId } = req.params;
    const card = CardService.getCardById(cardId);
    if (card) {
        res.json(card);
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
};

// Mettre à jour les détails d'une card
export const updateCard = (req, res) => {
    const { cardId } = req.params;
    const { title, description } = req.body;
    const updatedCard = CardService.updateCard(cardId, title, description);
    if (updatedCard) {
        res.json(updatedCard);
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
};