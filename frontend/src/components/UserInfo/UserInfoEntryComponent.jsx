import React from 'react';

function UserInfoEntryComponent({ entryLabel, entryValue, darker = false }) {
    return (
        <div className={darker ? "user-details-entry darker-entry" : "user-details-entry"}>
            <div className="user-details-entry-label">{entryLabel}</div>
            <div className="user-details-entry-value">{entryValue}</div>
        </div>
    );
}

export default UserInfoEntryComponent;
