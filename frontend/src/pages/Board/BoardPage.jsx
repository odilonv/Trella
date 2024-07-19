import React, { useEffect, useState } from 'react';
import { BoardComponent, HeadBarComponent } from '../../components';
import { ApiBoards } from '../../services/API/ApiBoards';
import { requireLoggedUser } from '../../services/API/ApiUserSession';

function BoardPage() {
    const [board, setBoard] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchBoard = async () => {
            await requireLoggedUser();
            try {
                const boardId = window.location.pathname.split('/').pop();
                const boardData = await ApiBoards.getBoardById(boardId);
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
                const boardId = 1; // Remplacez par l'ID du tableau
                const cardsData = await ApiBoards.getCardsByBoardId(boardId);
                console.log('cardsData:', cardsData);
                setCards(cardsData);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, []);

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
                        titleFirstButton={'New Board'}
                        titleSecondtButton={'Add Card'}
                    />

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '15px',
                    }}>
                        <BoardComponent titleText={'To Do'} cards={cards.filter(card => card.state === 1)} />
                        <BoardComponent titleText={'Work In Progress'} cards={cards.filter(card => card.state === 2)} />
                        <BoardComponent titleText={'In Testing'} cards={cards.filter(card => card.state === 3)} />
                        <BoardComponent titleText={'Done'} cards={cards.filter(card => card.state === 4)} />
                    </div>
                </div>
            </div>
    );
}

export default BoardPage;
