import React from 'react';
import ButtonComponent from '../Button/ButtonComponent';

function HeadBarComponent({ title, titleFirstButton, titleSecondtButton, setBoard = true, setCard = true, boardId }) {
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
                {setBoard && <ButtonComponent text={titleFirstButton ?? 'Create Board'} href='/boards/create' margin='0' color={'var(--main-darker-color)'} />}
                {setCard && <ButtonComponent text={titleSecondtButton ?? 'Create Card'} href={`/cards/create/` + boardId} margin='0 0 0 10px' />}
            </div>
        </div>
    );
}

export default HeadBarComponent;
