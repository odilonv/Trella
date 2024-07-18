import React from 'react';

function CardComponent({ card, colorTitleText, colorSubText }) {
    return (
        <div
            className='default-container'
            style={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'start',
                width: '100%',
                height: '100%',
                padding: '15px',
                backgroundColor: 'var(--light-color)',
            }}>
            <h1 style={{
                fontSize: '0.9em',
                fontWeight: '600',
                lineHeight: '110%',
                width: '100%',
                color: colorTitleText ?? 'var(--black)'
            }}>{card.title}</h1>
            {
                card.description && <h5 style={{
                    fontSize: '0.7em',
                    fontWeight: 'initial',
                    textAlign: 'left',
                    color: colorSubText ?? 'var(--black)'
                }}>{card.description}</h5>
            }
        </div >
    );
}

export default CardComponent;