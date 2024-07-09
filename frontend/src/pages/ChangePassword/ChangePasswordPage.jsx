import React, { useState, useEffect } from 'react';
import { changePassword, requireLoggedUser, resetPassword } from '../../services/API/ApiUserSession';
import { useLocation } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';
import { PasswordCreationComponent, ButtonComponent, InputPasswordComponent } from '../../components';
import { checkPassword } from '../../services/utils/ValidateUtils';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [token, setToken] = useState(null);
  const location = useLocation();
  const { triggerNotification } = useNotification();

  useEffect(() => {
    async function fetchData() {
      await requireLoggedUser();
    }

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    if (tokenParam) {
      setIsResetMode(true);
      setToken(tokenParam);
    }
  }, [location]);

  const handleSubmit = async () => {
    try {
      if (checkPassword(password) == null && password === confirmPassword) {
        if (isResetMode) {
          const response = await resetPassword(token, password, confirmPassword);
          if (response) {
            triggerNotification('Le mot de passe a été réinitialisé avec succès', 'success');
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          } else {
            triggerNotification('Erreur lors de la réinitialisation du mot de passe', 'error');
          }
        } else {
          console.log("oldPassword", oldPassword, "password", password, "confirmPassword", confirmPassword);
          const response = await changePassword(oldPassword, password, confirmPassword);
          const json = await response.json();
          if (response.ok) {
            triggerNotification('Le mot de passe a été changé avec succès', 'success');
            setTimeout(() => {
              window.location.href = `/user`;
            }, 2000);
          } else {
            triggerNotification(json.error, 'error');
          }
        }
      }
    } catch (error) {
      // let errorMessage = error.json();
      // console.log(errorMessage);
      // console.error('Erreur lors du changement de mot de passe :', error);
      // triggerNotification(error.error, 'error');
    }
  };


  const handleCancel = () => {
    window.history.back();
  }

  return (
    <div className="page">
      <div className="login-container default-container" >
        <h1 style={{ textAlign: 'center' }} >Mot de passe</h1>
        <form>
          {!isResetMode &&
            <InputPasswordComponent
              label={'Mot de passe actuel'}
              value={oldPassword}
              setValue={setOldPassword}
              validators={[]}
            />}
          <PasswordCreationComponent
            password={password}
            confirmPassword={confirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
          <div style={{ textAlign: 'center' }}>
            <ButtonComponent onClick={handleCancel} type={'button'} text={'Annuler'} color={'#FF6347'} />
            <ButtonComponent onClick={handleSubmit} type={'button'} text={'Changer'} />
          </div>
        </form>
      </div>
    </div >
  );
};

export default ChangePasswordPage;
