import React from "react";
import RectangleLoaderComponent from "./RectangleLoaderComponent";

function CircleLoaderComponent({ size, style = null }) {
    return (
        <RectangleLoaderComponent minHeight={size} minWidth={size} style={{
            borderRadius: "50%",
            ...style
        }}></RectangleLoaderComponent>
    );
}

export default CircleLoaderComponent;
