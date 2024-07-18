// backend/services/cards/cardController.js
import { v4 as uuidv4 } from 'uuid';
import { CardService } from './cardService.js';

// Créer une card
export const createCard = (req, res) => {
    const { title, description } = req.body;
    const newCard = CardService.createCard(title, description);
    res.status(201).json(newCard);
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