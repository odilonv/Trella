import React, { useState } from 'react';
import { Box, Modal as MuiModal, Typography } from '@mui/material';
import { ButtonComponent, InputPasswordComponent } from '../../components';
import { deleteUser } from '../../services/API/ApiUserSession';
import { useNotification } from '../../contexts/NotificationContext';

function ModalComponent({ open, handleClose, style }) {
    const [password, setPassword] = useState('');
    const { triggerNotification } = useNotification();

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
                const response = await deleteUser(password);
                const json = await response.json();
                if (response.ok) {
                    window.location.href = '/';
                } else {
                    triggerNotification(json.error, 'error');
                }
            } catch (error) {
                console.error(error);
                triggerNotification(error.Error, 'error');
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
                    Attention, cette action est irréversible et supprimera tous vos paris.
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
