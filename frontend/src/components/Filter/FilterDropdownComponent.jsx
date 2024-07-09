import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import VideoGame from "../../models/VideoGame";

function FilterDropdownComponent({ text, isSelected, onChange, gameSlug }) {
    const [selected, setSelected] = useState(isSelected);
    const handleClick = (event) => {
        event.stopPropagation();
        setSelected(!selected);
        gameSlug = gameSlug ? gameSlug : text;
        onChange({ target: { value: gameSlug.toLowerCase().replace(/[: ]/g, '-'), checked: !isSelected } });
    };

    return (
        <div onClick={handleClick} className={selected ? "drop-down-filter-selected" : ""}>
            <div className={"drop-down-filter-content"}>
                <img
                    src={VideoGame.getGameImage(gameSlug)}
                    alt={gameSlug}
                />
                {text}
            </div>
            <DoneIcon style={{color: selected ? 'var(--main-purple)' : 'transparent'}}/>
        </div>
    );
}

export default FilterDropdownComponent;
