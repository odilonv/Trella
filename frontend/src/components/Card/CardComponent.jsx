import React from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';

function CardComponent({ card, colorTitleText, colorSubText, assignCard = false }) {
    return (
        <div
            className='default-container'
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                width: '100%',
                padding: '15px',
                backgroundColor: 'var(--light-color)',
            }}>
            <div
                style={{
                    flexDirection: 'column',
                    display: 'flex',
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
            </div>
            {
                assignCard && <ButtonComponent text={'Assign to'} endIcon={<DashboardCustomizeRoundedIcon style={{ fill: 'white' }} />} />
            }
        </div>
    );
}

export default CardComponent;