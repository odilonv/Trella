import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


function FilterListComponent({ placeholder, color, textColor, values, onChange, startIcon, endIcon }) {
    const [open, setOpen] = React.useState(false);
    const initialBorderRadius = open ? '25px 25px 0 0' : '25px';
    const lastBorderRadius = '0 0 25px 25px';

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            disablePadding
            style={{
                backgroundColor: color ?? '#7161EC',
                color: textColor ?? 'white',
                fontFamily: 'Poppins',
                textTransform: 'initial',
                fontWeight: '300',
                width: '50%',
                borderRadius: initialBorderRadius,
                position: 'relative',
                zIndex: '10'
            }}>
            <ListItemButton onClick={handleClick} sx={{
                borderRadius: initialBorderRadius,
                color: 'white',
                border: '1px solid white',
                height: '35px',
                width: '100%',
            }}>
                <ListItemText primary="Choisis ton jeu" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>

                <List component="div" disablePadding style={{
                    position: 'absolute',
                    backgroundColor: color ?? 'black',
                    width: '100%',
                    borderRadius: lastBorderRadius
                }}>
                    <ListItemButton sx={{ pl: 2, border: '0.2px solid white' }} disablePadding>
                        <ListItemText primary="Valorant" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 2, border: '0.2px solid white', borderRadius: lastBorderRadius }}
                        disablePadding>
                        <ListItemText primary="CS:GO" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}

export default FilterListComponent;
