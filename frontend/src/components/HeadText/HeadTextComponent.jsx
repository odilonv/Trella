import React from 'react';

function HeadTextComponent({ titleText, colorTitleText, firstSubText, secondSubText, colorSubText }) {
    return (
        <div
            style={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'start'
            }}>
            <h1 style={{
                fontSize: '3em',
                fontWeight: '700',
                lineHeight: '110%',
                marginBottom: '25px',
                textAlign: 'left',
                color: colorTitleText ?? 'var(--black)'
            }}>{titleText}</h1>
            {firstSubText && <h5 style={{
                fontSize: '1.2em',
                color: '#706D79',
                fontWeight: 'initial',
                textAlign: 'left',

            }}>{firstSubText}</h5>}
            {secondSubText && <h5 style={{
                fontSize: '0.8em',
                color: colorSubText ?? '#706D79',
                fontWeight: 'initial'
            }}>{secondSubText}</h5>}
        </div>
    );
}

export default HeadTextComponent;
