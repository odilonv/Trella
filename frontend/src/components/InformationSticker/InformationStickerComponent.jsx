import React from "react";

function InformationStickerComponent({ text, color, textColor, size }) {
    return (
        <span style={{ backgroundColor: color, color: textColor, fontSize: size ?? "1em" }}
            className="information-sticker">{text}</span>
    );
}

export default InformationStickerComponent;