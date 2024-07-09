import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { ButtonComponent } from '../../components';
import { useNotification } from '../../contexts/NotificationContext';
import { requireGuestUser } from "../../services/API/ApiUserSession";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const { triggerNotification } = useNotification();

    useEffect(() => {
        async function fetchData() {
            await requireGuestUser();
        }

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/data/session/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                triggerNotification(data.message, 'success');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                triggerNotification(data.message, 'error');
            }
        } catch (error) {
            console.error('Erreur lors de la demande de réinitialisation de mot de passe :', error);
            triggerNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        }
    };

    return (
        <div className='default-container' style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '20px',
        }}>
            <h1>
                Mot de passe oublié ?
            </h1>
            <form onSubmit={handleSubmit}
                style={{ alignItems: 'center', flexDirection: 'column', display: 'flex', marginTop: '20px' }}>
                <TextField
                    className='custom-textfield'
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <ButtonComponent onClick={handleSubmit} type={'submit'} text={'Réinitialiser le mot de passe'} />
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
