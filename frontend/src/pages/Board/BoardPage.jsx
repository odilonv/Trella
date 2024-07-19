import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardComponent, HeadBarComponent } from '../../components';
import { ApiBoards } from '../../services/API/ApiBoards';
import { ApiCards } from '../../services/API/ApiCards';
import { requireLoggedUser } from '../../services/API/ApiUserSession';

const stateNames = {
    1: 'To Do',
    2: 'Work In Progress',
    3: 'In Testing',
    4: 'Done'
};

function BoardPage() {
    const [board, setBoard] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [boardId, setBoardId] = useState('');

    useEffect(() => {
        const fetchBoard = async () => {
            await requireLoggedUser();
            try {
                let urlBoardId = window.location.pathname.split('/').pop();
                setBoardId(urlBoardId);
                const boardData = await ApiBoards.getBoardById(urlBoardId);
                setBoard(boardData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching board:', error);
            }
        };

        fetchBoard();
    }, []);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const boardId = window.location.pathname.split('/').pop();
                const cardsData = await ApiBoards.getCardsByBoardId(boardId);
                setCards(cardsData);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, []);

    const onDragEnd = async (result) => {
        const { source, destination } = result;

        // Dropped outside the list
        if (!destination) return;

        const sourceState = parseInt(source.droppableId);
        const destinationState = parseInt(destination.droppableId);

        if (sourceState === destinationState && source.index === destination.index) return;

        const movedCard = cards.find(card => card.id === parseInt(result.draggableId));
        const updatedCard = { ...movedCard, state: destinationState };

        // Update card state on server
        await ApiCards.updateCard(updatedCard.id, updatedCard.title, updatedCard.description, board.id, updatedCard.state);

        // Update card state in local state
        setCards(cards.map(card => card.id === updatedCard.id ? updatedCard : card));
    };

    return (
        isLoading ? <div>Loading...</div> :
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    flexDirection: 'column',
                    margin: "15px"
                }}>
                    <HeadBarComponent
                        title={board.name}
                        boardId={boardId}
                        titleSecondtButton={'Add Card'}
                    />

                    <DragDropContext onDragEnd={onDragEnd}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            gap: '15px',
                        }}>
                            {Object.keys(stateNames).map(state => (
                                <BoardComponent
                                    key={state}
                                    titleText={stateNames[state]}
                                    cards={cards.filter(card => card.state === parseInt(state))}
                                />
                            ))}
                        </div>
                    </DragDropContext>
                </div>
            </div>
    );
}

export default BoardPage;
