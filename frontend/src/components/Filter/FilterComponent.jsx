import React from "react";
import FilterEntryComponent from './FilterEntryComponent';

function FilterComponent({ activeFilter, filterValues, onClickHandler }) {
    return (
        <div className={"filter-container noSelect"}>
            <div className="filter noSelect">
                {filterValues.map((filterValue, index) => (
                    <FilterEntryComponent
                        key={index}
                        className="noSelect filter-entry"
                        activeFilter={activeFilter}
                        value={filterValue}
                        onClickHandler={onClickHandler}
                    />
                ))}
            </div>
        </div>
    );
}

export default FilterComponent;