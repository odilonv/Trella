import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ButtonComponent from '../Button/ButtonComponent';

function CardComponent({ title, img, gameSlug, className }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/matches', { state: { gameSlug } });
    };

    return (
        <div className={className || 'game-card'} onClick={handleClick}>
            <img src={img} alt={`${title} cover`} />
            <ButtonComponent
                text={title}
                color="white"
                textColor="var(--main-purple)"
                borderRadius="10px"
                endIcon={<ArrowForwardIosRoundedIcon fontSize='small' />}
                className="game-button"
                fontWeight={600}
            />
        </div>
    );
}

export default CardComponent;