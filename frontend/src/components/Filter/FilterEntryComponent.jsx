import React from "react";

function FilterEntryComponent({ className, activeFilter, value, onClickHandler }) {
    return (
        <div
            className={`${className} ${activeFilter === value ? 'filter-entry-active' : ''}`}
            onClick={onClickHandler}
            spellCheck="false">{value}</div>
    );
}

export default FilterEntryComponent;