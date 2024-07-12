import { getCards, getCard, addCard, updateCardDetails } from './cardService.js';

export const getAllCards = (req, res) => {
    const cards = getCards();
    res.status(200).json(cards);
};

export const getCardById = (req, res) => {
    const { cardId } = req.params;
    const card = getCard(cardId);
    if (card) {
        res.status(200).json(card);
    } else {
        res.status(404).send('Card not found');
    }
};

export const createCard = (req, res) => {
    const newCard = addCard(req.body);
    res.status(201).json(newCard);
};

export const updateCard = (req, res) => {
    const { cardId } = req.params;
    const updatedCard = updateCardDetails(cardId, req.body);
    if (updatedCard) {
        res.status(200).json(updatedCard);
    } else {
        res.status(404).send('Card not found');
    }
};
