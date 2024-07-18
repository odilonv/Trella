import React from 'react';
import { CardComponent } from '../../components';

function TasksPage() {
    const cardsData = [
        { id: 1, title: 'Tâche 1', description: 'Description de la tâche 1' },
        { id: 2, title: 'Tâche 2', description: 'Description de la tâche 2' },
    ];

    return (
        <div className='default-container' style={{ margin: "15px" }}>
            {cardsData.map(card => (
                <CardComponent key={card.id} card={card} />
            ))}
        </div>
    );
}

export default TasksPage;