import React, { createContext, useContext, useState } from 'react';
import {
    CancelRounded as CancelRoundedIcon,
    CheckCircleRounded as CheckCircleRoundedIcon,
    InfoRounded as InfoRoundedIcon
} from '@mui/icons-material';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const triggerNotification = (message, type = 'info') => {
        if (!isNotificationVisible) {
            setNotification({ show: true, message, type });
            setIsNotificationVisible(true);
            setTimeout(() => {
                setNotification({ show: false, message: '', type: '' });
                setIsNotificationVisible(false);
            }, 5000);
        }
    };

    let icon = notification.type === 'success' ? (
        <CheckCircleRoundedIcon style={{ color: 'green' }} />
    ) : notification.type === 'info' ? (
        <InfoRoundedIcon style={{ color: 'blue' }} />
    ) : (
        <CancelRoundedIcon style={{ color: 'red' }} />
    );

    return (
        <NotificationContext.Provider value={{ triggerNotification }}>
            {children}
            {notification.show && (
                <div className='notification'>
                    {icon}
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
};
