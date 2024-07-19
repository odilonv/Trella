// frontend/src/services/API/ApiBoards.js
import { getLoggedUser } from './ApiUserSession';

const API_URL = 'http://localhost:5002/boards'; // Remplacez par l'URL de votre API

export const ApiBoards = {
    // Créer un board
    createBoard: async (name) => {
        const user = await getLoggedUser();
        const user_id = user ? user.id : null;
        if (!user_id) {
            throw new Error('Vous devez être connecté pour créer un tableau.');
        }
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, user_id })
        });
        return response.json();
    },

    getBoardsByUserId: async (userId) => {
        const response = await fetch(`${API_URL}/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return data ? JSON.parse(data) : {};
    },

    // Obtenir un board par ID
    getBoardById: async (boardId) => {
        const response = await fetch(`${API_URL}/${boardId}`);
        return response.json();
    },

    // Mettre à jour les détails d'un board
    updateBoard: async (boardId, name, user_id) => {
        const response = await fetch(`${API_URL}/${boardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, user_id })
        });
        return response.json();
    },

    // Obtenir les cartes par ID de board
    getCardsByBoardId: async (boardId) => {
        const response = await fetch(`${API_URL}/cards/${boardId}`);
        return response.json();
    }
};