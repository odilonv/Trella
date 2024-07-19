import React from 'react';
import { CardComponent } from '../../components';
import HeadBarComponent from '../../components/Head/HeadBarComponent';
import { ApiCards } from '../../services/API/ApiCards';
import { requireLoggedUser, getLoggedUser } from '../../services/API/ApiUserSession';

function CardListPage() {
    const [cardsData, setCardsData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCards = async () => {
            await requireLoggedUser();
            try {
                let user = await getLoggedUser();
                const boardData = await ApiCards.getCardsByUserId(user.id);
                setCardsData(boardData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching board:', error);
            }
        };
        fetchCards();
    }, []);

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
                    {cardsData.map(card => (
                        <CardComponent key={card.id} card={card} assignCard={true} />
                    ))}
                </div>
            </div>
    )
}



export default CardListPage;