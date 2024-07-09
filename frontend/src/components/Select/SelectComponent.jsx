import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function SelectComponent({ value, onChange, options }) {
    return (
        <div>
            <FormControl sx={{ m: 0, width: 360 }}>
                <InputLabel shrink={true} style={{ backgroundColor: '#FFFFFF' }}>
                    Pays de naissance *
                </InputLabel>
                <Select
                    style={{ backgroundColor: '#FFFFFF', height: 42 }}
                    value={value}
                    onChange={onChange}
                    required={true}
                >
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectComponent;
