import React from "react";

function RectangleLoaderComponent({ minWidth, minHeight, style = null }) {
    return (
        <div className="color-fade" style={{
            minWidth: `${minWidth}`,
            minHeight: `${minHeight}`,
            height: `${minHeight}`,
            width: `${minWidth}`,
            ...style
        }}></div>
    );
}

export default RectangleLoaderComponent;