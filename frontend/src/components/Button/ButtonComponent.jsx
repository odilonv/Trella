import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function ButtonComponent({
    text,
    color,
    textColor,
    href,
    onClick,
    borderRadius,
    startIcon,
    endIcon,
    type,
    size,
    className,
    fontWeight,
    disabled = false,
    preventValidation = false,
    margin = '8px',
    target = '_self'
}) {
    return (
        <Button
            variant='contained'
            startIcon={startIcon}
            endIcon={endIcon}
            component={Link}
            to={href}
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={className}
            target={target}
            style={{
                backgroundColor: preventValidation ? 'var(--light-color)' : color ?? 'var(--main-color)',
                color: textColor ?? 'white',
                fontFamily: 'Poppins',
                textTransform: 'initial',
                padding: '5px 10px',
                borderRadius: borderRadius ?? '10px',
                fontWeight: fontWeight ?? '300',
                margin: margin,
                fontSize: size ?? '1rem',
                cursor: preventValidation ? 'not-allowed' : 'pointer'
            }}>
            {text}
        </Button>
    );
}


export default ButtonComponent;