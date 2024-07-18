import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Backdrop } from '@mui/material';
import { ButtonComponent, InputComponent, PasswordCreationComponent } from '../../components';
import { register, requireGuestUser } from "../../services/API/ApiUserSession";
import { useNotification } from '../../contexts/NotificationContext';
import { checkPassword, checkIsEmail, checkOnlyAlphabets } from '../../services/utils/ValidateUtils';

function SignUpPage() {
    const { triggerNotification } = useNotification();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await requireGuestUser();
        }
        fetchData();
    }, []);

    const validate = () => {
        return checkOnlyAlphabets(user.lastName) === null &&
            checkOnlyAlphabets(user.firstName) === null &&
            checkIsEmail(user.email) === null &&
            checkPassword(user.password) == null && user.password === user.confirmPassword;
    };


    const handleSignUp = async () => {
        if (!validate()) {
            triggerNotification('Veuillez corriger les champs invalides.', 'error');
            return;
        }

        setIsLoading(true);

        try {
            const response = await register(user);
            const json = await response.json();
            if (response.status === 200) {
                triggerNotification('Inscription réussie, un email de vérification a été envoyé', 'success');
                navigate('/login');
            } else {
                triggerNotification(json.error, 'error');
            }
        } catch (error) {
            console.error(error);
            triggerNotification('Une erreur s\'est produite', 'error');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };


    return (
        <div className="page">
            <div className="login-container default-container">
                <h1 style={{ textAlign: 'center' }}>Inscription</h1>
                <form style={{ minWidth: '100%' }}>
                    <div className="form-wrapper">
                        <InputComponent
                            label="Nom"
                            validators={[checkOnlyAlphabets]}
                            value={user.lastName}
                            setValue={(value) => setUser({ ...user, lastName: value })}
                        />
                        <InputComponent
                            label="Prénom"
                            validators={[checkOnlyAlphabets]}
                            value={user.firstName}
                            setValue={(value) => setUser({ ...user, firstName: value })}
                        />
                        <InputComponent
                            label="Email"
                            validators={[checkIsEmail]}
                            value={user.email}
                            setValue={(value) => setUser({ ...user, email: value })}
                        />
                        <PasswordCreationComponent
                            password={user.password}
                            confirmPassword={user.confirmPassword}
                            setPassword={(value) => setUser({ ...user, password: value })}
                            setConfirmPassword={(value) => setUser({ ...user, confirmPassword: value })}
                        />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <ButtonComponent onClick={handleSignUp} type={'submit'} text={"S'inscrire"}
                            preventValidation={!validate() || !user.termsAccepted} />
                    </div>
                </form>
                <Backdrop open={isLoading} style={{ zIndex: 10000 }}>
                    <CircularProgress style={{ color: 'var(--main-color)' }} size={100} />
                </Backdrop>
            </div >
        </div >
    );
}

export default SignUpPage;
