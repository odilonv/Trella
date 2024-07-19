import React, { useState, useEffect } from 'react';
import { Box, Modal as MuiModal, Typography } from '@mui/material';
import { ButtonComponent, InputPasswordComponent } from '../../components';
import { deleteUser } from '../../services/API/ApiUserSession';
import { useNotification } from '../../contexts/NotificationContext';

function ModalComponent({ open, handleClose, style }) {
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const { triggerNotification } = useNotification();

    useEffect(() => {
        if (open) {
            fetchUserId();
        }
    }, [open]);

    const fetchUserId = async () => {
        try {
            const response = await fetch('http://localhost:5001/users/session');
            const data = await response.json();
            if (response.ok) {
                console.log(data.userId)
                setUserId(data.userId);
            } else {
                triggerNotification(data.error, 'error');
            }
        } catch (error) {
            console.error(error);
            triggerNotification('Unable to fetch user ID', 'error');
        }
    };

    const deleteAccount = async () => {
        let warningMessage = document.getElementById('warningMessage');
        if (warningMessage.style.display === 'none') {
            warningMessage.style.display = 'block';
        } else {
            try {
                if (!password) {
                    triggerNotification('Le mot de passe est requis.', 'error');
                    return;
                }
                if (!userId) {
                    triggerNotification('User ID not found.', 'error');
                    return;
                }
                console.log("USER ID :", userId);
                const response = await deleteUser(userId, password); // Pass userId and password to the deleteUser function
                const json = await response.json();
                if (response.ok) {
                    window.location.href = '/';
                } else {
                    triggerNotification(json.error, 'error');
                }
            } catch (error) {
                console.error(error);
                triggerNotification('Failed to delete account', 'error');
            }
        }
    };

    return (
        <MuiModal
            open={open}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disableBackdropClick={true}
        >
            <Box sx={{ ...style, backgroundColor: 'var(--white)', padding: '20px', borderRadius: '8px', textAlign: 'center', gap: '20px', display: 'grid' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Êtes-vous sûr de vouloir supprimer votre compte ?
                </Typography>
                <InputPasswordComponent
                    label={'Mot de passe'}
                    value={password}
                    setValue={setPassword}
                    validators={[]}
                    style={{ width: '50%', display: 'block', margin: 'auto' }}
                />
                <div id='warningMessage' style={{ color: 'red', fontSize: '15px', display: 'none' }}>
                    Attention, cette action est irréversible.
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ButtonComponent text="Annuler" onClick={handleClose} color="#FF6347" />
                    <ButtonComponent text="Confirmer" onClick={deleteAccount} className="margin-popup-delete" />
                </Box>
            </Box>
        </MuiModal>
    );
}

export default ModalComponent;
