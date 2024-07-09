import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useNotification } from '../../contexts/NotificationContext';

export default function VerifyEmailPage() {
    const { triggerNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        async function verifyEmail() {
            let token = window.location.pathname.split('/')[2];
            if (token) {
                let response = await fetch(`http://localhost:5000/api/data/user/verifyEmail/${token}`);
                let responseJson = await response.json();
                triggerNotification(responseJson.message, responseJson.status);
            }
            navigate('/login');
        }

        verifyEmail();
    }, [navigate, triggerNotification]);
}   