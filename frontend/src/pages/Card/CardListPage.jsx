import React from 'react';
import { CardComponent } from '../../components';
import HeadBarComponent from '../../components/Head/HeadBarComponent';
import { ApiCards } from '../../services/API/ApiCards';
import { requireLoggedUser, getLoggedUser } from '../../services/API/ApiUserSession';
import { ApiBoards } from '../../services/API/ApiBoards';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function CardListPage() {
    const [cardsData, setCardsData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [boards, setBoards] = React.useState([]);
    const [openBoards, setOpenBoards] = React.useState(new Set());

    React.useEffect(() => {
        const fetchCards = async () => {
            await requireLoggedUser();
            try {
                let user = await getLoggedUser();
                const cardData = await ApiCards.getCardsByUserId(user.id);
                console.log(cardData);
                setCardsData(cardData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };
        fetchCards();
    }, []);

    React.useEffect(() => {
        const fetchBoards = async () => {
            await requireLoggedUser();
            const user = await getLoggedUser();
            if (!user) return console.error("User not logged in");
            const userId = user.id;
            const fetchedBoards = await ApiBoards.getBoardsByUserId(userId);
            setBoards(Array.isArray(fetchedBoards) ? fetchedBoards : [fetchedBoards]);

            // Set all boards as open by default
            setOpenBoards(new Set(fetchedBoards.map(board => board.id)));
            setIsLoading(false);
        };

        fetchBoards();
    }, []);

    const toggleBoard = (boardId) => {
        setOpenBoards(prevOpenBoards => {
            const newOpenBoards = new Set(prevOpenBoards);
            if (newOpenBoards.has(boardId)) {
                newOpenBoards.delete(boardId);
            } else {
                newOpenBoards.add(boardId);
            }
            return newOpenBoards;
        });
    };

    return (
        isLoading ? <div>Loading...</div> :
            <><div style={{
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
                    {boards.map(board => (
                        <div key={board.id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '10px',
                            marginBottom: '15px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3>{board.name}</h3>
                                <button onClick={() => toggleBoard(board.id)} style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    fontSize: '18px'
                                }}>
                                    {openBoards.has(board.id) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                </button>
                            </div>
                            {openBoards.has(board.id) && (
                                <div style={{ paddingLeft: '20px' }}>
                                    {cardsData.filter(card => card.board_id === board.id).map((card, index) => (
                                        <CardComponent key={index} card={card} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            </>
    )
}

export default CardListPage;
