// frontend/src/services/API/ApiCards.js
import { getLoggedUser } from './ApiUserSession';

const API_URL = 'http://localhost:5003/cards';

export const ApiCards = {
    createCard: async (title, description, board_id) => {
        const user = await getLoggedUser();
        const user_id = user ? user.id : null;
        if (!user_id) {
            throw new Error('Vous devez être connecté pour créer une carte.');
        }
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, board_id, user_id })
        });
        console.log({ title, description, board_id, user_id })
        return await response.json();
    },

    updateCard: async (cardId, title, description, boardId, state) => {
        const user = await getLoggedUser();
        const user_id = user ? user.id : null;
        const response = await fetch(`${API_URL}/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, boardId, user_id, state })
        });
        return response.json();
    },

    getCardsByUserId: async (userId) => {
        const response = await fetch(`${API_URL}/${userId}`);
        return await response.json();
    }
};