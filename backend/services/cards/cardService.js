const cards = [];

export const getCards = () => {
    return cards;
};

export const getCard = (id) => {
    return cards.find(card => card.id === id);
};

export const addCard = (cardData) => {
    const newCard = { id: `${cards.length + 1}`, ...cardData };
    cards.push(newCard);
    return newCard;
};

export const updateCardDetails = (id, cardDetails) => {
    const cardIndex = cards.findIndex(card => card.id === id);
    if (cardIndex !== -1) {
        cards[cardIndex] = { ...cards[cardIndex], ...cardDetails };
        return cards[cardIndex];
    }
    return null;
};
