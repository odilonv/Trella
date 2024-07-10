import React from 'react';
import { Divider, IconButton } from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

function UserInfoComponent({ headerText, value, isEditingComponent, handleSave, handleModify }) {
    const arrayValue = Array.isArray(value) ? value : [];

    const handleCancel = async () => {
        window.location.href = '/user';
    }

    return (
        <div className="user-details default-container" id={headerText}>
            <div className="user-details-header">{headerText}
                {handleSave && handleModify &&
                    <span className="user-info-settings-container">
                        <IconButton
                            style={{ color: 'var(--main-purple)', padding: '0' }}
                            onClick={isEditingComponent ? handleSave : handleModify}
                        >
                            {isEditingComponent ? <DoneRoundedIcon /> : <SettingsRoundedIcon />}
                        </IconButton>
                        {isEditingComponent &&
                            <IconButton style={{ color: 'var(--main-purple)', padding: '0' }} onClick={handleCancel}>
                                <CloseRoundedIcon />
                            </IconButton>
                        }
                    </span>
                }
            </div>
            <Divider />
            {arrayValue.map((item, index) => (
                <div className={`user-details-entry ${index % 2 === 0 ? 'darker-entry' : ''}`}>
                    {item}
                </div>
            ))}
        </div>
    );
}

export default UserInfoComponent;