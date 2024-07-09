import React, { useState } from "react";
import OverlappingImageComponent from "../image/OverlappingImageComponent";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton } from "@mui/material";

function DropShadowNotificationComponent({ top, bottom, image, handleClose }) {
    return (
        <div className={"drop-shadow"}>
            <div className={"drop-shadow-notification default-container"}>
                <span>{top}</span>
                <OverlappingImageComponent size={200} image={image} />
                <span>{bottom}</span>
                <div className={"drop-shadow-notification-exit"}><IconButton
                    onClick={handleClose}><CloseRoundedIcon /></IconButton></div>
            </div>
        </div>
    );
}

export default DropShadowNotificationComponent;