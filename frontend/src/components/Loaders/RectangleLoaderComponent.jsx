import React from "react";

function RectangleLoaderComponent({ minWidth, minHeight, style = null }) {
    return (
        <div className="colorFade" style={{
            minWidth: `${minWidth}`,
            minHeight: `${minHeight}`,
            height: `${minHeight}`,
            width: `${minWidth}`,
            ...style
        }}></div>
    );
}

export default RectangleLoaderComponent;