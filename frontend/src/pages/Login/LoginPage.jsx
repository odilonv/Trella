import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Divider } from "@mui/material";
import { ButtonComponent, InputComponent, InputPasswordComponent } from '../../components';
import './../../assets/css/pages/login.css';
import { login, requireGuestUser } from "../../services/API/ApiUserSession";
import { useNotification } from '../../contexts/NotificationContext';
import { checkIsEmail } from '../../services/utils/ValidateUtils';

function LoginPage() {
    const { triggerNotification } = useNotification();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        async function fetchData() {
            await requireGuestUser();
        }

        fetchData();
    }, []);

    const handleLogin = () => {

        const errors = {};
        let isValid = true;

        if (checkIsEmail(email)) {
            errors.email = true;
            isValid = false;
        }

        if (password.length === 0) {
            errors.password = true;
            isValid = false;
        }

        if (isValid) {
            const user = { email, password };
            login(user)
                .then(response => {
                    if (response) {
                        console.log(response);
                        if (response.redirectTo) {
                            window.location.href = `/`;
                        }
                    }
                }).catch(error => {
                    triggerNotification(error.message, 'error');
                });
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    const handleForgotPassword = () => {
        navigate('/forgotPassword');
    }

    return (
        <div className="page">
            <div className="login-container default-container">
                <h1 style={{ textAlign: 'center' }}>Connexion</h1>
                <Divider style={{ margin: '24px 0' }} flexItem />
                <form onKeyDown={handleKeyDown}>
                    <div className="form-wrapper">
                        <InputComponent
                            label="Email"
                            value={email}
                            setValue={(value) => setEmail(value)}
                            validators={[checkIsEmail]}
                        />
                        <InputPasswordComponent
                            label={'Mot de passe'}
                            value={password}
                            setValue={setPassword}
                            validators={[]}
                        />
                        <div onClick={handleForgotPassword} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Mot de passe oublié ?</div>
                        <ButtonComponent onClick={handleLogin} type={'submit'} text={'Connexion'} />
                    </div>
                </form>
                <Divider style={{ margin: '24px 0' }} />
                <p className="form__hint"><span style={{ opacity: 0.5 }}>Pas encore de compte ?</span> &nbsp;
                    <a className="form__link" href="/signUp" style={{ textDecoration: 'underline' }}>Inscrivez vous</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
