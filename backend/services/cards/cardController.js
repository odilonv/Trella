import { CardService } from './cardService.js';

export const createCard = async (req, res) => {
    const { title, description, board_id, user_id } = req.body;
    const result = await CardService.createCard(title, description, board_id, user_id);

    if (result.error) {
        res.status(400).json({ error: result.error });
    } else {
        res.status(201).json(result);
    }
};

export const updateCard = (req, res) => {
    console.log("updateCard");
    console.log(req.body);
    const { cardId } = req.params;
    const { title, description, state, boardId } = req.body;
    const updatedCard = CardService.updateCard(cardId, title, description, boardId, state);
    if (updatedCard) {
        res.json(updatedCard);
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
};

export const getCardByUserId = async (req, res) => {
    const { userId } = req.params;
    const cards = await CardService.getCardByUserId(userId);
    res.json(cards);
}