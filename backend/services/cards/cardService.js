// backend/services/cards/cardService.js
import { v4 as uuidv4 } from 'uuid';

// Exemple de stockage temporaire en mémoire
let cards = [];

export const CardService = {
    // Créer une card
    createCard: (title, description) => {
        const newCard = {
            id: uuidv4(),
            title,
            description
        };
        cards.push(newCard);
        return newCard;
    },

    // Obtenir une card par ID
    getCardById: (cardId) => {
        return cards.find(card => card.id === cardId);
    },

    // Mettre à jour les détails d'une card
    updateCard: (cardId, title, description) => {
        const cardIndex = cards.findIndex(card => card.id === cardId);
        if (cardIndex !== -1) {
            cards[cardIndex].title = title;
            cards[cardIndex].description = description;
            return cards[cardIndex];
        }
        return null;
    }
};
