import React from 'react';
import { CardComponent, ButtonComponent } from '../../components';
import HeadBarComponent from '../../components/HeadBar/HeadBarComponent';

function TasksPage() {
    const cardsData = [
        { id: 1, title: 'Tâche 1', description: 'Description de la tâche 1' },
        { id: 2, title: 'Tâche 2', description: 'Description de la tâche 2' },
    ];

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            flexDirection: 'column',
            margin: "15px"
        }}>
            <HeadBarComponent title={'Tasks'} />
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
                    <CardComponent key={card.id} card={card} />
                ))}
            </div>
        </div>
    )
}



export default TasksPage;