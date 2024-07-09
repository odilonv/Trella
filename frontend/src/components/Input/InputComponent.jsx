import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';

function InputComponent({
    label,
    validators,
    value,
    setValue,
    type,
    required = true,
    showPasswordButton,
    suggestions = [],
    onChangeCallback,
    ...props
}) {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [displayValue, setDisplayValue] = useState('');

    const validate = useCallback((value) => {
        for (const validator of validators) {
            const error = validator(value);
            if (error) {
                setError(true);
                setErrorMessage(error);
                return;
            }
        }
        setError(false);
        setErrorMessage('');
    }, [validators]);

    useEffect(() => {
        if (value !== '') {
            if (type === 'date' && value instanceof Date && !isNaN(value)) {
                setDisplayValue(formatDateToString(value));
            } else {
                setDisplayValue(value);
            }
            validate(value);
        } else {
            setDisplayValue('');
        }
    }, [value, type, validate]);

    const handleBlur = () => {
        setShowSuggestions(false);
        validate(value);
    };

    const handleChange = (e) => {
        let newValue = e.target.value;
        if (type === 'date') {
            if (newValue === '') {
                setDisplayValue('');
                setValue('');
                setError(false);
                setErrorMessage('');
                return;
            }

            newValue = formatDateString(newValue);
            setDisplayValue(newValue);
            if (isValidDate(newValue)) {
                const dateObject = parseDateString(newValue);
                setValue(dateObject);
                validate(dateObject);
            } else {
                setError(true);
                setErrorMessage('Format de date invalide');
            }
        } else {
            setDisplayValue(newValue);
            setValue(newValue);
            validate(newValue);
        }
        if (suggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

    const handleInput = (e) => {
        handleChange(e);
        onChangeCallback && onChangeCallback(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (type === 'date' && (e.key === 'Backspace' || e.key === 'Delete')) {
            const cursorPosition = e.target.selectionStart;
            if (cursorPosition > 0 && (displayValue[cursorPosition - 2] === '/' || displayValue[cursorPosition - 1] === '/')) {
                e.preventDefault();
                const newValue = displayValue.substring(0, cursorPosition - 2) + displayValue.substring(cursorPosition);
                setDisplayValue(newValue);
                if (newValue.length === 0) {
                    setValue('');
                    setError(false);
                    setErrorMessage('');
                } else {
                    const formattedValue = formatDateString(newValue);
                    if (isValidDate(formattedValue)) {
                        const dateObject = parseDateString(formattedValue);
                        setValue(dateObject);
                        validate(dateObject);
                    }
                }
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSuggestionClick = (suggestion) => {
        setValue(suggestion);
        setShowSuggestions(false);
    };

    const formatDateString = (value) => {
        value = value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        if (value.length >= 5) {
            value = value.slice(0, 5) + '/' + value.slice(5, 9);
        }
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        return value;
    };

    const isValidDate = (dateString) => {
        const parts = dateString.split('/');
        if (parts.length !== 3) return false;
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;
        if ((month === 4, 6, 9, 11) && day > 30) return false;
        if (month === 2) {
            if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
                if (day > 29) return false;
            } else {
                if (day > 28) return false;
            }
        }
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    };

    const parseDateString = (dateString) => {
        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        return new Date(year, month - 1, day);
    };

    const formatDateToString = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div style={{ position: 'relative' }}>
            <TextField
                required={required}
                className="custom-textfield"
                label={label}
                value={displayValue}
                onInput={handleInput}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                error={error}
                helperText={error ? errorMessage : ''}
                type={showPassword ? 'text' : (type === 'date' ? 'text' : type)}
                {...props}
                InputProps={{
                    endAdornment: showPasswordButton && (
                        <IconButton onClick={toggleShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    ),
                }}
            />
            {
                showSuggestions && suggestions.length > 0 &&
                <ul style={{
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0,
                    color: 'black',
                    position: 'absolute',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    width: '100%',
                    top: '54px',
                    borderRadius: '0 0 5px 5px',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    zIndex: 1000,
                }}>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}
                            onMouseDown={(e) => { handleSuggestionClick(suggestion); }}
                            style={{ padding: '8px', cursor: 'pointer' }}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

InputComponent.propTypes = {
    label: PropTypes.string.isRequired,
    validators: PropTypes.arrayOf(PropTypes.func).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    setValue: PropTypes.func.isRequired,
    type: PropTypes.string,
    showPasswordButton: PropTypes.bool,
    suggestions: PropTypes.arrayOf(PropTypes.string),
    onChangeCallback: PropTypes.func,
};

InputComponent.defaultProps = {
    showPasswordButton: false,
    suggestions: [],
};

export default InputComponent;
