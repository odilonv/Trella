import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme, ...props }) => ({
    borderRadius: '20px',
    color: props.mycolor ? props.mycolor : 'gray',
    border: `1px solid ${props.mycolor ? props.mycolor : 'gray'}`,
    padding: '5px 15px',
    fontSize: '0.8em',
    width: 'fit-content',
    height: '35px',
    whiteSpace: 'nowrap',
    textTransform: 'none',
    fontFamily: 'var(--font)',
    '&:hover': {
        border: `1px solid ${props.mycolor ? props.mycolor : 'gray'}`,
    },
}));

function FilterCircleComponent({ text, color, isSelected, onChange, startIcon, endIcon, gameSlug }) {
    const handleClick = () => {
        gameSlug = gameSlug ? gameSlug : text;
        onChange({ target: { value: gameSlug.toLowerCase().replace(/[: ]/g, '-'), checked: !isSelected } });
    };

    return (
        <StyledButton
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={handleClick}
            mycolor={isSelected ? color : undefined}
        >
            {text}
        </StyledButton>
    );
}

export default FilterCircleComponent;