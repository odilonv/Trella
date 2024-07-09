import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

function SearchBarComponent({ placeholder, color, textColor, value, onChange, borderRadius, startIcon, endIcon }) {
    const handleClear = () => {
        onChange({ target: { value: '' } });
    };

    return (
        <TextField
            variant='outlined'
            InputProps={{
                startAdornment: startIcon ?? <SearchIcon fontSize='small' />,
                endAdornment: (
                    <InputAdornment position="end">
                        {value && (
                            <IconButton edge="end" onClick={handleClear}>
                                <CloseIcon size='small' />
                            </IconButton>
                        )}
                        {endIcon}
                    </InputAdornment>
                ),
                sx: {
                    borderRadius: borderRadius ?? '10px',
                    color: 'var(--black)',
                    height: '40px',
                    width: '100%',
                    '& .MuiInputBase-input::placeholder': {
                        opacity: '0.5',
                    },
                    paddingLeft: '3%',
                    gap: '1%'
                }
            }}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                backgroundColor: color ?? 'var(--white)',
                color: textColor ?? 'black',
                fontFamily: 'Poppins',
                textTransform: 'initial',
                fontWeight: '300',
                width: '100%',
                height: '40px',
                borderRadius: borderRadius ?? '10px'

            }}>
        </TextField>
    );
}

export default SearchBarComponent;