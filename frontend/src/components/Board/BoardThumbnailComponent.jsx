import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

function BoardThumbnailComponent({ board, colorTitleText, colorSubText }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/boards/${board.id}`);
    };

    return (
        <div
            className='default-container'
            style={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'start',
                width: '32.62%',
                padding: '15px',
                height: '100px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
            }}
            onClick={handleClick}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <h1 style={{
                    fontSize: '1em',
                    fontWeight: '700',
                    lineHeight: '110%',
                    width: '100%',
                    color: colorTitleText ?? 'var(--black)'
                }}>{board.name ?? 'Untilted'}</h1>
                <DashboardIcon style={{ fontSize: '1.5em', color: 'var(--main-color)' }} />
            </div>

            {
                board.description && <h5 style={{
                    fontSize: '0.7em',
                    fontWeight: 'initial',
                    textAlign: 'left',
                    color: colorSubText ?? 'var(--black)'
                }}>{board.description}</h5>
            }
        </div >
    );
}

export default BoardThumbnailComponent;