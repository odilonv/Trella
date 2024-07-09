import React from 'react';

function HeadTextComponent({ titleText, colorTitleText, firstSubText, secondSubText, colorSubText }) {
    return (
        <div>
            <h1 style={{
                fontSize: '3em',
                fontWeight: '700',
                lineHeight: '100%',
                marginBottom: '25px',
                color: colorTitleText ?? 'var(--black)'
            }}>{titleText}</h1>
            {firstSubText && <h5 style={{
                fontSize: '0.8em',
                color: '#706D79',
                fontWeight: 'initial'
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
