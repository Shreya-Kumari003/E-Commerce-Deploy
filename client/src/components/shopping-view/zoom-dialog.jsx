import React from 'react';
import './product-Image.css';

function ZoomDialog({ backgroundImage, backgroundPosition, show, mouseX, mouseY, dialogScrollTop }) {
    const dialogWidth = 400;
    const dialogHeight = 400;

    return (
        show && (
            <div
                className="zoom-dialog"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: backgroundPosition,
                    backgroundSize: '280%',
                    left: mouseX - dialogWidth / 2,
                    top: mouseY - dialogHeight / 2 + dialogScrollTop,
                    position: 'absolute',
                    borderRadius: '50%'
                }}
            />
        )
    );
}

export default ZoomDialog;
