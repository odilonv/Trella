import React from 'react';
import { CardComponent } from '../../components';
import HeadBarComponent from '../../components/Head/HeadBarComponent';
import { ApiCards } from '../../services/API/ApiCards';
import { requireLoggedUser, getLoggedUser } from '../../services/API/ApiUserSession';

function CardListPage() {
    const [cardsData, setCardsData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [collapsedBoards, setCollapsedBoards] = React.useState({});

    React.useEffect(() => {
        const fetchCards = async () => {
            await requireLoggedUser();
            try {
                let user = await getLoggedUser();
                const boardData = await ApiCards.getCardsByUserId(user.id);

                // Group cards by board
                const groupedCards = boardData.reduce((acc, card) => {
                    if (!acc[card.boardId]) {
                        acc[card.boardId] = {
                            boardName: card.boardName,
                            cards: []
                        };
                    }
                    acc[card.boardId].cards.push(card);
                    return acc;
                }, {});

                setCardsData(groupedCards);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching board:', error);
            }
        };
        fetchCards();
    }, []);

    const toggleBoardCollapse = (boardId) => {
        setCollapsedBoards(prevState => ({
            ...prevState,
            [boardId]: !prevState[boardId]
        }));
    };

    return (
        isLoading ? <div>Loading...</div> :
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                flexDirection: 'column',
                margin: "15px"
            }}>
                <HeadBarComponent title={'Cards'} setBoard={false} />
                <div
                    className='default-container'
                    style={{
                        display: 'flex',
                        padding: '15px',
                        width: '100%',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        height: '78vh',
                        gap: '15px',
                    }}>
                    {Object.keys(cardsData).map(boardId => (
                        <div key={boardId} style={{ width: '100%' }}>
                            <div
                                onClick={() => toggleBoardCollapse(boardId)}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    marginBottom: '10px'
                                }}
                            >
                                {cardsData[boardId].boardName}
                            </div>
                            {!collapsedBoards[boardId] && (
                                <div style={{ marginLeft: '20px' }}>
                                    {cardsData[boardId].cards.map(card => (
                                        <CardComponent key={card.id} card={card} assignCard={true} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
    )
}

export default CardListPage;
