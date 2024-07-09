import backgroundCloud from "../../assets/images/background-cloud.png";
import React from "react";

function OverlappingImageComponent({ size, image }) {
    return (
        <div className={"overlapping-images"} style={{ height: (size + 100) + 'px', width: (size + 100) + 'px' }}>
            <img src={backgroundCloud} alt={"background"} style={{ width: (size + 100) + 'px', height: 'auto' }} />
            <img src={image} alt={"notification"} style={{ width: size + 'px', height: 'auto' }} />
        </div>
    );
}


export default OverlappingImageComponent;