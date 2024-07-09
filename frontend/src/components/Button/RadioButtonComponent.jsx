import { FormControlLabel } from '@mui/material';
import React from 'react';
import Switch from '@mui/material/Switch';
import './../../assets/css/pages/login.css';

const RadioButtonComponent = ({ label, checked, onChange }) => {
    return (
        <div className="radio-button-container">
            <span className="switch-label">{label}</span>
            <FormControlLabel
                className="switch-control"
                control={<Switch checked={checked} onChange={onChange} />}
            />
        </div>
    );
}

export default RadioButtonComponent;
