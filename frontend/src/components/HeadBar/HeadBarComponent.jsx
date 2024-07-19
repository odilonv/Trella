import React from 'react';
import ButtonComponent from '../Button/ButtonComponent';

function HeadBarComponent({ title }) {
    return (
        <div
            className='default-container'
            style={{
                display: 'flex',
                width: '100%',
                padding: '15px',
                justifyContent: 'space-between',
                margin: '0 0 15px 0',
                gap: '10px',
            }}>
            <h2>{title}</h2>
            <div>
                <ButtonComponent text='Create Board' href='/create-board' margin='0' color={'var(--main-darker-color)'} />
                <ButtonComponent text='Create Task' href='/create-card' margin='0 0 0 10px' />
            </div>
        </div>
    );
}

export default HeadBarComponent;
