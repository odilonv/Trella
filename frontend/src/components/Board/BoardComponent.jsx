import React from 'react';
import CardComponent from '../Card/CardComponent';

function BoardComponent({ titleText, colorTitleText, subText, colorSubText, cards }) {
    return (
        <div
            className='default-container'
            style={{
                flexDirection: 'column',
                display: 'flex',
                width: '25%',
                height: '78vh',
                padding: '15px',
                overflowY: 'auto',
            }}>
            <h1 style={{
                fontSize: '1em',
                fontWeight: '600',
                lineHeight: '110%',
                textAlign: 'center',
                width: '100%',
                color: colorTitleText ?? 'var(--black)'
            }}>{titleText}</h1>
            {
                subText && <h5 style={{
                    fontSize: '1.2em',
                    fontWeight: 'initial',
                    textAlign: 'left',
                    color: colorSubText ?? 'var(--black)'
                }}>{subText}</h5>
            }
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '15px 0',
                gap: '10px'

            }}>
                {cards.map((card, index) => (
                    <CardComponent key={index} card={card} />
                ))}
            </div>

        </div >
    );
}

export default BoardComponent;
