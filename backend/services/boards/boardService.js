const boards = [];

export const getBoards = () => {
    return boards;
};

export const getBoard = (id) => {
    return boards.find(board => board.id === id);
};

export const addBoard = (boardData) => {
    const newBoard = { id: `${boards.length + 1}`, ...boardData };
    boards.push(newBoard);
    return newBoard;
};

export const updateBoardDetails = (id, boardDetails) => {
    const boardIndex = boards.findIndex(board => board.id === id);
    if (boardIndex !== -1) {
        boards[boardIndex] = { ...boards[boardIndex], ...boardDetails };
        return boards[boardIndex];
    }
    return null;
};
